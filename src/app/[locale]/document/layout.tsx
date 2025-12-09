import DocumentSideBar from 'Features/Documents';
import { getTranslations } from 'next-intl/server';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const t = await getTranslations('document');

  const sidebarItems = [
    { label: t('Terms of service'), value: 'term' },
    { label: t('Privacy policy'), value: 'privacy-policy' },
    { label: t('Return policy'), value: 'return-policy' },
  ];

  return (
    <div className='border-border border-b'>
      <div className='mx-auto max-w-[1240px] px-4 pb-8 xl:px-0'>
        <div className='flex h-full gap-[88px] py-8'>
          <aside className='sticky top-[196px] hidden w-[246px] self-start lg:block'>
            <DocumentSideBar items={sidebarItems} />
          </aside>

          <main className='flex-1 space-y-6'>{children}</main>
        </div>
      </div>
    </div>
  );
}
