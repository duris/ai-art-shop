import { useEffect, useState } from "react";
import { Detail } from "../components/ProviderDetails";
import { useRouter } from "next/router";
import ProviderDetails from "../components/ProviderDetails";
import Variants from "../components/Variants";
import ResizableContainer from "../components/ResizableContainer";

export default function Create() {
  const [details, setDetails] = useState<Detail | undefined>();
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string | undefined;
    title: string | undefined;
  }>({
    id: "81810",
    title: '3.5" x 4.9" (Vertical) / Coated (both sides) / 1 pc',
  });

  const router = useRouter();
  const { slug } = router.query;

  const [provider, setProvider] = useState();

  const print_provider_id = "228";

  useEffect(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, []);

  const fetchVariants = async () => {
    await fetch("/api/get-variants", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        print_provider_id: print_provider_id,
        blueprint_id: 1094,
      }),
    })
      .then((res) => res.json())
      .then((data) => setProvider(data.data));
  };

  const fetchBlueprints = async () => {
    await fetch("/api/get-provider-blueprints", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        print_provider_id: print_provider_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setDetails(data.data));
  };

  useEffect(() => {
    fetchBlueprints();
  }, []);

  useEffect(() => {
    fetchVariants();
  }, [details]);

  return (
    <>
      <h1>Create</h1>
      <div className="create-wrapper">
        <ProviderDetails details={details} id={print_provider_id} />
        <Variants provider={provider} />
      </div>
    </>
  );
}
