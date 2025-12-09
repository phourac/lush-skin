'use client';

import NextTopLoader from 'nextjs-toploader';
import React from 'react';

export default function TopLoader() {
  return (
    <>
      <NextTopLoader
        color='#fff5f0'
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing='ease'
        speed={200}
        shadow='0 0 10px #fff5f0,0 0 5px #fff5f0'
      />
    </>
  );
}
