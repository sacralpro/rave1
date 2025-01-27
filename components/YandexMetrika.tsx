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
        try {
          ym("hit", encodeURIComponent(url));
        } catch (error) {
          console.error("Yandex Metrika hit failed:", error, url);
        }
      } else {
        console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url);
      }
    },
    [enabled]
  );

  useEffect(() => {
    if (enabled) {
      const intervalId = setInterval(() => {
        if (typeof ym === 'function') {
          clearInterval(intervalId);
          hit(encodeURIComponent(window.location.pathname + window.location.search));
          // Listen for changes in the URL (replace with Next.js router if applicable)
          const handlePopState = () => {
            hit(encodeURIComponent(window.location.pathname + window.location.search));
          };
          window.addEventListener('popstate', handlePopState);
          return () => window.removeEventListener('popstate', handlePopState);
        }
      }, 100); // Check every 100ms. Adjust as needed.
      return () => clearInterval(intervalId);
    }
  }, [hit, enabled]);

  return (
    <YMInitializer
      accounts={[YM_COUNTER_ID]}
      options={{
        //defer: true,
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
