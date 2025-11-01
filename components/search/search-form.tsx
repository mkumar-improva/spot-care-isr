'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type SearchFormProps = {
  defaultCareType: string;
  defaultLat: number;
  defaultLon: number;
  defaultRadius: number;
  className?: string;
  enableScrollOnFocus?: boolean;
};

function parseLatLon(value: string) {
  const parts = value.split(',').map((part) => part.trim());
  if (parts.length !== 2) return null;

  const [latPart, lonPart] = parts;
  const lat = Number(latPart);
  const lon = Number(lonPart);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return { lat, lon };
}

export function SearchForm({
  defaultCareType,
  defaultLat,
  defaultLon,
  defaultRadius,
  className,
  enableScrollOnFocus = true,
}: SearchFormProps) {
  const router = useRouter();
  const [careType, setCareType] = useState(defaultCareType);
  const [location, setLocation] = useState(`${defaultLat}, ${defaultLon}`);
  const [radius, setRadius] = useState(String(defaultRadius));
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const containerRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

const handleScrollDown = () => {
  if (!isMounted || typeof window === 'undefined') {
    return;
  }

  if (enableScrollOnFocus && containerRef.current) {
    requestAnimationFrame(() => {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      
      // Then adjust by scrolling up 150px
      setTimeout(() => {
        window.scrollBy({
          top: -150,
          behavior: 'smooth'
        });
      }, 100);
    });
  }
};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parsed = parseLatLon(location);
    if (!parsed) {
      setError('Please provide latitude and longitude as "lat, lon".');
      return;
    }

    const radiusValue = Number(radius);
    if (!Number.isFinite(radiusValue) || radiusValue <= 0) {
      setError('Radius must be a positive number.');
      return;
    }

    const params = new URLSearchParams({
      careType: careType.trim(),
      lat: parsed.lat.toString(),
      lon: parsed.lon.toString(),
      radius: radiusValue.toString(),
    });

    router.push(`/providers?${params.toString()}`);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className={cn(
        'grid w-full gap-6 rounded-2xl border bg-card/70 p-6 shadow-lg backdrop-blur',
        className
      )}
    >
      <div className="grid gap-2">
        <Label htmlFor="careType">Care Type</Label>
        <Input
          id="careType"
          name="careType"
          placeholder="Adult Day Care"
          value={careType}
          onChange={(event) => setCareType(event.target.value)}
          onFocus={handleScrollDown}
          onClick={handleScrollDown}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Latitude &amp; Longitude</Label>
        <Input
          id="location"
          name="location"
          placeholder="33.9253, -84.3857"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onFocus={handleScrollDown}
          onClick={handleScrollDown}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="radius">Radius (km)</Label>
        <Input
          id="radius"
          name="radius"
          type="number"
          min={0.1}
          step={0.1}
          value={radius}
          onChange={(event) => setRadius(event.target.value)}
          onFocus={handleScrollDown}
          onClick={handleScrollDown}
          required
        />
      </div>

      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}

      <Button type="submit" className="h-11 text-base">
        Search Providers
      </Button>
    </form>
  );
}