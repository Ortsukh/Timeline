/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import "./style.css";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,

} from "chart.js";
import { getProfitData } from "../../Api/DashboardApi";

ChartJS.register(
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,

);

const options = {
  response: true,
  plugins: {
    tooltip: {
      // Disable the on-canvas tooltip
      enabled: false,
      external(context) {
        // Tooltip Element
        let tooltipEl = document.getElementById("chartjs-tooltip");

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = "<table></table>";
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add("no-transform");
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          console.log(tooltipModel);
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = "<thead>";

          innerHtml += "</thead><tbody>";

          bodyLines.forEach(() => {
            let style = "background:  linear-gradient(336deg, rgba(0,0,255, 0.5), rgba(0,0,255, 0.5) );";
            style += "; border-color:rgb(100, 100, 255)";
            style += "; border-width: 2px";
            const span = `<span style="${style}">${tooltipModel.dataPoints[0].raw.x}: ${tooltipModel.dataPoints[0].raw.y}$</span>`;
            innerHtml += `<tr><td>${span}</td></tr>`;
          });
          innerHtml += "</tbody>";

          const tableRoot = tooltipEl.querySelector("table");
          tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        // const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX}px`;
        tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY}px`;
        // tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding = `${tooltipModel.padding}px ${tooltipModel.padding}px`;
        tooltipEl.style.pointerEvents = "none";
      },
    },

  },
  hover: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        displayFormats: {
          month: "MMM MM",
          quarter: "MMM YYYY",
        },
      },

      min: "2023-09-09",
      max: "2024-11-09",
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        major: {
          enabled: true,
        },
        // maxTicksLimit: 7,
      },
    },
    y: {
      ticks: {
        callback(value) {
          return `${value}$`;
        },
      },
    },
  },

};

export default function ProfitByTimeChart() {
  const [profitItems, setProfitItems] = useState([]);
  const [timeStep, setTimeStep] = useState(1);
  const chart = useRef(null);

  const start = "2023-09-09";
  const end = "2024-11-09";

  const filterDataByTimeStep = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i += timeStep) {
      result.push(data[i]);
    }
    result.push(data[data.length - 1]);
    return result;
  };

  useEffect(() => {
    getProfitData(start, end).then((response) => {
      setProfitItems(((response)));
    });
  }, []);

  const handleChangeTimeStep = (step) => {
    setTimeStep(step);
    console.log(chart.current);
  };

  const data = {
    datasets: [{
      label: "Profit",
      data: filterDataByTimeStep(profitItems),
      showLine: true,
      lineTension: 0.3,
      borderColor: "rgb(100, 100, 255)",
      fill: "start",
      backgroundColor: (context) => {
        const { ctx } = context.chart;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgb(156,171,248)");
        gradient.addColorStop(1, "rgba(238,174,202,0)");
        return gradient;
      },
    }],
  };

  return (
    <div className="profitChartContainer">
      <div>
        <button type="button" onClick={() => handleChangeTimeStep(1)}>
          day
        </button>
        <button type="button" onClick={() => handleChangeTimeStep(7)}>
          week
        </button>
        <button type="button" onClick={() => handleChangeTimeStep(30)}>
          month
        </button>
      </div>
      <Line ref={chart} width={1000} height={300} id="canvas" options={options} data={data} redraw />

    </div>
  );
}
