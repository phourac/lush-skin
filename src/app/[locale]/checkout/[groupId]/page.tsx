import CheckoutDetail from 'Features/Checkout/CheckoutDetail';

import { notFound } from 'next/navigation';

interface PageProps {
  params: { groupId: string };
}

export default async function Page({ params }: PageProps) {
  const { groupId } = params;

  if (!groupId || groupId.trim() === '') {
    notFound();
  }

  return (
    <div className='border-border border-b-[1px]'>
      <div className='border-border mx-auto max-w-[1240px] border-b-[1px] px-4 pb-8 xl:px-0'>
        <CheckoutDetail groupId={groupId} />
      </div>
    </div>
  );
}
