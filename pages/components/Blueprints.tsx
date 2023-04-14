export type Blueprint = {
  id: number;
  title: string;
  description: string;
  brand: string;
  model: string;
  images: Array<string>;
};

type Props = {
  blueprints: Array<Blueprint>;
};

const Blueprints = ({ blueprints }: Props) => {
  return (
    <>
      <h1>Blueprints</h1>
      <div className="blueprints-wrapper">
        {blueprints && blueprints.length > 0
          ? blueprints.map((blueprint) => {
              return (
                <div key={blueprint.id}>
                  <h2 className="blueprint-title">{blueprint.title}</h2>
                  <img src={blueprint.images[0]} />
                </div>
              );
            })
          : "Loading..."}
      </div>
    </>
  );
};

export default Blueprints;
