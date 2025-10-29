"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Head Coach, Mumbai Mavericks",
    quote:
      "khel.ai's ball tracking is a masterpiece. It provides us with pinpoint accuracy, allowing for strategic adjustments that were previously impossible. A must-have for any serious team.",
    avatar: "https://i.pravatar.cc/80?u=AaravSharma",
    rating: 5,
  },
  {
    name: "Priya Singh",
    role: "Team Manager, Delhi Dynamos",
    quote:
      "The automated video clipping has transformed our post-match analysis. What used to take hours now takes minutes, freeing up my staff to focus on player development.",
    avatar: "https://i.pravatar.cc/80?u=PriyaSingh",
    rating: 5,
  },
  {
    name: "Rohan Chatterjee",
    role: "Opening Batsman, Kolkata Knights",
    quote:
      "As a player, getting real-time feedback through the khel.ai app is invaluable. I can review my performance instantly and make corrections on the fly. It's like having a coach in my pocket.",
    avatar: "https://i.pravatar.cc/80?u=RohanChatterjee",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "Academy Director, Bangalore Blasters",
    quote:
      "We use khel.ai across all our youth teams. The data visualization tools are fantastic for teaching young players the nuances of the game. The flexible plans made it accessible for our academy.",
    avatar: "https://i.pravatar.cc/80?u=AnanyaReddy",
    rating: 5,
  },
  {
    name: "Vikram Kumar",
    role: "Bowling Coach, Punjab Lions",
    quote:
      "The precision of the analysis is unmatched. We can analyze every delivery, identify weaknesses and formulate winning strategies. It's a key part of our success.",
    avatar: "https://i.pravatar.cc/80?u=VikramKumar",
    rating: 4,
  },
];

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

const CarouselContext = React.createContext<
  | (CarouselProps & {
      carouselRef: ReturnType<typeof useEmblaCarousel>[0];
      api: ReturnType<typeof useEmblaCarousel>[1];
      scrollPrev: () => void;
      scrollNext: () => void;
      canScrollPrev: boolean;
      canScrollNext: boolean;
      selectedIndex: number;
      scrollTo: (index: number) => void;
      scrollSnaps: number[];
    })
  | null
>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const autoplayInterval = React.useRef<NodeJS.Timeout | null>(null);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setSelectedIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(
      () => emblaApi?.scrollPrev(),
      [emblaApi]
    );
    const scrollNext = React.useCallback(
      () => emblaApi?.scrollNext(),
      [emblaApi]
    );
    const scrollTo = React.useCallback(
      (index: number) => emblaApi?.scrollTo(index),
      [emblaApi]
    );

    const stopAutoplay = React.useCallback(() => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
        autoplayInterval.current = null;
      }
    }, []);

    const startAutoplay = React.useCallback(() => {
      if (!emblaApi) return;
      stopAutoplay();
      autoplayInterval.current = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      }, 5000);
    }, [emblaApi, stopAutoplay]);

    React.useEffect(() => {
      if (!emblaApi) return;
      onSelect(emblaApi);
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on("select", onSelect);
      emblaApi.on("reInit", () => {
        onSelect(emblaApi);
        setScrollSnaps(emblaApi.scrollSnapList());
      });
      startAutoplay();
      return () => {
        stopAutoplay();
        emblaApi?.off("select", onSelect);
      };
    }, [emblaApi, onSelect, startAutoplay, stopAutoplay]);

    React.useEffect(() => {
      if (setApi) setApi(emblaApi);
    }, [emblaApi, setApi]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef: emblaRef,
          api: emblaApi,
          opts,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollTo,
          scrollSnaps,
        }}
      >
        <div
          ref={ref}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn("flex -ml-4", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-10 w-10 rounded-full flex items-center justify-center bg-white/80 hover:bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed -left-5 top-1/2 -translate-y-1/2 z-10",
        className
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="h-5 w-5 text-primary" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-10 w-10 rounded-full flex items-center justify-center bg-white/80 hover:bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed -right-5 top-1/2 -translate-y-1/2 z-10",
        className
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="h-5 w-5 text-primary" />
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

const StarRating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-1", className)}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-5 w-5",
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )}
      />
    ))}
  </div>
);

const TestimonialCard = ({
  name,
  role,
  avatar,
  rating,
  quote,
  index,
}: (typeof testimonials)[0] & { index: number }) => {
  const { selectedIndex } = useCarousel();
  const isActive = selectedIndex === index;

  return (
    <div
      className={cn(
        "h-full w-full p-[1.5px] rounded-xl transition-all",
        isActive
          ? "bg-gradient-to-r from-primary-purple to-purple-gradient-end"
          : "bg-transparent"
      )}
    >
      <div className="flex h-full w-full flex-col justify-between rounded-[11px] bg-card p-6 shadow-sm">
        <div>
          <div className="flex items-start gap-4">
            <Image
              src={avatar}
              alt={name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-text-dark">{name}</h4>
              <p className="text-sm text-text-gray">{role}</p>
            </div>
          </div>
          <p className="mt-4 text-lg italic text-text-gray">"{quote}"</p>
        </div>
        <StarRating rating={rating} className="mt-4" />
      </div>
    </div>
  );
};

export default function TestimonialsCarousel() {
  return (
    <section className="w-full py-20 lg:py-24 bg-background-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-dark sm:text-4xl">
            What our users are saying
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-text-gray">
            Hear from coaches, managers, and players who have transformed their
            game with khel.ai.
          </p>
        </div>
        <Carousel
          opts={{ align: "center", loop: true }}
          className="w-full max-w-6xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <TestimonialCard {...testimonial} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />

          <div className="flex justify-center gap-2 mt-8">
            <CarouselDots />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

const CarouselDots = () => {
  const { selectedIndex, scrollSnaps, scrollTo } = useCarousel();
  return (
    <>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={cn(
            "h-3 w-3 rounded-full transition-colors duration-200",
            index === selectedIndex
              ? "bg-primary"
              : "bg-gray-300 hover:bg-gray-400"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </>
  );
};
