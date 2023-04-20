import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Variants, { Variant } from "@/pages/components/Variants";

export default function VariantPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [provider, setProvider] = useState();

  const print_provider_id = String(slug).split("c")[0].slice(0, -1);
  const blueprint_id = String(slug).split("c")[1];

  const fetchVariants = async () => {
    await fetch("/api/get-variants", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        print_provider_id: print_provider_id,
        blueprint_id: blueprint_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setProvider(data.data));
  };

  useEffect(() => {
    if (router.isReady) {
      fetchVariants();
    }
  }, [router.isReady]);

  return (
    <>
      <h1>Variant Page</h1>
      <div>
        provider: {print_provider_id} blueprint: {blueprint_id}
      </div>
      <Variants provider={provider} />
    </>
  );
}
