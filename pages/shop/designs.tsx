import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import Product from "../components/Product";

export default function Create() {
  const [products, setProducts] = useState(Array<Product>);

  useEffect(() => {
    fetch("/api/get-products").then((res) =>
      res.json().then((res) => setProducts(res.data.data))
    );
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <Heading>Create</Heading>
      <Grid gridTemplateColumns="1fr 1fr 1fr" gap={10}>
        {products.map((item) => {
          return (
            <GridItem key={item.id}>
              <Product variants={item.variants} images={item.images}>
                <Heading fontSize={20}>{item.title}</Heading>
                <span className="item-description">
                  {item.description.replace(/(<([^>]+)>)/gi, "")}
                </span>
              </Product>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
}
