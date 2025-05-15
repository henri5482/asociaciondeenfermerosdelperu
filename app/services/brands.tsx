import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const projects = [
  {
    image: "https://wallpapers.com/images/high/cool-4k-ultra-hd-9omzqpn2tzfhp8eg.webp",
    className: "w-80 h-52",
  },
  {
    image: "https://wallpapers.com/images/high/cool-4k-ultra-hd-9omzqpn2tzfhp8eg.webp",
    className: "w-96 h-72",
  },
  {
    image: "https://wallpapers.com/images/high/cool-4k-ultra-hd-9omzqpn2tzfhp8eg.webp",
    className: "w-72 h-64",
  },
  {
    image: "https://wallpapers.com/images/high/cool-4k-ultra-hd-9omzqpn2tzfhp8eg.webp",
    className: "w-80 h-56",
  },
  {
    image: "https://wallpapers.com/images/high/cool-4k-ultra-hd-9omzqpn2tzfhp8eg.webp",
    className: "w-72 h-64",
  },
  {
    image: "https://wallpapers.com/images/high/cool-4k-ultra-hd-9omzqpn2tzfhp8eg.webp",
    className: "w-96 h-60",
  },
];

const ImageCard = ({
  image,
  className,
}: {
  image: string;
  className: string;
}) => {
  return (
    <div className={cn("relative cursor-pointer overflow-hidden mx-4")}>
      <div className="flex flex-row items-center">
        <div className={cn("relative", className)}>
          <img
            src={image}
            alt="Project image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Brands = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <Marquee pauseOnHover className="[--duration:20s]">
        {projects.map((project, index) => (
          <ImageCard key={index} {...project} />
        ))}
      </Marquee>
    </div>
  );
};

export default Brands;
