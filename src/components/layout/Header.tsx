import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { WhatsappButton } from '../shared/WhatsappButton';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-brand-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-semibold text-brand-800">
              Meri Terapias
            </span>
            <span className="hidden sm:inline text-brand-400 text-xs uppercase tracking-widest">
              &amp; SPA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="text-brand-600 hover:text-brand-900 transition-colors"
            >
              Início
            </Link>
            <Link
              to="/servicos"
              className="text-brand-600 hover:text-brand-900 transition-colors"
            >
              Serviços
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <WhatsappButton label="WhatsApp" />
          </div>

          <button
            className="md:hidden rounded-lg p-2 text-brand-600 hover:bg-brand-50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-brand-100 py-4 flex flex-col gap-3">
            <Link
              to="/"
              className="text-sm text-brand-700 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/servicos"
              className="text-sm text-brand-700 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Serviços
            </Link>
            <WhatsappButton label="WhatsApp" />
          </div>
        )}
      </div>
    </header>
  );
}
