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

export function AppraisalChart() {
  const data = {
    labels: ["Engineering", "Compliance", "Risk Mitigation", "SaaS Multiple"],
    datasets: [
      {
        label: "Valuation ($)",
        data: [76000, 35000, 120000, 2970000],
        backgroundColor: [
          "rgba(148, 163, 184, 0.2)",
          "rgba(59, 130, 246, 0.3)",
          "rgba(34, 197, 94, 0.3)",
          "rgba(217, 119, 6, 0.7)",
        ],
        borderColor: ["#94a3b8", "#3b82f6", "#22c55e", "#d97706"],
        borderWidth: 1,
        borderRadius: 4,
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
        backgroundColor: "#0f172a",
        titleFont: { family: "Outfit", size: 14 },
        bodyFont: { family: "JetBrains Mono", size: 12 },
        callbacks: {
          label: (context: { raw: unknown }) =>
            ` $${Number(context.raw).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#1e293b" },
        ticks: {
          color: "#64748b",
          font: { family: "JetBrains Mono", size: 10 },
          callback: (value: string | number) =>
            "$" + Number(value) / 1000 + "k",
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#f8fafc",
          font: { family: "Outfit", weight: "bold" as const },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
