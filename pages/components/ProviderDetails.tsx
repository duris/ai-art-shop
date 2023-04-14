import { useRouter } from "next/router";
import { Blueprint } from "./Blueprints";

export type Detail = {
  title: string;
  id: number;
  blueprints: Array<Blueprint>;
  location: object;
};

type Props = {
  details: Detail | undefined;
  id: string | undefined;
};

const ProviderDetails = ({ details, id }: Props) => {
  const router = useRouter();
  const { slug } = router.query;

  const goToProduct = (provider_id: string, blueprint_id: string) => {
    router.push(`/create/products/${blueprint_id}`);
  };
  return (
    <div className="provider-details">
      <h1>{details ? `${details.title}: ${id}` : "Loading..."}</h1>
      <div className="provider-details-wrapper">
        {details
          ? details.blueprints.map((blueprint) => {
              return (
                <div
                  key={blueprint.id}
                  onClick={() => goToProduct(String(id), String(blueprint.id))}
                >
                  <div>{blueprint.title}</div>
                  <img src={blueprint.images[0]} />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default ProviderDetails;
