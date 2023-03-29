import Product from "./Product";

type Variant = {
  id: number;
  sku: string;
  cost: number;
  grams: number;
  is_available: boolean;
  is_default: boolean;
  is_enabled: boolean;
  price: number;
  title: string;
};

type Props = {
  products: Array<Product>;
  variants: Array<Variant>;
  children: React.ReactNode;
};

const ProductList = ({ products, variants }: Props) => {
  return (
    <>
      <h1>Products</h1>
      {products.map((product) => {
        <Product product={product} variants={product.variants} />;
      })}
    </>
  );
};

export default ProductList;
