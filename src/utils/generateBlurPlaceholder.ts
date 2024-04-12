import { getPlaiceholder } from "plaiceholder";

export default async function generateBlurPlaceholder(imgSrc: string) {
  try {
    const buffer = await fetch(imgSrc).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (err) {
    console.log(err);
  }
};