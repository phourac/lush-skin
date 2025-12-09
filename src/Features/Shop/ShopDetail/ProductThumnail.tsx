'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import Image from 'next/image';

// const product = [
//   { id: 1, img: '/images/mocks/checkout-product.png' },
//   { id: 2, img: '/images/mocks/centella-hyalu-cica.png' },
//   { id: 3, img: '/images/mocks/centella-poremizing.png' },
//   // { id: 4, img: '/images/mocks/checkout-product.png' },
//   // { id: 5, img: '/images/mocks/centella-hyalu-cica.png' },
//   // { id: 6, img: '/images/mocks/centella-poremizing.png' },
//   // { id: 7, img: '/images/mocks/centella-hyalu-cica.png' },
//   // { id: 8, img: '/images/mocks/centella-poremizing.png' },
// ];

const ProductThumbnail = ({
  productImages,
}: {
  productImages: IProducts.ProductImageDetail[];
}) => {
  const [selected, setSelected] = useState(productImages[0]?.imageUrl);

  return (
    <div className='flex w-full flex-col items-start gap-2 md:flex-row'>
      {/* Main image */}
      <div className='relative h-[540px] w-full overflow-hidden rounded-xl md:h-[540px] md:w-[540px]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selected}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0'
          >
            <Image
              src={selected}
              alt='Selected product'
              fill
              sizes='(max-width: 768px) 100vw, 400px'
              className='rounded-xl object-cover'
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrollable thumbnail list */}
      <div className='h-auto flex-shrink-0 space-y-2 overflow-y-auto md:h-[540px] [&::-webkit-scrollbar]:hidden'>
        {productImages.map((item) => (
          <motion.div
            key={item.id}
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setSelected(item.imageUrl)}
            onClick={() => setSelected(item.imageUrl)}
            className={`cursor-pointer overflow-hidden rounded-[6px] border transition-colors ${
              selected === item.imageUrl ? 'border-primary' : 'border-border'
            }`}
          >
            <Image
              src={item.imageUrl}
              alt=''
              width={70}
              height={70}
              className='object-cover'
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductThumbnail;
