import { getSession } from '@/actions/auth';
import ProductDetail from 'Features/Shop/ShopDetail/ProductDetail';
import ProductUsage from 'Features/Shop/ShopDetail/ProductUsage';
import SimilarProPickList from 'Features/Shop/ShopDetail/SimilarProPickList';

import { notFound } from 'next/navigation';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';
import { stripHtml } from '@/utils/striphtml-utils';

// ----------------------
// SEO Metadata
// ----------------------
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const session = await getSession();

  const urlProductDetail = session?.isLogin
    ? API_ROUTE.customerProductDetail.replace(':id', id)
    : API_ROUTE.guestProductDetail.replace(':id', id);

  const dataProductDetail = await FetchServer<IProducts.IProductDetail>(
    urlProductDetail,
    {
      method: 'GET',
      params: {},
      headers: session?.isLogin
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {},
      cache: session?.isLogin ? 'no-store' : 'default',
      next: session?.isLogin ? undefined : { revalidate: 120 },
    }
  );

  if (dataProductDetail.status === 404) {
    return {
      title: 'Product Not Found | Your Shop Name',
      description: 'The product you are looking for could not be found.',
    };
  }

  const product = dataProductDetail.data;

  const title = product?.nameEn || 'Product Detail';
  const rawDescription = product?.detailHtmlEn.description?.slice(0, 155) || ``;

  const description = stripHtml(rawDescription) || '';

  const image = product?.productImages?.[0].imageUrl || '/default-image.jpg';
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/shop/product/${id}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${title} | Lush Skin`,
      template: `%s | ${title} | Lush Skin`,
    },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Lush Skin`,
      description,
      url,
      type: 'website',
      images: [
        {
          url: image.startsWith('http')
            ? image
            : `${process.env.NEXT_PUBLIC_BASE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Lush Skin`,
      description,
      images: [
        image.startsWith('http')
          ? image
          : `${process.env.NEXT_PUBLIC_BASE_URL}${image}`,
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    keywords: [
      title,
      'Lush Skin',
      'Skincare product',
      'Beauty product',
      product.nameEn || 'Cosmetics',
    ],
  };
}

// ----------------------
// Page Component
// ----------------------
export default async function ShopDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const session = await getSession();

  const urlProductDetail = session?.isLogin
    ? API_ROUTE.customerProductDetail.replace(':id', id)
    : API_ROUTE.guestProductDetail.replace(':id', id);

  const dataProductDetail = await FetchServer<IProducts.IProductDetail>(
    urlProductDetail,
    {
      method: 'GET',
      headers: session?.isLogin
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {},
      cache: session?.isLogin ? 'no-store' : 'default',
      next: session?.isLogin ? undefined : { revalidate: 120 },
    }
  );

  if (dataProductDetail.status === 404) {
    return notFound();
  }

  if (dataProductDetail.status !== 200) {
    throw new Error('Failed to fetch product detail');
  }

  const productDetail = dataProductDetail.data;

  console.dir(dataProductDetail, { depth: null, colors: true });

  return (
    <div className='mx-auto max-w-[1240px] px-4 xl:px-0'>
      <ProductDetail productDetail={productDetail} />
      <ProductUsage
        detailHtmlEn={productDetail.detailHtmlEn}
        detailHtmlKh={productDetail.detailHtmlKh}
      />
      <SimilarProPickList session={session} prodId={productDetail.id} />
    </div>
  );
}
