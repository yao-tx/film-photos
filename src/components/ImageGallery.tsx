"use client"

import { useEffect } from "react";
import type { ImageProps } from "../utils/types";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Image from "next/image";
import 'photoswipe/style.css';
import type { PreparedPhotoSwipeOptions } from "photoswipe";

export const ImageGallery = ({ images, galleryID }: { images: ImageProps[], galleryID: string }) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: "a.pswp-target",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <>
      {images.map(({ id, src, srcLarge, title, alt, blurDataURL }) => {
        return (
          <a
            href={srcLarge}
            data-pswp-width={1440}
            data-pswp-height={960}
            key={id}
            target="_blank"
            rel="noreferrer"
            className="pswp-target relative"
          >
            <Image
              key={id}
              width={720}
              height={480}
              src={src}
              alt={alt}
              title={title}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="w-full brightness-90 hover:brightness-110 hover:cursor-zoom-in"
            />
          </a>
        )
      })}
    </>
  );
}