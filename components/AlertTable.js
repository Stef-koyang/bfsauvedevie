// components/AlertTable.js
export default function AlertTable({ alerts }) {
  const getStatus = (niveau) => {
    if (niveau >= 90) return "danger";
    if (niveau >= 70) return "warning";
    return "normal";
  };

  const statusColors = {
    danger: "text-red-600 font-bold",
    warning: "text-yellow-600 font-semibold",
    normal: "text-green-600"
  };

  return (
    <div className="overflow-x-auto shadow-md rounded my-6 bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Nom du site</th>
            <th className="py-3 px-6 text-left">Niveau (%)</th>
            <th className="py-3 px-6 text-left">Téléphone</th>
            <th className="py-3 px-6 text-left">Message</th>
            <th className="py-3 px-6 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {alerts.map((a, idx) => {
            const status = getStatus(a.niveau);
            return (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{a.siteId}</td>
                <td className="py-3 px-6 text-left">{a.site}</td>
                <td className={`py-3 px-6 text-left ${statusColors[status]}`}>
                  {a.niveau}%
                </td>
                <td className="py-3 px-6 text-left">{a.phoneNumber}</td>
                <td className="py-3 px-6 text-left">{a.message}</td>
                <td className="py-3 px-6 text-left">
                  {new Date(a.timestamp).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
