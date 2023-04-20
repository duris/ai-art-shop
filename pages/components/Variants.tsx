import { useRouter } from "next/router";
import { Blueprint } from "./Blueprints";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Placeholders from "./Placeholders";
import PlaceholderPanel from "./PlaceholderPanel";

export type Placeholder = {
  height: number;
  width: number;
  position: string;
};

export type Options = {
  depth: string;
  size: string;
};

export type Variant = {
  id: number;
  title: string;
  options: Options;
  placeholders: Array<Placeholder> | undefined;
};

export type Provider = {
  id: number;
  title: string;
  variants: Array<Variant>;
};
type Props = {
  provider: Provider | undefined;
};

const Variants = ({ provider }: Props) => {
  const router = useRouter();
  let variants = provider?.variants;

  const [selectedVariant, setSelectedVariant] = useState<{
    id: string | undefined;
    title: string | undefined;
  }>({
    id: "81810",
    title: '3.5" x 4.9" (Vertical) / Coated (both sides) / 1 pc',
  });

  useEffect(() => {
    const variant = localStorage.getItem("selectedVariant");
    if (variant) {
      console.log("saved variant: ", variant);
      setSelectedVariant(JSON.parse(variant));
    }
  }, []);

  const [placeholders, setPlaceholders] = useState<Array<Placeholder>>();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.options.selectedIndex;

    setSelectedVariant({
      id: String(e.target.options[selectedIndex].getAttribute("data-key")),
      title: String(e.currentTarget.value),
    });

    localStorage.setItem("selectedVariant", JSON.stringify(selectedVariant));

    if (variants && selectedVariant) {
      const placeholder = variants.filter(
        (variant) => variant.id == Number(selectedVariant.id)
      );
      setPlaceholders(placeholder[0].placeholders);
    }
  };

  return (
    <>
      <div className="variant-wrapper">
        <div>{selectedVariant ? "" : "Select a Variant"}</div>
        <select onChange={(e) => handleSelect(e)}>
          {/* <option></option> */}
          {variants
            ? variants.map((variant) => {
                return (
                  <option key={variant.id} data-key={variant.id}>
                    {variant.title}
                  </option>
                );
              })
            : "Loading..."}
        </select>
        <div>
          {selectedVariant && variants
            ? variants
                .filter((variant) => variant.id == Number(selectedVariant.id))
                .map((variant) => {
                  return (
                    <div key={variant.id}>
                      <div>{JSON.stringify(variant)}</div>
                      <Placeholders placeholders={variant.placeholders} />
                    </div>
                  );
                })
            : "not selected yet"}
        </div>
      </div>
      <div className="image-holder">
        {selectedVariant && variants
          ? variants
              .filter((variant) => variant.id == Number(selectedVariant.id))
              .map((variant) => {
                return (
                  <PlaceholderPanel
                    key={variant.id}
                    placeholders={variant.placeholders}
                  />
                );
              })
          : "not selected yet"}
      </div>
    </>
  );
};

export default Variants;
