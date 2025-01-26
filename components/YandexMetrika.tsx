"use client";

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import ym, { YMInitializer } from 'react-yandex-metrika';

type Props = {
  enabled: boolean;
};

const YandexMetrika: React.FC<Props> = ({ enabled }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>('/'); // Default to '/'
  const yandexMetrikaIdString = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  const yandexMetrikaId = yandexMetrikaIdString ? parseInt(yandexMetrikaIdString, 10) : undefined;

  const hit = useCallback(
    (url: string) => {
      if (enabled && yandexMetrikaId && typeof window !== 'undefined') { //Added window check
        ym('hit', url);
      } else if (!yandexMetrikaId) {
        console.warn(
          "Yandex Metrika ID not set or invalid. Please set NEXT_PUBLIC_YANDEX_METRIKA_ID environment variable to a valid number."
        );
      } else {
        console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url);
      }
    },
    [enabled, yandexMetrikaId]
  );

  useEffect(() => {
    let handleRouteChange: () => void; // Declare handleRouteChange here

    if (enabled && yandexMetrikaId && typeof window !== 'undefined') { //Added window check
      handleRouteChange = () => {
        const newPath = window.location.pathname + window.location.search;
        if (newPath !== currentPath) {
          setCurrentPath(newPath);
          hit(newPath);
        }
      };
      window.addEventListener('popstate', handleRouteChange);
    }

    return () => {
      if (enabled && yandexMetrikaId && typeof window !== 'undefined' && handleRouteChange) { //Added window check and handleRouteChange check
        window.removeEventListener('popstate', handleRouteChange);
      }
    };
  }, [hit, enabled, currentPath, yandexMetrikaId]);


  if (!yandexMetrikaId) {
    return <div>Yandex Metrika ID not configured or invalid.</div>;
  }

  return (
    <YMInitializer
      accounts={[yandexMetrikaId]}
      options={{
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        ecommerce: 'dataLayer',
      }}
      version="2"
    />
  );
};

export default YandexMetrika;
