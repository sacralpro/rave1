"use client";

import React, { useCallback, useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

type Props = {
  enabled: boolean;
};

const YM_COUNTER_ID = 99671111; // Correct counter ID

const YandexMetrika: React.FC<Props> = ({ enabled }) => {
  const hit = useCallback(
    (url: string) => {
      if (enabled) {
        ym("hit", url);
      } else {
        console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url);
      }
    },
    [enabled]
  );

  useEffect(() => {
    if (enabled) {
      // Initial hit on page load
      hit(window.location.pathname + window.location.search);

      // Listen for changes in the URL (less accurate than Router)
      const handlePopState = () => {
        hit(window.location.pathname + window.location.search);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);


    }
  }, [hit, enabled]);

  return (
    <YMInitializer
      accounts={[YM_COUNTER_ID]}
      options={{
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        ecommerce: "dataLayer",
      }}
      version="2"
    />
  );
};

export default YandexMetrika;
