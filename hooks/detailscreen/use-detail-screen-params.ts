"use client";

import { useSearchParams } from "next/navigation";

interface DetailScreenParams {
  code?: string;
  latitude?: string;
  longitude?: string;
  distance?: string;
}

export const useDetailScreenParams = (props: DetailScreenParams) => {
  const searchParams = useSearchParams();

  const code = props.code || searchParams.get("code");
  const latitude = props.latitude || searchParams.get("lat");
  const longitude = props.longitude || searchParams.get("lon");
  const distance = props.distance || searchParams.get("distance");

  return {
    code,
    latitude,
    longitude,
    distance,
  };
};
