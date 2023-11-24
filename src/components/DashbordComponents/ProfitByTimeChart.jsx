/* eslint-disable import/no-extraneous-dependencies */
import React, {
  memo, useEffect, useRef, useState,
} from "react";
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
import moment from "moment";
import CalendarDashboard from "./CalendarDashboard";
import useGetFinance from "../../hooks/useGetFinance";
import Spinner from "../Spinner/Spinner";

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

const ProfitByTimeChart = memo(({
  selectedTime, setSelectedTime, setProfitItems, profitItems, lesseeId,
}) => {
  const [timeStep, setTimeStep] = useState("day");
  const chart = useRef(null);
  // const [loading, setLoading] useState('false')
  const { execute, loading } = useGetFinance(undefined);
  console.log(loading);
  const options = {
    devicePixelRatio: 2,
    maintainAspectRatio: false,
    response: true,
    plugins: {
      tooltip: {
        // Disable the on-canvas tooltip
        enabled: false,
        mode: "index",
        intersect: false,
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
            const bodyLines = tooltipModel.body.map(getBody);

            let innerHtml = "<thead>";

            innerHtml += "</thead><tbody>";

            bodyLines.forEach(() => {
              let style = "background:  #7E7CFB";
              style += "; border-radius: 5px";
              style += "; color: white";
              style += "; padding: 5px";
              const span = `<span style="${style}">${tooltipModel.dataPoints[0].raw.x}: ${tooltipModel.dataPoints[0].raw.y} BYN</span>`;
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

        min: moment(selectedTime.startDate).add(-18, "hour"),
        max: moment(selectedTime.endDate).add(6, "hour"),
        ticks: {
          font: {
            size: 20,
          },
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
          font: {
            size: 16,
          },
          callback(value) {
            return `${value} BYN`;
          },
        },
      },
    },

  };
  useEffect(() => {
    const foo = async () => {
      const axiosParams = {
        start: selectedTime.startDate.format("YYYY-MM-DD"),
        end: selectedTime.endDate.format("YYYY-MM-DD"),
        step: timeStep,
        id: lesseeId,
      };
      const data = await execute(axiosParams);
      console.log("timestep", data);
      const convertedForChartData = data.map((point) => ({
        x: point.date, y: point.amount,
      }));
      setProfitItems(convertedForChartData);
    };

    foo();
    // getProfitData(selectedTime.startDate, selectedTime.endDate).then((response) => {
    //   console.log(response);
    //   setProfitItems(response);
    // });
  }, [timeStep]);

  const handleChangeTimeStep = (step) => {
    setTimeStep(step);
  };

  const handleSelectTime = async (item) => {
    console.log(item);
    const axiosParams = {
      start: moment(item.startDate).format("YYYY-MM-DD"),
      end: moment(item.endDate).format("YYYY-MM-DD"),
      step: timeStep,
      id: lesseeId,

    };
    const data = await execute(axiosParams);
    // getProfitData(item.startDate, item.endDate).then((response) => {
    //   setProfitItems(response);
    //   setSelectedTime(item);
    // });
    const convertedForChartData = data.map((point) => ({
      x: point.date, y: point.amount,
    }));
    console.log("time", data);
    setProfitItems(convertedForChartData);
    setSelectedTime(item);
  };

  const data = {
    datasets: [{
      label: "Profit",
      data: profitItems,
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
      {loading && (
      <div className="chart-loader">
        <Spinner />
      </div>
      )}
      <div className="cont-btn-dash">
        <div className="btn-cont-dash">
          <div className="chart-step-buttons">
            <button className={`btn btn-info ${timeStep === "day" ? "disabled" : ""}`} type="button" onClick={() => handleChangeTimeStep("day")}>
              день
            </button>
            <button className={`btn btn-info ${timeStep === "week" ? "disabled" : ""}`} type="button" onClick={() => handleChangeTimeStep("week")}>
              неделя
            </button>
            <button className={`btn btn-info ${timeStep === "month" ? "disabled" : ""}`} type="button" onClick={() => handleChangeTimeStep("month")}>
              месяц
            </button>
          </div>
          <div>
            <CalendarDashboard setSelectedTime={handleSelectTime} />
          </div>
        </div>
      </div>
      <Line ref={chart} width={1100} height={300} id="canvas" options={options} data={data} redraw />

    </div>
  );
});

export default ProfitByTimeChart;
