import { useEffect } from "react";
import { Placeholder, Options } from "./Variants";

type Props = {
  placeholders: Array<Placeholder> | undefined;
};

const PlaceholderPanel = ({ placeholders }: Props) => {
  return (
    <>
      <div className="placeholder-panel">
        {placeholders
          ? placeholders.map((placeholder) => {
              return (
                <div key={JSON.stringify(placeholder)}>
                  <div>{placeholder.position}</div>
                  <div>{placeholder.height / 2}</div>
                  <div>{placeholder.width / 2}</div>
                </div>
              );
            })
          : "Loading..."}
      </div>
    </>
  );
};

export default PlaceholderPanel;
