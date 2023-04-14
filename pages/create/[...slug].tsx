import { useEffect, useState } from "react";
import { Detail } from "../components/ProviderDetails";
import { useRouter } from "next/router";
import ProviderDetails from "../components/ProviderDetails";

export default function ProviderListing() {
  const [details, setDetails] = useState<Detail | undefined>();

  const router = useRouter();
  const { slug } = router.query;

  const fetchBlueprints = async () => {
    await fetch("/api/get-provider-blueprints", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        print_provider_id: slug,
      }),
    })
      .then((res) => res.json())
      .then((data) => setDetails(data.data));
  };

  useEffect(() => {
    fetchBlueprints();
  }, []);

  return (
    <>
      <h1>Provider ID:{slug}</h1>
      <ProviderDetails details={details} id={String(slug)} />
    </>
  );
}
