"use client";

import { YMInitializer } from 'react-yandex-metrika';
import React from 'react';

type Props = {
  enabled: boolean;
};

const YandexMetrika: React.FC<Props> = ({ enabled }) => {
  const yandexMetrikaId = 99671111; //Ваш ID Яндекс Метрики

  return (
    enabled && ( // Условие для включения/отключения
      <YMInitializer
        accounts={[yandexMetrikaId]}
        options={{
          defer: true,
          webvisor: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          ecommerce: 'dataLayer', // Если используете электронную коммерцию
        }}
        version="2"
      >
      </YMInitializer>
    )
  );
};

export default YandexMetrika;
