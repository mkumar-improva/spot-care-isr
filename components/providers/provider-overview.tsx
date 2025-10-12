import type { ProviderDetail } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ProviderOverviewProps = {
  provider: ProviderDetail;
};

function renderLocation(provider: ProviderDetail) {
  const segments = [provider.city, provider.state, provider.postalCode].filter(Boolean);
  if (!segments.length) return null;

  return <p className="text-sm text-muted-foreground">{segments.join(', ')}</p>;
}

function renderPhone(provider: ProviderDetail) {
  if (provider.phoneNumbers?.length) {
    return <p className="text-sm text-foreground">Phone: {provider.phoneNumbers.join(', ')}</p>;
  }
  if (provider.phone) {
    return <p className="text-sm text-foreground">Phone: {provider.phone}</p>;
  }
  return null;
}

export function ProviderOverview({ provider }: ProviderOverviewProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-semibold text-foreground">{provider.name}</CardTitle>
        <CardDescription>Provider code: {provider.code}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-relaxed">
        {provider.description ? <p className="text-base text-foreground">{provider.description}</p> : null}
        <div className="space-y-2">
          {provider.address ? <p className="text-sm text-foreground">{provider.address}</p> : null}
          {renderLocation(provider)}
          {renderPhone(provider)}
          {provider.email ? <p className="text-sm text-foreground">Email: {provider.email}</p> : null}
          {provider.services && provider.services.length ? (
            <p className="text-sm text-foreground">Services: {provider.services.join(', ')}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
