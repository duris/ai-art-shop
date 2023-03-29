import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  images: Array<Image>;
  variant_id: number;
};
type Image = {
  is_default: boolean;
  src: string;
  variant_ids: Array<number>;
};

const ProductImages = ({ images, variant_id }: Props) => {
  const [imageIndex, setImageIndex] = useState(0);

  const goRight = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex((prev) => prev + 1);
    }
  };
  const goLeft = () => {
    if (imageIndex - 1 === -1) {
      setImageIndex(images.length - 1);
    } else {
      setImageIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      {/* {images
        .filter((image) => image.variant_ids[0] === variant_id)
        .map((image) => {
          console.log(image.src);
        })} */}

      <img src={images[imageIndex].src} />
      <div onClick={() => goRight()}>right arrow</div>
      <div onClick={() => goLeft()}>left arrow</div>
    </>
  );
};
export default ProductImages;
