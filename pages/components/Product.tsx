import { Box } from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import ProductImages from "./ProductImages";

type Image = {
  is_default: boolean;
  src: string;
  variant_ids: Array<number>;
};
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

type Product = {
  id: string;
  description: string;
  blueprint_id: number;
  created_at: Date;
  images: Array<Image>;
  shop_id: number;
  title: string;
  variants: Array<Variant>;
  children: React.ReactNode;
};

type Props = {
  images: Array<Image>;
  variants: Array<Variant>;
  children: React.ReactNode;
};

type Prod = {
  elements?: Array<Element>;
};

const Product = ({ variants, children, images }: Props) => {
  const varRef = useRef<Element>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".variants");
    elements.forEach((element, i) => {
      const children = element.children as HTMLCollectionOf<HTMLElement>;

      children[activeIndex].classList.add("active");

      for (let j = 0; j < children.length; j++) {
        if (j != activeIndex) {
          children[j].style.display = "none";
        } else {
          children[j].style.display = "block";
        }
      }
      console.log(activeIndex);
    });
  }, [activeIndex]);

  type Target = {
    value: string;
  };

  // const handleSelect = (e: any) => {
  //   setActiveIndex(e.target.value.slice(-1));
  // };

  return (
    <div className="product">
      {children}

      <Box gridArea="variants" className="variants">
        {variants
          .filter((vari, i) => vari.is_enabled)
          .map((variant) => {
            return (
              <div className="variant">
                <ProductImages
                  images={images.filter(
                    (image) => image.variant_ids[0] === variant.id
                  )}
                  variant_id={variant.id}
                />
                <div>{variant.title}</div>
                <div>${variant.price / 100}</div>
              </div>
            );
          })}
        {/* {variants
          .filter((vari, i) => i === activeIndex)
          .map((variant) => {
            return (
              <div className="variant">
                <ProductImages images={images} variant_id={variant.id} />
                <div>{variant.title}</div>
                <div>${variant.price / 100}</div>
              </div>
            );
          })} */}
      </Box>
      <select>
        {variants
          .filter((vari) => vari.is_enabled)
          .map((variant, i) => {
            return (
              <option id="name">
                {variant.title} ${variant.price / 100} {i}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Product;
