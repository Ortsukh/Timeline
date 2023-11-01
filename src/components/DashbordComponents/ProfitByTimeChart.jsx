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
import moment from "moment/moment";
import { getProfitData } from "../../Api/DashboardApi";
import UserAccountDashBoard from "./UserAccountDashBoard";
import CalendarDashboard from "./CalendarDashboard";

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

export default function ProfitByTimeChart() {
  const [profitItems, setProfitItems] = useState([]);
  const [update, setUpdate] = useState(false);
  const [timeStep, setTimeStep] = useState(1);
  const chart = useRef(null);
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-7, "day"), endDate: moment() });

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
            month: "MMM DD",
            quarter: "MMM YYYY",
          },
        },

        min: selectedTime.startDate,
        max: selectedTime.endDate,
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

  const filterDataByTimeStep = () => {
    const result = [];
    for (let i = 0; i < profitItems.length; i += timeStep) {
      result.push(profitItems[i]);
    }
    // result.push(profitItems[profitItems.length - 1]);
    return result;
  };

  useEffect(() => {
    console.log(profitItems);
    setUpdate((prev) => !prev);
  }, [profitItems]);

  useEffect(() => {
    console.log(chart);
    getProfitData(selectedTime.startDate, selectedTime.endDate).then((response) => {
      setProfitItems([...response]);
    });
  }, []);
  const handleChangeTimeStep = (step) => {
    console.log(chart.current.update);
    setTimeStep(step);
  };
  const handleSelectTime = (item) => {
    getProfitData(item.startDate, item.endDate).then((response) => {
      setProfitItems((prev) => [...response]);
      setSelectedTime(item);
    });
  };
  const data = {
    datasets: [{
      label: "Profit",
      data: filterDataByTimeStep(),
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
  console.log(data);
  return (
    <div className="profitChartContainer">
      <div>
        <CalendarDashboard setSelectedTime={handleSelectTime} />
      </div>
      <div className="btn-cont-dash">
        <button className="btn btn-info" type="button" onClick={() => handleChangeTimeStep(1)}>
          day
        </button>
        <button className="btn btn-info" type="button" onClick={() => handleChangeTimeStep(7)}>
          week
        </button>
        <button className="btn btn-info" type="button" onClick={() => handleChangeTimeStep(30)}>
          month
        </button>
        <div className="col-lg-3 col-md-8">
          <UserAccountDashBoard />
        </div>
      </div>
      <Line ref={chart} width={1100} height={300} id="canvas" options={options} data={data} redraw />

    </div>
  );
}
