import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export interface IProductContext {
  listProductBestSeller: IProducts.IProductData[];
  setListProductSeller: Dispatch<SetStateAction<IProducts.IProductData[]>>;
  pageBestSeller: number;
  setPageBestSeller: Dispatch<SetStateAction<number>>;
  apiPageBestSeller: number;
  setApiPageBestSeller: Dispatch<SetStateAction<number>>;

  listProductNewArrival: IProducts.IProductData[];
  setListProductNewArrival: Dispatch<SetStateAction<IProducts.IProductData[]>>;
  pageNewArrival: number;
  setPageNewArrival: Dispatch<SetStateAction<number>>;
  apiPageNewArrival: number;
  setApiPageNewArrival: Dispatch<SetStateAction<number>>;

  listProductSimilarProduct: IProducts.IProductData[];
  setListProductSimilarProduct: Dispatch<
    SetStateAction<IProducts.IProductData[]>
  >;
  pageSimilarProduct: number;
  setPageSimilarProduct: Dispatch<SetStateAction<number>>;
  apiPageSimilarProduct: number;
  setApiPageSimilarProduct: Dispatch<SetStateAction<number>>;

  listProductPopularProduct: IProducts.IProductData[];
  setListProductPopularProduct: Dispatch<
    SetStateAction<IProducts.IProductData[]>
  >;
  pagePopularProduct: number;
  setPagePopularProduct: Dispatch<SetStateAction<number>>;
  apiPagePopularProduct: number;
  setApiPagePopularProduct: Dispatch<SetStateAction<number>>;

  setList: Dispatch<SetStateAction<IProducts.IProductData[]>>;
  list: IProducts.IProductData[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const ProductContext = createContext<IProductContext>({
  listProductBestSeller: [],
  setListProductSeller: () => [],
  apiPageBestSeller: 1,
  pageBestSeller: 1,
  setApiPageBestSeller: () => {},
  setPageBestSeller: () => {},

  listProductNewArrival: [],
  setListProductNewArrival: () => [],
  apiPageNewArrival: 1,
  pageNewArrival: 1,
  setApiPageNewArrival: () => {},
  setPageNewArrival: () => {},

  listProductSimilarProduct: [],
  setListProductSimilarProduct: () => [],
  apiPageSimilarProduct: 1,
  pageSimilarProduct: 1,
  setApiPageSimilarProduct: () => {},
  setPageSimilarProduct: () => {},

  listProductPopularProduct: [],
  setListProductPopularProduct: () => [],
  apiPagePopularProduct: 1,
  pagePopularProduct: 1,
  setApiPagePopularProduct: () => {},
  setPagePopularProduct: () => {},

  setList: () => {},
  list: [],
  setPage: () => {},
  page: 1,
});
export function ProductWrapper({ children }: { children: ReactNode }) {
  const [listProductBestSeller, setListProductSeller] = useState<
    IProducts.IProductData[]
  >([]);
  const [pageBestSeller, setPageBestSeller] = useState(1);
  const [apiPageBestSeller, setApiPageBestSeller] = useState(1);

  const [listProductNewArrival, setListProductNewArrival] = useState<
    IProducts.IProductData[]
  >([]);
  const [pageNewArrival, setPageNewArrival] = useState(1);
  const [apiPageNewArrival, setApiPageNewArrival] = useState(1);

  const [listProductSimilarProduct, setListProductSimilarProduct] = useState<
    IProducts.IProductData[]
  >([]);
  const [pageSimilarProduct, setPageSimilarProduct] = useState(1);
  const [apiPageSimilarProduct, setApiPageSimilarProduct] = useState(1);

  const [listProductPopularProduct, setListProductPopularProduct] = useState<
    IProducts.IProductData[]
  >([]);
  const [pagePopularProduct, setPagePopularProduct] = useState(1);
  const [apiPagePopularProduct, setApiPagePopularProduct] = useState(1);

  const [list, setList] = useState<IProducts.IProductData[]>([]);
  const [page, setPage] = useState(1);

  return (
    <ProductContext.Provider
      value={{
        listProductBestSeller,
        setListProductSeller,
        apiPageBestSeller,
        pageBestSeller,
        setApiPageBestSeller,
        setPageBestSeller,

        apiPageNewArrival,
        listProductNewArrival,
        pageNewArrival,
        setApiPageNewArrival,
        setListProductNewArrival,
        setPageNewArrival,

        apiPageSimilarProduct,
        listProductSimilarProduct,
        pageSimilarProduct,
        setApiPageSimilarProduct,
        setListProductSimilarProduct,
        setPageSimilarProduct,

        apiPagePopularProduct,
        listProductPopularProduct,
        pagePopularProduct,
        setApiPagePopularProduct,
        setListProductPopularProduct,
        setPagePopularProduct,

        list,
        setList,
        page,
        setPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export function useProductContext() {
  return useContext(ProductContext);
}
