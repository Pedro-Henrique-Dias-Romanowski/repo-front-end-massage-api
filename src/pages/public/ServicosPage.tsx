import { Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { listarMassagens } from '../../api/massagens';
import { Card } from '../../components/ui/Card';
import { WhatsappButton } from '../../components/shared/WhatsappButton';
import { formatCurrency, formatDuration } from '../../utils/format';

export function ServicosPage() {
  const { data: massagens, isLoading, isError } = useQuery({
    queryKey: ['massagens'],
    queryFn: listarMassagens,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-1">
          Catálogo
        </p>
        <h1 className="font-serif text-4xl font-semibold text-brand-900">
          Nossos Serviços
        </h1>
        <p className="mt-3 text-brand-500 max-w-xl">
          Escolha o tratamento ideal para você. Cada sessão é personalizada para
          proporcionar o máximo de bem-estar e relaxamento.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-brand-100 p-6 animate-pulse"
            >
              <div className="h-5 bg-brand-100 rounded w-3/4 mb-3" />
              <div className="h-3 bg-brand-100 rounded w-full mb-2" />
              <div className="h-3 bg-brand-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-center py-12">
          Não foi possível carregar os serviços. Tente novamente mais tarde.
        </p>
      )}

      {massagens && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {massagens.map((m) => (
            <Card
              key={m.id}
              className="flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <h2 className="font-serif text-xl font-semibold text-brand-900 mb-2">
                  {m.nome}
                </h2>
                <p className="text-sm text-brand-500 leading-relaxed">
                  {m.descricao}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-brand-100">
                <p className="text-2xl font-bold text-brand-800">
                  {formatCurrency(m.valor)}
                </p>
                <p className="text-xs text-brand-400 flex items-center gap-1 mt-0.5">
                  <Clock size={12} />
                  {formatDuration(m.duracao)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl">
        <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
          Pronta para se cuidar?
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
          Fale conosco e agende sua sessão
        </h2>
        <p className="text-brand-200 max-w-xl mx-auto mb-8">
          Entre em contato pelo WhatsApp para tirar dúvidas e reservar o
          horário que melhor se encaixa na sua rotina.
        </p>
        <WhatsappButton size="lg" label="Falar no WhatsApp" />
      </section>
    </div>
  );
}
