"use client";

import { useState, useMemo, FC } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Play, Share2, Download, Heart, Filter } from "lucide-react";

interface VideoHighlight {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  timestamp: string;
  line: "Good" | "Full" | "Short";
  length: "Yorker" | "Bouncer" | "Full Toss";
  spin: "Off Spin" | "Leg Spin" | "Googly" | "None";
}

const videoHighlights: VideoHighlight[] = [
  {
    id: "1",
    duration: "0:15",
    timestamp: "3 hours ago",
    line: "Good",
    length: "Yorker",
    spin: "None",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "2",
    duration: "0:22",
    timestamp: "5 hours ago",
    line: "Short",
    length: "Bouncer",
    spin: "None",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "3",
    duration: "0:12",
    timestamp: "1 day ago",
    line: "Full",
    length: "Full Toss",
    spin: "Leg Spin",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "4",
    duration: "0:18",
    timestamp: "2 days ago",
    line: "Good",
    length: "Yorker",
    spin: "Off Spin",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "5",
    duration: "0:25",
    timestamp: "3 days ago",
    line: "Short",
    length: "Bouncer",
    spin: "None",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "6",
    duration: "0:10",
    timestamp: "4 days ago",
    line: "Full",
    length: "Yorker",
    spin: "Googly",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "7",
    duration: "0:30",
    timestamp: "5 days ago",
    line: "Good",
    length: "Full Toss",
    spin: "None",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "8",
    duration: "0:14",
    timestamp: "1 week ago",
    line: "Short",
    length: "Yorker",
    spin: "Leg Spin",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "9",
    duration: "0:19",
    timestamp: "1 week ago",
    line: "Full",
    length: "Bouncer",
    spin: "Off Spin",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "10",
    duration: "0:11",
    timestamp: "2 weeks ago",
    line: "Good",
    length: "Yorker",
    spin: "None",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "11",
    duration: "0:21",
    timestamp: "2 weeks ago",
    line: "Short",
    length: "Bouncer",
    spin: "Googly",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
  {
    id: "12",
    duration: "0:16",
    timestamp: "3 weeks ago",
    line: "Full",
    length: "Full Toss",
    spin: "None",
    thumbnailUrl:
      "https://placehold.co/1600x900/A78BFA/FFFFFF/png?text=Highlight",
    videoUrl: "",
  },
];

const filterOptions = {
  line: ["Good", "Full", "Short"],
  length: ["Yorker", "Bouncer", "Full Toss"],
  spin: ["Off Spin", "Leg Spin", "Googly"],
};

type FilterCategory = "line" | "length" | "spin";

interface FilterPanelProps {
  filters: Record<FilterCategory, string[]>;
  onFilterChange: (category: FilterCategory, value: string) => void;
}

const FilterPanel: FC<FilterPanelProps> = ({ filters, onFilterChange }) => (
  <Accordion
    type="multiple"
    defaultValue={["line", "length", "spin"]}
    className="w-full"
  >
    {(Object.keys(filterOptions) as FilterCategory[]).map((category) => (
      <AccordionItem value={category} key={category}>
        <AccordionTrigger className="text-base font-medium capitalize hover:no-underline">
          {category}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {filterOptions[category].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${category}-${option}`}
                  checked={filters[category].includes(option)}
                  onCheckedChange={() => onFilterChange(category, option)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={`${category}-${option}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const VideoHighlightsGallery = () => {
  const [filters, setFilters] = useState<Record<FilterCategory, string[]>>({
    line: [],
    length: [],
    spin: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoHighlight | null>(
    null
  );

  const ITEMS_PER_PAGE = 9;

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setFilters((prev) => {
      const newCategoryFilters = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: newCategoryFilters };
    });
    setCurrentPage(1);
  };

  const filteredVideos = useMemo(() => {
    return videoHighlights.filter((video) => {
      const lineMatch =
        filters.line.length === 0 || filters.line.includes(video.line);
      const lengthMatch =
        filters.length.length === 0 || filters.length.includes(video.length);
      const spinMatch =
        filters.spin.length === 0 || filters.spin.includes(video.spin);
      return lineMatch && lengthMatch && spinMatch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleVideoClick = (video: VideoHighlight) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <aside className="hidden lg:block lg:col-span-1 bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <Filter className="mr-2 h-5 w-5 text-primary" />
              Smart Filters
            </h3>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-center text-base py-6"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Highlights
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-xl font-bold">
                    Smart Filters
                  </SheetTitle>
                </SheetHeader>
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </SheetContent>
            </Sheet>
          </div>

          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentVideos.map((video, index) => (
                <Card
                  key={video.id}
                  className="overflow-hidden group cursor-pointer animate-in fade-in-0 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleVideoClick(video)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnailUrl}
                        alt={`Thumbnail for highlight ${video.id}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="bg-primary/80 rounded-full h-16 w-16 flex items-center justify-center scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                          <Play className="h-8 w-8 text-primary-foreground fill-primary-foreground" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground">
                        {video.timestamp}
                      </p>
                      <div className="flex items-center justify-end space-x-1 mt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Share2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((p) => Math.max(1, p - 1));
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent shadow-none">
          <div className="aspect-video w-full">
            {selectedVideo && (
              <div className="w-full h-full bg-black flex items-center justify-center text-white rounded-lg">
                Video player for highlight {selectedVideo.id} will be here.
                {/* In a real app, this would be: 
                                <video src={selectedVideo.videoUrl} controls autoPlay className="w-full h-full rounded-lg" /> 
                                */}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoHighlightsGallery;
