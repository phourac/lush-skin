'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import dynamic from 'next/dynamic';

import { useAddressContext } from '@/contexts/AddressContext';

import ContactForm from './ContactForm';

const GoogleMapLazy = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.GoogleMap),
  {
    ssr: false,
  }
);
const MarkerLazy = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.Marker),
  { ssr: false }
);

const containerStyle = { width: '100%', height: '417px' };

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const mapItem: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const ContactUs = () => {
  const t = useTranslations('about');

  const { isLoaded, addressName } = useAddressContext();

  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.25 }}
      className='py-16'
    >
      <motion.h1
        variants={item}
        className='text-typography-base text-center text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'
      >
        {' '}
        {t('Contact Us')}
      </motion.h1>

      <motion.div
        variants={mapItem}
        className='relative w-full overflow-hidden pt-8'
      >
        {' '}
        {/* Skeleton stays until isLoaded becomes true */}
        {!isLoaded && (
          <div className='bg-paper h-[417px] w-full animate-pulse rounded-md' />
        )}
        {isLoaded && (
          <GoogleMapLazy
            mapContainerStyle={containerStyle}
            center={addressName.coord}
            zoom={15}
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              scrollwheel: false,
              disableDefaultUI: true,
            }}
          >
            <MarkerLazy position={addressName.coord} />
          </GoogleMapLazy>
        )}
      </motion.div>

      <motion.div variants={item}>
        <ContactForm />
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
