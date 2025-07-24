// pages/api/alerts.js
import { getAlerts } from "./alert";

export default function handler(req, res) {
  if (req.method === "GET") {
    const alerts = getAlerts();
    return res.status(200).json({ alerts });
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
