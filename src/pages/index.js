import RootLayout from "@/components/Layouts/RootLayout";
import AllCategories from "@/components/UI/AllCategories";
import AllProducts from "@/components/UI/AllProducts";
import { addToProduct } from "@/redux/product/productSlice";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = ({ allProducts, allCategories }) => {
  const dispatch = useDispatch();
  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  useEffect(() => {
    sessionStorage.setItem("categoriesData", JSON.stringify(allCategories));
    dispatch(addToProduct(allCategories));
  });
  return (
    <div className="p-3 lg:p-6">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicBanner></DynamicBanner>
      <AllProducts allProducts={allProducts}></AllProducts>
      <AllCategories allCategories={allCategories}></AllCategories>
    </div>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page, allCategories) {
  return <RootLayout allCategories={allCategories}>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://tech-world-server-psi.vercel.app/api/v1/products"
  );
  const res2 = await fetch(
    "https://tech-world-server-psi.vercel.app/api/v1/categories"
  );
  const data = await res.json();
  const data2 = await res2.json();

  return {
    props: {
      allProducts: data,
      allCategories: data2,
    },
  };
};
