import { Placeholder, Options } from "./Variants";

type Props = {
  placeholders: Array<Placeholder> | undefined;
};

const Placeholders = ({ placeholders }: Props) => {
  return (
    <>
      <h1>Placeholders</h1>
      <div className="placeholder-wrapper">
        {placeholders
          ? placeholders.map((placeholder) => {
              return (
                <div key={JSON.stringify(placeholder)}>
                  <div>{placeholder.position}</div>
                  <div>{placeholder.height}</div>
                  <div>{placeholder.width}</div>
                </div>
              );
            })
          : "Loading..."}
      </div>
    </>
  );
};

export default Placeholders;
