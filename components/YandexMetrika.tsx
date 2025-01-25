"use client";

import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

type Props = {
  enabled: boolean;
};

const YM_COUNTER_ID = 99645466; // Updated counter ID

const YandexMetrika: React.FC<Props> = ({ enabled }) => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);

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
    const handleRouteChange = (url: string) => {
      setCurrentPath(url);
      hit(url);
    };

    if (enabled) {
      // Initial hit after component mounts, but only if currentPath has been updated.
      const handleInitialHit = () => {
        if (currentPath) { //Check if currentPath has a value.  It's asynchronous
          hit(currentPath);
        }
      };

      //Use a timeout to ensure Router is ready before we try and access it, then clean up afterwards.
      const timeout = setTimeout(handleInitialHit, 500);
      Router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        clearTimeout(timeout);
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [hit, enabled, currentPath]); // currentPath added as dependency


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
