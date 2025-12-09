import React from 'react';

import Image from 'next/image';

const imgArray = [
  { src: '/images/img-highlight-01.png' },
  { src: '/images/img-highlight-02.png' },
  { src: '/images/img-highlight-03.png' },
  { src: '/images/img-highlight-04.png' },
  { src: '/images/img-highlight-05.png' },
];

const ImageHighlight = React.memo(() => {
  return (
    <section className='w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [--gap:2.5rem] [&::-webkit-scrollbar]:hidden'>
      <div className='mx-auto flex w-max items-center gap-[var(--gap)] px-4 py-4'>
        {imgArray.map((item, idx) => (
          <div
            key={idx}
            className='relative aspect-[3/5] w-[180px] flex-shrink-0 snap-center rounded-[12px] md:w-[240px]'
          >
            <Image
              src={item.src}
              alt={`highlight-image-${idx}`}
              fill
              loading='lazy'
              fetchPriority='low'
              sizes='(max-width: 768px) 180px, 240px'
              className='rounded-[12px] object-cover transition-transform duration-300 will-change-transform hover:scale-[1.05]'
            />
          </div>
        ))}
      </div>
    </section>
  );
});

ImageHighlight.displayName = 'ImageHighlight';

export default ImageHighlight;
