export type ImageProps = {
  id: number;
  public_id: string;
  height: string;
  width: string;
  src: string;
  format: string;
  blurDataURL?: string;
  title: string;
  alt: string;
};

export type CloudinaryResource = {
  public_id: string;
  height: string;
  width: string;
  secure_url: string;
  format: string;
  context: {
    alt: string;
    caption: string;
  };
};