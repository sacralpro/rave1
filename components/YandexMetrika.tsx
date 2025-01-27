// YandexMetrika.tsx
"use client";
import { YMInitializer } from 'react-yandex-metrika';
import React from 'react';
import { useEffect } from'react';

type Props = {
  enabled: boolean;
};

const YandexMetrika: React.FC<Props> = ({ enabled }) => {
  const YM_COUNTER_ID = 99671111; // **REPLACE WITH YOUR ACTUAL ID**

  useEffect(() => {
    if (enabled) {
      console.log("Yandex Metrika initializing...");
      console.log("Counter ID:", YM_COUNTER_ID); // More specific logging
      console.log("Options:", {
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        ecommerce: 'dataLayer', //Only include if using e-commerce
      });
    }
  }, [enabled, YM_COUNTER_ID]); // Include YM_COUNTER_ID in dependencies


  return (
    enabled && (
      <YMInitializer
        accounts={[YM_COUNTER_ID]}
        options={{
          defer: true,
          webvisor: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
        }}
        version="2"
      />
    )
  );
};

export default YandexMetrika;

