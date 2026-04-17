import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { listarMassagens } from '../../api/massagens';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { WhatsappButton } from '../../components/shared/WhatsappButton';
import { formatCurrency, formatDuration } from '../../utils/format';

export function HomePage() {
  const { data: massagens } = useQuery({
    queryKey: ['massagens'],
    queryFn: listarMassagens,
  });

  return (
    <div>
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-gold-400 text-sm font-medium uppercase tracking-widest mb-4">
              Terapias Integrativas &amp; SPA
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Renove sua energia com cuidado e carinho
            </h1>
            <p className="text-brand-200 text-lg mb-8 leading-relaxed">
              Oferecemos massagens terapêuticas e tratamentos personalizados
              para o seu bem-estar físico e mental.
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsappButton size="lg" label="Agendar pelo WhatsApp" />
              <Link to="/servicos">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Ver serviços
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5 pointer-events-none" />
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-gold-500" size={28} />,
                title: 'Terapeutas Certificados',
                desc: 'Profissionais qualificados com ampla experiência em terapias integrativas.',
              },
              {
                icon: <Calendar className="text-brand-600" size={28} />,
                title: 'Atendimento Personalizado',
                desc: 'Sessões adaptadas às suas necessidades para o máximo de bem-estar.',
              },
              {
                icon: <Clock className="text-brand-600" size={28} />,
                title: 'Horários Flexíveis',
                desc: 'Atendimento de segunda a sábado, com horários adaptados à sua rotina.',
              },
            ].map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="mt-1 shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-brand-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-brand-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {massagens && massagens.length > 0 && (
        <section className="py-16 bg-brand-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-1">
                  Nossos Tratamentos
                </p>
                <h2 className="font-serif text-3xl font-semibold text-brand-900">
                  Serviços em Destaque
                </h2>
              </div>
              <Link
                to="/servicos"
                className="text-sm text-brand-600 hover:text-brand-800 flex items-center gap-1"
              >
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {massagens.slice(0, 3).map((m) => (
                <Card key={m.id} className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-brand-900 text-lg mb-2">
                        {m.nome}
                      </h3>
                      <p className="text-sm text-brand-500 leading-relaxed line-clamp-3">
                        {m.descricao}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-brand-100">
                      <p className="text-xl font-semibold text-brand-800">
                        {formatCurrency(m.valor)}
                      </p>
                      <p className="text-xs text-brand-400 flex items-center gap-1 mt-0.5">
                        <Clock size={12} />
                        {formatDuration(m.duracao)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-brand-800 text-white text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="font-serif text-3xl font-semibold mb-4">
            Pronta para se cuidar?
          </h2>
          <p className="text-brand-300 mb-8">
            Entre em contato pelo WhatsApp e agende sua sessão agora mesmo.
          </p>
          <WhatsappButton size="lg" label="Falar no WhatsApp" />
        </div>
      </section>
    </div>
  );
}
