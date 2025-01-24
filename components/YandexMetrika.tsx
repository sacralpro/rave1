"use client";

import Router from "next/router";
import React, { useCallback, useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

type Props = {
  enabled: boolean;
};

const YM_COUNTER_ID = 99645466; // Updated counter ID

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
      // Initial hit after component mounts
      hit(window.location.pathname + window.location.search);

      // Hit on route changes
      Router.events.on("routeChangeComplete", (url: string) => hit(url));
    }
    return () => {
      if (enabled) {
        Router.events.off("routeChangeComplete", hit);
      }
    };
  }, [hit, enabled]);

  return (
    <YMInitializer
      accounts={[YM_COUNTER_ID]}
      options={{
        defer: true,
        webvisor: true, // Consider removing if not needed
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
