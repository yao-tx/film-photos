import Image from "next/image";
import { getImages } from "@/utils/cloudinary";
import { Home as HomeIcon } from "lucide-react";

async function Home() {
  const images = await getImages();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-screen gap-4 py-24 px-12">
      <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex justify-between items-start">
        <div>
          <p className="text-2xl font-bold tracking-wide">film photos (unedited)</p>
          <p className="text-xs tracking-tight">
            Olympus OM-10 / Portra 400
          </p>
          <p className="text-xs tracking-tight">by&nbsp;
            <a
              href="https://github.com/yao-tx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-90"
            >
              yao-tx
            </a>
          </p>
        </div>
        <a
          href="https://yaotx.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 hover:opacity-90"
        >
          <HomeIcon className="w-5 h-5" />
        </a>
      </div>
      {images.map(({ id, src, title, alt, blurDataURL }) => {
        return (
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
        )
      })}
    </main>
  );
};

export default Home;