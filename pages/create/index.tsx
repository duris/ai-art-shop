import { useEffect, useState } from "react";
import styles from "@/styles/Shop.module.css";
import { CircularProgress } from "@chakra-ui/react";
import Blueprints from "../components/Blueprints";
import Providers from "../components/Providers";
import { Provider } from "../components/Providers";

export default function Create() {
  const [providers, setProviders] = useState(Array<Provider>);

  const fetchProviders = async () => {
    fetch("/api/get-providers")
      .then((res) => res.json())
      .then((data) => setProviders(data.data));
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <>
      <Providers providers={providers} />
    </>
  );
}
