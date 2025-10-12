import type { ProviderSummary } from '@/lib/api';
import { ProviderCard } from './provider-card';

type ProviderGridProps = {
  providers: ProviderSummary[];
  emptyState?: string;
};

export function ProviderGrid({ providers, emptyState = 'No providers found for this query.' }: ProviderGridProps) {
  if (!providers.length) {
    return <p className="text-sm text-muted-foreground">{emptyState}</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {providers.map((provider) => (
        <ProviderCard key={provider.code ?? provider.id} provider={provider} />
      ))}
    </div>
  );
}
