"use client";

import * as React from "react";
import { Bell, Star, BarChart3, Info } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Notification = {
  id: string;
  category: "highlights" | "stats" | "system";
  icon: React.ElementType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    category: "highlights",
    icon: Star,
    title: "New highlights",
    message: "Your latest match highlights are ready.",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    category: "stats",
    icon: BarChart3,
    title: "Stats update",
    message: "Your weekly performance stats have been updated.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    category: "system",
    icon: Info,
    title: "System announcement",
    message: "Scheduled maintenance on Sunday at 2 AM.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "4",
    category: "highlights",
    icon: Star,
    title: "Milestone unlocked",
    message: "You've reached 100 hours of analyzed footage.",
    timestamp: "3 days ago",
    read: true,
  },
];

export default function NotificationBadge() {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = React.useState(false);

  const unreadCount = React.useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNotif: Notification = {
          id: Date.now().toString(),
          category: "system",
          icon: Info,
          title: "New System Message",
          message: "Patch v1.2.5 is now live. Please update.",
          timestamp: "Just now",
          read: false,
        };
        setNotifications((prev) => [newNotif, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          )}
          <Bell className="h-5 w-5" />
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[300px] p-0 shadow-lg rounded-lg border-border"
      >
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h4 className="font-semibold text-sm text-foreground">
            Notifications
          </h4>
          {unreadCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-sm text-primary"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="max-h-[400px]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-3 transition-colors hover:bg-accent cursor-pointer",
                    !notification.read && "bg-primary/5"
                  )}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {!notification.read && (
                      <div className="absolute h-2 w-2 rounded-full bg-primary -translate-x-1.5 translate-y-2.5"></div>
                    )}
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary">
                      <notification.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <Bell className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                You have no new notifications.
              </p>
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t border-border text-center">
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
