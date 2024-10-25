import { v2 as cloudinary } from "cloudinary";
import type { ImageProps, CloudinaryResource } from "./types";
import generateBlurPlaceholder from "./generateBlurPlaceholder";

export const getImages = async () => {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    context: true,
  });

  const { resources }: { resources: CloudinaryResource[] } =
    await cloudinary.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .with_field("context")
      .sort_by("public_id", "desc")
      .max_results(1000)
      .execute();

  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let resource of resources) {
    reducedResults.push({
      id: i,
      public_id: resource.public_id,
      height: resource.height,
      width: resource.width,
      src: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${resource.public_id}`,
      srcLarge: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1440/${resource.public_id}`,
      format: resource.format,
      title: resource.context.alt ?? "",
      alt: resource.context.caption ?? "",
    });
    i++;
  }

  const blurImagePromises = resources.map((resource: CloudinaryResource) => {
    return generateBlurPlaceholder(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${resource.public_id}.${resource.format}`
    );
  });

  const imagesWithBlurDataURLs = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataURL = imagesWithBlurDataURLs[i];
  }

  return reducedResults;
}