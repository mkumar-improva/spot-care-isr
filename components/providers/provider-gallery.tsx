import type { ProviderDetail } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ProviderGalleryProps = {
  provider: ProviderDetail;
};

export function ProviderGallery({ provider }: ProviderGalleryProps) {
  if (!provider.images?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {provider.images.map((image) => (
            <figure key={image.id} className="w-full max-w-[220px] space-y-3">
              <img
                src={image.url}
                alt={image.caption ?? provider.name}
                className="w-full rounded-md border object-cover shadow-sm"
              />
              {image.caption ? <figcaption className="text-xs text-muted-foreground">{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
