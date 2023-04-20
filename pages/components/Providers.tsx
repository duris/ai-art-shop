import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Blueprint } from "./Blueprints";
import { Detail } from "./ProviderDetails";

type Props = {
  providers: Array<Provider>;
  //   children: React.ReactNode;
};

type ProviderObj = {
  id: number;
  title: string;
  products: Array<Blueprint>;
};

export type Provider = {
  id: number;
  title: string;
  location: object;
};

const Providers = ({ providers }: Props) => {
  const router = useRouter();

  const handleClick = (slug: number) => {
    router.push(`/create/${slug}`);
  };
  return (
    <>
      <h1>Providers</h1>
      <div className="providers-wrapper">
        {providers
          .filter((provider) => provider.title === `Sensaria`)
          .map((provider) => {
            return (
              <div key={provider.id} onClick={() => handleClick(provider.id)}>
                <h2>
                  {provider.title}: {provider.id}
                </h2>
                <div>{}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Providers;
