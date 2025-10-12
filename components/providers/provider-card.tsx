import Link from 'next/link';
import type { ProviderSummary } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ProviderCardProps = {
  provider: ProviderSummary;
};

function formatLocation(provider: ProviderSummary): string | null {
  const segments = [provider.city, provider.state, provider.postalCode].filter(Boolean);
  return segments.length ? segments.join(', ') : null;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const servicesLabel =
    provider.services && provider.services.length ? provider.services.join(', ') : 'Services unavailable';
  const locationLabel = formatLocation(provider);

  return (
    <Link href={`/providers/${provider.code}`} className="group block h-full">
      <Card className={cn('h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-card')}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-foreground">{provider.name}</CardTitle>
          <CardDescription>{servicesLabel}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {provider.address ? <p className="text-foreground">{provider.address}</p> : null}
          {locationLabel ? <p>{locationLabel}</p> : null}
          {provider.phone ? <p className="text-foreground">Phone: {provider.phone}</p> : null}
          {provider.email ? <p className="text-foreground">Email: {provider.email}</p> : null}
        </CardContent>
      </Card>
    </Link>
  );
}
