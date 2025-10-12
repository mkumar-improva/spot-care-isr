type QuerySummaryProps = {
  lat: number;
  lon: number;
  radius: number;
  careType: string;
  isrWindowMinutes?: number;
};

export function QuerySummary({ lat, lon, radius, careType, isrWindowMinutes = 15 }: QuerySummaryProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-6 text-sm leading-relaxed text-muted-foreground shadow-sm">
      <p>
        Incremental Static Regeneration keeps this listing fresh every {isrWindowMinutes} minutes.
      </p>
      <p className="mt-3">
        Showing providers for latitude {lat.toFixed(4)}, longitude {lon.toFixed(4)}, within {radius} km, care type "
        {careType}".
      </p>
    </div>
  );
}
