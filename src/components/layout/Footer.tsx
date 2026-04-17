export function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-300 py-10 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <p className="font-serif text-white text-base">Meri Terapias Integrativas e SPA</p>
          <p className="mt-1 text-brand-400">Seu bem-estar é nossa missão.</p>
        </div>
        <p className="text-brand-500">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
