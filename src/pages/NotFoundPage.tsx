import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-7xl font-bold text-brand-200 mb-4">404</p>
      <h1 className="font-serif text-2xl font-semibold text-brand-900 mb-2">
        Página não encontrada
      </h1>
      <p className="text-brand-500 text-sm mb-8">
        A página que você procura não existe ou foi removida.
      </p>
      <Link to="/">
        <Button>Voltar ao início</Button>
      </Link>
    </div>
  );
}
