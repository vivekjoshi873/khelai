"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageSquare,
  X,
  Minus,
  SendHorizontal,
  Smile,
  Bot,
  User,
} from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
};

const initialConversation: Message[] = [
  {
    id: 1,
    sender: "agent",
    text: "Hello! Welcome to Khel.ai support. How can we assist you today?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    sender: "user",
    text: "Hi, I'm having trouble with the ball tracking feature.",
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    sender: "agent",
    text: "I'm sorry to hear that. Could you please describe the issue in more detail?",
    timestamp: "10:01 AM",
  },
  {
    id: 4,
    sender: "agent",
    text: "Also, could you let me know which device and app version you are using?",
    timestamp: "10:02 AM",
  },
];

const ChatHeader = ({ onClose }: { onClose: () => void }) => (
  <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
    <div>
      <h3 className="font-bold text-lg">Live Support</h3>
      <div className="flex items-center mt-1">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 bg-purple-300 rounded-full border-2 border-primary flex items-center justify-center">
            <Bot size={16} />
          </div>
        </div>
        <span className="text-xs pl-3 opacity-80">
          We typically reply in a few minutes
        </span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Minimize chat"
      >
        <Minus size={20} />
      </button>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  </header>
);

const MessageItem = ({ message }: { message: Message }) => {
  const isAgent = message.sender === "agent";
  return (
    <div className={`flex items-end gap-2 ${!isAgent && "justify-end"}`}>
      {isAgent && (
        <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
          <Bot size={20} />
        </div>
      )}
      <div className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}>
        <div
          className={`max-w-[80%] p-3 text-sm shadow-sm ${isAgent ? "bg-muted text-foreground rounded-r-lg rounded-tl-lg" : "bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg"}`}
        >
          <p>{message.text}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp}
        </span>
      </div>
      {!isAgent && (
        <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
          <User size={20} />
        </div>
      )}
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex items-end gap-2 px-4 pb-2">
    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
      <Bot size={20} />
    </div>
    <div className="flex items-center space-x-1 p-3 bg-muted rounded-r-lg rounded-tl-lg shadow-sm">
      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
    </div>
  </div>
);

const MessageArea = ({ messages }: { messages: Message[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-grow p-4 overflow-y-auto bg-background space-y-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      <TypingIndicator />
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatInput = ({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: FormEvent) => void;
}) => (
  <form
    onSubmit={onSend}
    className="p-4 bg-background border-t border-border shrink-0"
  >
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type a message..."
        className="w-full pr-24 pl-12 h-12 rounded-full bg-muted border-none focus:ring-2 focus:ring-ring focus:outline-none"
        aria-label="Chat message input"
      />
      <div className="absolute left-0 top-0 h-12 flex items-center justify-center px-4">
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </button>
      </div>
      <div className="absolute right-0 top-0 h-12 flex items-center justify-center pr-2">
        <button
          type="submit"
          className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
          aria-label="Send message"
          disabled={!value.trim()}
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  </form>
);

const ChatPanel = ({
  onClose,
  messages,
  onSendMessage,
  inputValue,
  setInputValue,
}: {
  onClose: () => void;
  messages: Message[];
  onSendMessage: (e: FormEvent) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}) => {
  return (
    <motion.div
      className="fixed bottom-24 right-6 w-[360px] h-[600px] bg-background rounded-xl shadow-2xl flex flex-col overflow-hidden z-[1000] border border-border sm:bottom-0 sm:right-0 sm:w-full sm:h-full sm:rounded-none"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      aria-modal="true"
      role="dialog"
    >
      <ChatHeader onClose={onClose} />
      <MessageArea messages={messages} />
      <ChatInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={onSendMessage}
      />
    </motion.div>
  );
};

const ChatBubble = ({
  onClick,
  unreadCount,
}: {
  onClick: () => void;
  unreadCount: number;
}) => (
  <motion.button
    onClick={onClick}
    className="fixed bottom-6 right-6 w-[60px] h-[60px] bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg z-50"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, type: "spring" },
    }}
    exit={{ opacity: 0, scale: 0.5 }}
    whileHover={{ scale: 1.1, rotate: -10 }}
    whileTap={{ scale: 0.9 }}
    aria-label={`Open chat support, ${unreadCount} unread messages`}
  >
    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping -z-10"></div>
    <MessageSquare size={32} />
    {unreadCount > 0 && (
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-background">
        {unreadCount}
      </div>
    )}
  </motion.button>
);

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialConversation);
  const [inputValue, setInputValue] = useState("");
  const [unreadCount, setUnreadCount] = useState(1);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setUnreadCount(0);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            onClose={() => setIsOpen(false)}
            messages={messages}
            onSendMessage={handleSendMessage}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isOpen && (
          <ChatBubble
            onClick={() => setIsOpen(true)}
            unreadCount={unreadCount}
          />
        )}
      </AnimatePresence>
    </>
  );
}
