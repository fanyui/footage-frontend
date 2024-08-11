import { Session } from 'next-auth';
import { AuthProvider } from './auth';
import { QueryProvider } from './query';
import { I18nProviderClient } from '../locales/client';

type Props = {
  children?: React.ReactNode;
  session?: Session | null;
  locale: string
};

export const Providers = ({ 
  children,
  locale
}: Props) => {
  return (
    <I18nProviderClient locale={locale}>
      <AuthProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </AuthProvider>
    </I18nProviderClient>
  );
};
