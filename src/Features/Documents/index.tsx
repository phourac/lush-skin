'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

interface Props {
  items: { label: string; value: string }[];
}

export default function DocumentSideBar({ items }: Props) {
  const segments = useSelectedLayoutSegments();
  const current = segments[0];

  return (
    <div className='flex flex-col gap-4'>
      {items.map((item) => {
        const isActive = item.value === current;

        return (
          <Link
            aria-label={item.label}
            key={item.value}
            href={`/document/${item.value}`}
            className={`${
              isActive
                ? 'bg-primary-light text-primary border-primary-light'
                : 'text-typography-base border-border bg-white'
            } flex h-[48px] w-[246px] cursor-pointer items-center justify-center rounded-[8px] border-[1px] px-6 py-2 text-[15px] font-medium transition-all duration-300`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
