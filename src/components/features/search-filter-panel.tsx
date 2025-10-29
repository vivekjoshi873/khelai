"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
  
const players = [
  { value: "virat_kohli", label: "Virat Kohli" },
  { value: "rohit_sharma", label: "Rohit Sharma" },
  { value: "jasprit_bumrah", label: "Jasprit Bumrah" },
  { value: "kl_rahul", label: "KL Rahul" },
  { value: "rishabh_pant", label: "Rishabh Pant" },
  { value: "hardik_pandya", label: "Hardik Pandya" },
];

const sessionTypesData = [
  { id: "batting", label: "Batting" },
  { id: "bowling", label: "Bowling" },
  { id: "fielding", label: "Fielding" },
  { id: "nets", label: "Nets" },
];

interface FilterState {
  searchQuery: string;
  dateRange: DateRange | undefined;
  selectedPlayers: string[];
  sessionTypes: string[];
  performanceMetrics: { [key: string]: number[] };
}

interface SearchFilterPanelProps {
  onApplyFilters: (filters: FilterState) => void;
  className?: string;
}

function DatePickerWithRange({
  date,
  setDate,
  className,
}: {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    const isSelected = selected.includes(value);
    if (isSelected) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const selectedLabels = selected
    .map((val) => options.find((opt) => opt.value === val)?.label)
    .filter(Boolean);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className="truncate">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search players..." />
          <CommandList>
            <CommandEmpty>No players found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    handleSelect(option.value);
                  }}
                >
                  <Checkbox
                    className="mr-2"
                    checked={selected.includes(option.value)}
                    onCheckedChange={() => handleSelect(option.value)}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const FilterContent = ({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}) => {
  const handleClear = () => {
    setFilters({
      searchQuery: "",
      dateRange: undefined,
      selectedPlayers: [],
      sessionTypes: [],
      performanceMetrics: {
        battingScore: [0, 100],
        bowlingEconomy: [0, 15],
      },
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9"
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <Accordion
          type="multiple"
          defaultValue={["dateRange", "players"]}
          className="w-full"
        >
          <AccordionItem value="dateRange">
            <AccordionTrigger className="text-sm font-semibold">
              Date Range
            </AccordionTrigger>
            <AccordionContent>
              <DatePickerWithRange
                date={filters.dateRange}
                setDate={(date) =>
                  setFilters((prev) => ({ ...prev, dateRange: date }))
                }
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="players">
            <AccordionTrigger className="text-sm font-semibold">
              Players
            </AccordionTrigger>
            <AccordionContent>
              <MultiSelect
                options={players}
                selected={filters.selectedPlayers}
                onChange={(selected) =>
                  setFilters((prev) => ({ ...prev, selectedPlayers: selected }))
                }
                placeholder="Select players"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sessionType">
            <AccordionTrigger className="text-sm font-semibold">
              Session Type
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {sessionTypesData.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={filters.sessionTypes.includes(type.id)}
                      onCheckedChange={(checked) => {
                        const newTypes = checked
                          ? [...filters.sessionTypes, type.id]
                          : filters.sessionTypes.filter((t) => t !== type.id);
                        setFilters((prev) => ({
                          ...prev,
                          sessionTypes: newTypes,
                        }));
                      }}
                    />
                    <Label htmlFor={type.id} className="text-sm font-normal">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="performanceMetrics">
            <AccordionTrigger className="text-sm font-semibold">
              Performance Metrics
            </AccordionTrigger>
            <AccordionContent className="space-y-6">
              <div>
                <Label className="text-sm">
                  Batting Score:{" "}
                  {filters.performanceMetrics.battingScore.join(" - ")}
                </Label>
                <Slider
                  defaultValue={[0, 100]}
                  value={filters.performanceMetrics.battingScore}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      performanceMetrics: {
                        ...prev.performanceMetrics,
                        battingScore: value,
                      },
                    }))
                  }
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm">
                  Bowling Economy:{" "}
                  {filters.performanceMetrics.bowlingEconomy.join(" - ")}
                </Label>
                <Slider
                  defaultValue={[0, 15]}
                  value={filters.performanceMetrics.bowlingEconomy}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      performanceMetrics: {
                        ...prev.performanceMetrics,
                        bowlingEconomy: value,
                      },
                    }))
                  }
                  max={15}
                  step={0.5}
                  className="mt-2"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="p-4 mt-auto border-t border-border">
        <div className="space-y-2">
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => {
              console.log("Applying filters:", filters);
            }}
          >
            Apply Filters
          </Button>
          <Button variant="secondary" className="w-full" onClick={handleClear}>
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function SearchFilterPanel({
  className,
}: {
  className?: string;
}) {
  const initialState: FilterState = {
    searchQuery: "",
    dateRange: undefined,
    selectedPlayers: [],
    sessionTypes: [],
    performanceMetrics: {
      battingScore: [0, 100],
      bowlingEconomy: [0, 15],
    },
  };
  const [filters, setFilters] = useState<FilterState>(initialState);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.dateRange) count++;
    if (filters.selectedPlayers.length > 0) count++;
    if (filters.sessionTypes.length > 0) count++;
    return count;
  }, [filters]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block w-[280px] bg-card border-r fixed h-full",
          className
        )}
      >
        <FilterContent filters={filters} setFilters={setFilters} />
      </aside>

      {/* Mobile Drawer */}
      <div className={cn("lg:hidden", className)}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-primary text-primary-foreground rounded-full px-2"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[340px] p-0 flex flex-col"
          >
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <FilterContent filters={filters} setFilters={setFilters} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export const ActiveFiltersDisplay = ({
  filters,
  onRemove,
}: {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value?: any) => void;
}) => {
  const activeFilters = [];

  if (filters.searchQuery) {
    activeFilters.push({
      key: "searchQuery",
      label: `Search: "${filters.searchQuery}"`,
      value: filters.searchQuery,
    });
  }

  if (filters.dateRange?.from) {
    const from = format(filters.dateRange.from, "MMM d");
    const to = filters.dateRange.to
      ? format(filters.dateRange.to, "MMM d, yyyy")
      : "";
    activeFilters.push({
      key: "dateRange",
      label: `Date: ${from} ${to ? `- ${to}` : ""}`,
      value: filters.dateRange,
    });
  }

  filters.selectedPlayers.forEach((p_val) => {
    const player = players.find((p) => p.value === p_val);
    if (player) {
      activeFilters.push({
        key: "selectedPlayers",
        label: player.label,
        value: p_val,
      });
    }
  });

  filters.sessionTypes.forEach((st_id) => {
    const sessionType = sessionTypesData.find((st) => st.id === st_id);
    if (sessionType) {
      activeFilters.push({
        key: "sessionTypes",
        label: sessionType.label,
        value: st_id,
      });
    }
  });

  if (!activeFilters.length) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <span className="text-sm font-medium">Active Filters:</span>
      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.key}-${index}`}
          variant="secondary"
          className="py-1 px-2"
        >
          {filter.label}
          <button
            onClick={() =>
              onRemove(filter.key as keyof FilterState, filter.value)
            }
            className="ml-1.5 focus:outline-none"
          >
            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
          </button>
        </Badge>
      ))}
    </div>
  );
};
