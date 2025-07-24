// components/Header.js
export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-900 text-white p-4">
      <img
        src="/beni_futur_logo.png"
        alt="Beni Futur"
        className="h-12 object-contain"
      />
      <h1 className="text-2xl font-bold tracking-wide">BF SAUVE DES VIES</h1>
      <img src="/rdc_logo.png" alt="RDC" className="h-12 object-contain" />
    </header>
  );
}
