import { useEffect, useState } from "react";
import styles from "@/styles/Shop.module.css";
import { CircularProgress } from "@chakra-ui/react";

export default function Shop() {
  const [shopData, setShopData] = useState([]);

  type Rating = {
    count: number;
    rate: number;
  };

  type Item = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: Rating;
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setShopData(data));
  }, []);

  return (
    <>
      <h1>Shop</h1>
      <div className="shop-wrapper">
        {shopData.length > 0 ? (
          shopData.map((item: Item) => (
            <div key={item.id} className="product">
              <img src={item.image}></img>
              <div className="title">{item.title}</div>
              <div className="price">{item.price}</div>
            </div>
          ))
        ) : (
          <CircularProgress size={5} isIndeterminate color="blue.600" />
        )}
      </div>
    </>
  );
}
