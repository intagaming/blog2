/* eslint-disable react/jsx-props-no-spreading */
import Image, { ImageProps } from "next/image";

const NextImage = (props: ImageProps) => (
  <div className="block">
    <Image layout="responsive" {...props} />
  </div>
);

export default NextImage;
