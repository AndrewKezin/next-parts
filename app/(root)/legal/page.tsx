import { Container } from '@/components/shared';
import Link from 'next/link';

export default function LegalPage() {
  return (
    <Container>
      <div className="flex flex-col gap-3 py-7">
        <h1 className="text-3xl font-bold mt-3 mb-5">Правовая информация</h1>
        
        <Link href="/legal/offer" target="_blank" className="text-xl text-primary">
          Публичная оферта  
        </Link>
        <Link href="/legal/useragreement" target="_blank" className="text-xl text-primary">
          Пользовательское соглашение
        </Link>
        <Link href="/legal/privacy" target="_blank" className="text-xl text-primary">
          Политика конфиденциальности
        </Link>
        <Link href="/legal/privacyrules" target="_blank" className="text-xl text-primary">
          Правила обработки персональных данных
        </Link>
        <Link href="/legal/consentprivacy" target="_blank" className="text-xl text-primary">
          Согласие на обработку персональных данных
        </Link>
      </div>
    </Container>
  );
}
