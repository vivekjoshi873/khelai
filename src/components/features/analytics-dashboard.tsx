"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, BarChart2, TrendingUp, Compass, Map } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ballSpeedData = [
  { over: "1", "Player A": 145, "Player B": 142 },
  { over: "2", "Player A": 147, "Player B": 143 },
  { over: "3", "Player A": 146, "Player B": 144 },
  { over: "4", "Player A": 148, "Player B": 145 },
  { over: "5", "Player A": 149, "Player B": 146 },
  { over: "6", "Player A": 150, "Player B": 147 },
];

const swingData = [
  { type: "In-Swing", "Player A": 12, "Player B": 10 },
  { type: "Out-Swing", "Player A": 18, "Player B": 20 },
  { type: "Straight", "Player A": 70, "Player B": 70 },
];

const spinData = [
    { over: "1", "Player A": 2200, "Player B": 2150 },
    { over: "2", "Player A": 2250, "Player B": 2180 },
    { over: "3", "Player A": 2300, "Player B": 2200 },
    { over: "4", "Player A": 2280, "Player B": 2250 },
    { over: "5", "Player A": 2350, "Player B": 2300 },
];

const pitchMapData = [
    { x: 0.2, y: 10, result: "Wicket", player: "A" },
    { x: -0.5, y: 8, result: "4 Runs", player: "A" },
    { x: 0.8, y: 12, result: "1 Run", player: "A" },
    { x: -0.1, y: 9, result: "No Run", player: "A" },
    { x: 0.4, y: 11, result: "6 Runs", player: "A" },
    { x: -0.3, y: 10.5, result: "Wicket", player: "B" },
    { x: 0.6, y: 7.5, result: "4 Runs", player: "B" },
    { x: -0.7, y: 11.5, result: "No Run", player: "B" },
];


export default function AnalyticsDashboard() {
  const [compareMode, setCompareMode] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <div className="bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Player Analytics Dashboard</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[260px] justify-start text-left font-normal",
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
              <PopoverContent className="w-auto p-0" align="end">
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

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Match Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="t20">T20</SelectItem>
                <SelectItem value="odi">ODI</SelectItem>
                <SelectItem value="test">Test</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Switch id="compare-mode" checked={compareMode} onCheckedChange={setCompareMode} />
              <Label htmlFor="compare-mode">Compare Players</Label>
            </div>
          </div>
        </header>

        <Tabs defaultValue="bowling" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="batting">Batting</TabsTrigger>
            <TabsTrigger value="bowling">Bowling</TabsTrigger>
            <TabsTrigger value="fielding">Fielding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="batting" className="mt-6">
            <p className="text-muted-foreground">Batting analytics coming soon.</p>
          </TabsContent>

          <TabsContent value="bowling" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm rounded-lg border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Ball Speed Trend</CardTitle>
                  <CardDescription>Average ball speed per over (km/h)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ballSpeedData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="over" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius-md)' }} />
                      <Legend />
                      <Line type="monotone" dataKey="Player A" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
                      {compareMode && <Line type="monotone" dataKey="Player B" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--chart-1))" }} activeDot={{ r: 6 }} />}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm rounded-lg border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Compass className="h-5 w-5 text-primary" />Swing Analysis</CardTitle>
                  <CardDescription>Percentage of swing types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={swingData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                        <Tooltip cursor={{fill: 'hsl(var(--accent))'}} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius-md)' }} />
                        <Legend />
                        <Bar dataKey="Player A" fill="hsl(var(--primary))" radius={[0, 12, 12, 0]} />
                        {compareMode && <Bar dataKey="Player B" fill="hsl(var(--chart-1))" radius={[0, 12, 12, 0]} />}
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

               <Card className="shadow-sm rounded-lg border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5 text-primary" />Spin Rate (RPM)</CardTitle>
                  <CardDescription>Revolutions per minute per over</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={spinData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="over" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius-md)' }} />
                      <Legend />
                      <Line type="monotone" dataKey="Player A" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      {compareMode && <Line type="monotone" dataKey="Player B" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm rounded-lg border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Map className="h-5 w-5 text-primary" />Pitch Map</CardTitle>
                  <CardDescription>Ball landing positions and results</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                           <defs>
                                <pattern id="pitch" patternUnits="objectBoundingBox" width="1" height="1">
                                    <rect width="1" height="1" fill="hsl(var(--muted))" />
                                </pattern>
                           </defs>
                           <rect width="100%" height="100%" fill="url(#pitch)" />
                           <CartesianGrid strokeDasharray="3 3"/>
                           <XAxis type="number" dataKey="x" name="Stump Line" unit="m" domain={[-1.5, 1.5]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                           <YAxis type="number" dataKey="y" name="Length" unit="m" domain={[0, 22]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                           <ZAxis type="category" dataKey="result" name="Result" />
                           <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius-md)' }} />
                           <Legend />
                           <Scatter name="Player A" data={pitchMapData.filter(p => p.player === 'A')} fill="hsl(var(--primary))" />
                           {compareMode && <Scatter name="Player B" data={pitchMapData.filter(p => p.player === 'B')} fill="hsl(var(--chart-1))" shape="cross" />}
                        </ScatterChart>
                    </ResponsiveContainer>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="fielding" className="mt-6">
            <p className="text-muted-foreground">Fielding analytics coming soon.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}