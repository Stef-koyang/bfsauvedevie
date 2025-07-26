import { useEffect, useState } from "react";
import Header from "../components/Header";
import AlertTable from "../components/AlertTable";
import ChartView from "../components/ChartView";
import AudioAlert from "../components/AudioAlert";
import SensorCard from "../components/SensorCard";

export default function Home() {
  const [alerts, setAlerts] = useState([]);
  const [playSound, setPlaySound] = useState(false);

  async function fetchAlerts() {
    try {
      const res = await fetch("/api/alerts");
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.alerts);

        const danger = data.alerts.some((a) => a.niveau >= 90);
        setPlaySound(danger);
      }
    } catch (error) {
      console.error("Erreur récupération alertes:", error);
    }
  }

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  // Tri des 3 premiers capteurs
  const firstThree = alerts.slice(0, 3);

  const colors = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className={`min-h-screen bg-gray-100 transition-colors duration-500 ${playSound ? "bg-red-50" : ""}`}>
      <Header />
      <main className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center mb-8">
          {firstThree.length === 0 ? (
            <p>Aucune donnée disponible.</p>
          ) : (
            firstThree.map((alert, i) => (
              <SensorCard
                key={i}
                label={alert.site}
                level={alert.niveau}
                color={colors[i] || "#888"}
              />
            ))
          )}
        </div>

        <ChartView alerts={alerts} />
        <AlertTable alerts={alerts} />
      </main>
      <AudioAlert play={playSound} />
    </div>
  );
}
