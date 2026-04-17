import { MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';

const WHATSAPP_NUMBER = '5541997341657';
const WHATSAPP_MESSAGE =
  'Olá, eu vim do site Meri Terapias Integrativas SPA e gostaria de mais informações';

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

interface WhatsappButtonProps {
  label?: string;
  size?: 'md' | 'lg';
  className?: string;
}

export function WhatsappButton({
  label = 'Fale conosco no WhatsApp',
  size = 'md',
  className,
}: WhatsappButtonProps) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
        'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30',
        'hover:bg-[#1DA851] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]',
        size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm',
        className,
      )}
    >
      <MessageCircle size={size === 'lg' ? 22 : 18} />
      {label}
    </a>
  );
}
