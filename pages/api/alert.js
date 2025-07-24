// pages/api/alert.js
let alertStore = [];

const contacts = [
  { id: 1, phone: "+243 812 345 678" },
  { id: 2, phone: "+243 971 234 567" },
  { id: 3, phone: "+243 998 765 432" },
  { id: 4, phone: "+243 822 111 222" },
  { id: 5, phone: "+243 897 654 321" }
];

function getRandomContact() {
  const index = Math.floor(Math.random() * contacts.length);
  return contacts[index];
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { site, niveau, message } = req.body;

  if (!site || niveau === undefined || !message) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  const randomContact = getRandomContact();

  const alertData = {
    site,
    siteId: randomContact.id,
    phoneNumber: randomContact.phone,
    niveau,
    message,
    timestamp: new Date().toISOString()
  };

  alertStore.unshift(alertData);
  if (alertStore.length > 50) alertStore.pop();

  console.log("Nouvelle alerte reçue avec contact aléatoire :", alertData);

  return res.status(200).json({ success: true, alert: alertData });
}

// API GET pour récupérer toutes les alertes
export function getAlerts() {
  return alertStore;
}
