"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function AppraisalChartLight() {
  const data = {
    labels: ["Engineering", "Compliance", "Risk Mitigation", "SaaS Speculative"],
    datasets: [
      {
        label: "Valuation ($)",
        data: [76000, 35000, 120000, 2970000],
        backgroundColor: ["#1e293b", "#334155", "#475569", "#d97706"],
        borderRadius: 6,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 14, weight: "bold" as const },
        bodyFont: { family: "JetBrains Mono" },
        callbacks: {
          label: (context: { parsed: { x: number } }) =>
            " $" + context.parsed.x.toLocaleString(),
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#f1f5f9" },
        ticks: {
          color: "#64748b",
          font: { family: "JetBrains Mono", size: 10 },
          callback: (value: string | number) =>
            "$" + (Number(value) / 1000).toFixed(0) + "K",
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#1e293b",
          font: { weight: "600" as const, size: 11 },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
