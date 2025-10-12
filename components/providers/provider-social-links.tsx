import type { ProviderDetail } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ProviderSocialLinksProps = {
  provider: ProviderDetail;
};

export function ProviderSocialLinks({ provider }: ProviderSocialLinksProps) {
  const links = provider.socialLinks?.filter((link) => Boolean(link?.url)) ?? [];

  if (!links.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Social &amp; Web</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3 text-sm">
          {links.map((link) => {
            const url = link?.url ?? '#';
            const label = url.replace(/^https?:\/\//, '');

            return (
              <li key={link?.id ?? link?.url} className="flex items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {link?.type ?? 'Link'}
                </span>
                <a href={url} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
