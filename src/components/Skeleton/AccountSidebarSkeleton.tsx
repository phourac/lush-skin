// components/AccountCom/AccountSidebarSkeleton.tsx

export default function AccountSidebarSkeleton() {
  return (
    <div className='flex animate-pulse flex-col gap-8'>
      {/* Header */}
      <div className='space-y-6'>
        <div className='h-7 w-[160px] rounded bg-gray-200' />
        <div className='h-5 w-[120px] rounded bg-gray-200' />
      </div>

      {/* Menu List */}
      <div className='flex flex-col space-y-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='h-[48px] w-full rounded-[8px] border border-gray-200 bg-gray-100'
          ></div>
        ))}
      </div>
    </div>
  );
}
