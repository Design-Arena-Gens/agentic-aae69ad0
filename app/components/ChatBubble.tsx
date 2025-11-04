import { motion } from "framer-motion";
import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";

type ChatBubbleProps = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  children?: ReactNode;
};

const bubbleStyles: Record<"user" | "assistant", CSSProperties> = {
  user: {
    background: "linear-gradient(135deg, #111827, #1f2937)",
    color: "#f9fafb",
    alignSelf: "flex-end"
  },
  assistant: {
    background: "#ffffff",
    color: "#111827",
    alignSelf: "flex-start",
    border: "1px solid rgba(17,24,39,0.1)",
    boxShadow: "0 16px 30px -20px rgba(17,24,39,0.35)"
  }
};

const timestampFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit"
});

export default function ChatBubble({
  role,
  content,
  timestamp,
  children
}: ChatBubbleProps) {
  const style = bubbleStyles[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={clsx("chat-bubble", role)}
      style={{
        maxWidth: "85%",
        borderRadius: "20px",
        padding: "18px 20px",
        lineHeight: 1.45,
        display: "grid",
        gap: "12px",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
        ...style
      }}
    >
      <div>{content}</div>
      <div
        style={{
          display: "flex",
          justifyContent: role === "user" ? "flex-end" : "flex-start",
          fontSize: "12px",
          color:
            role === "user" ? "rgba(249,250,251,0.7)" : "rgba(17,24,39,0.55)"
        }}
      >
        {timestampFormatter.format(timestamp)}
      </div>
      {children}
    </motion.div>
  );
}
