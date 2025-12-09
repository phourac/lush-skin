// components/Address/AddressListSkeleton.tsx
export default function AddressListSkeleton() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='h-[80px] w-full animate-pulse rounded-lg border border-gray-200 bg-gray-100'
        ></div>
      ))}
    </div>
  );
}
