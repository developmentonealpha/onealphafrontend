"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface TextCarouselProps {
  text: string;
  characterLimit: number;
}

const splitTextIntoChunks = (text: string, limit: number): string[] => {
  const words = text.split(" ");
  const chunks: string[] = [];
  let currentChunk = "";

  words.forEach((word) => {
    if ((currentChunk + " " + word).length <= limit) {
      currentChunk += (currentChunk ? " " : "") + word;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = word;
    }
  });

  if (currentChunk) chunks.push(currentChunk);

  return chunks;
};

export default function TextCarousel({
  text,
  characterLimit,
}: TextCarouselProps) {
  const textChunks = splitTextIntoChunks(text, characterLimit);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full mt-1">
      <Carousel className="w-full h-full" setApi={setApi}>
        <CarouselContent>
          {textChunks.map((chunk, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex p-2 h-[100px]">
                  <p className="text-gray-300 text-sm md:text-lg font-funnel">
                    {chunk}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-black hover:bg-background/90 transition-opacity opacity-90 hover:opacity-100" /> */}
        {/* <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-black hover:bg-background/90 transition-opacity opacity-90 hover:opacity-100" /> */}
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        {textChunks.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
