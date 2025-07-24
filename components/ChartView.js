// components/ChartView.js
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartView({ alerts }) {
  // Regroupement par site, moyenne des niveaux
  const siteLevels = {};
  alerts.forEach(({ site, niveau }) => {
    if (!siteLevels[site]) siteLevels[site] = [];
    siteLevels[site].push(niveau);
  });

  const labels = Object.keys(siteLevels);
  const data = {
    labels,
    datasets: [
      {
        label: "Niveau moyen (%)",
        data: labels.map(site => {
          const levels = siteLevels[site];
          const sum = levels.reduce((a, b) => a + b, 0);
          return (sum / levels.length).toFixed(1);
        }),
        backgroundColor: "rgba(37, 99, 235, 0.7)" // bleu
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="my-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📊 Niveau moyen par site</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
