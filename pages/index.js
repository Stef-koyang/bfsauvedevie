import { useEffect, useState } from "react";
import Header from "../components/Header";
import AlertTable from "../components/AlertTable";
import ChartView from "../components/ChartView";
import AudioAlert from "../components/AudioAlert";

export default function Home() {
  const [alerts, setAlerts] = useState([]);
  const [playSound, setPlaySound] = useState(false);

  async function fetchAlerts() {
    try {
      const res = await fetch("/api/alerts");
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.alerts);

        // Son si niveau critique
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto p-4">
        <ChartView alerts={alerts} />
        <AlertTable alerts={alerts} />
      </main>
      <AudioAlert play={playSound} />
    </div>
  );
}
