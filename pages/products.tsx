import styles from "@/styles/Shop.module.css";
import { CircularProgress } from "@chakra-ui/react";
import Blueprints from "./components/Blueprints";
import { Blueprint } from "./components/Blueprints";
import Providers from "./components/Providers";
import { Provider } from "./components/Providers";
import { useEffect, useState } from "react";

export default function Products() {
  const [blueprints, setBlueprints] = useState(Array<Blueprint>);

  const fetchProducts = async () => {
    fetch("/api/get-blueprints")
      .then((res) => res.json())
      .then((data) => console.log(data.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Blueprints blueprints={blueprints} />
    </>
  );
}
