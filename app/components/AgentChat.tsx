import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import MessageComposer from "./MessageComposer";
import {
  ConversationMessage,
  generateAgentResponse
} from "../../lib/agent";

const starterPrompts = [
  "Build me a crispy chicken meal under 800 calories.",
  "What breakfast items are highest in protein?",
  "Any McDonald's app deals today?",
  "I need something kid-friendly with no nuts."
];

const initialMessage: ConversationMessage = {
  role: "assistant",
  timestamp: Date.now(),
  content:
    "Hey there! I’m your virtual McDonald’s crew member. I can help plan meals, surface limited-time offers, recommend combos around specific calorie targets, or break down nutrition and allergen info. What can I get started for you?"
};

export default function AgentChat() {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    initialMessage
  ]);
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const sendMessage = (text: string) => {
    if (isThinking) return;

    const userMessage: ConversationMessage = {
      role: "user",
      content: text,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    setTimeout(() => {
      setMessages((prev) => {
        const history = [...prev];
        const { reply, followUps } = generateAgentResponse(
          text,
          history
        );

        setSuggestedFollowUps(followUps);

        return [
          ...history,
          {
            role: "assistant",
            content: reply,
            timestamp: Date.now()
          }
        ];
      });

      setIsThinking(false);
    }, 450);
  };

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "28px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        border: "1px solid rgba(15, 23, 42, 0.06)",
        boxShadow: "0 24px 40px -28px rgba(15, 23, 42, 0.45)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "18px",
          flexWrap: "wrap"
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              color: "#0f172a"
            }}
          >
            Chat with the Crew
          </h2>
          <p
            style={{
              margin: "8px 0 0 0",
              color: "rgba(15, 23, 42, 0.6)",
              maxWidth: "540px"
            }}
          >
            Ask about anything from breakfast hours to nutrition, and I’ll build
            a personalized plan using current menu intel.
          </p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
        }}
      >
        {starterPrompts.map((prompt) => (
          <motion.button
            key={prompt}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => sendMessage(prompt)}
            style={{
              padding: "14px 16px",
              borderRadius: "18px",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              background: "#ffffff",
              color: "#0f172a",
              fontSize: "14px",
              textAlign: "left",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 15px 25px -20px rgba(15, 23, 42, 0.4)",
              opacity: isThinking ? 0.6 : 1,
              pointerEvents: isThinking ? "none" : "auto"
            }}
          >
            {prompt}
          </motion.button>
        ))}
      </motion.div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          minHeight: "360px",
          maxHeight: "540px",
          overflowY: "auto",
          paddingRight: "6px"
        }}
      >
        {messages.map((message, index) => (
          <ChatBubble
            key={`${message.timestamp}-${index}`}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{
              alignSelf: "flex-start",
              padding: "10px 16px",
              borderRadius: "14px",
              background: "rgba(215,0,0,0.08)",
              color: "#a90000",
              fontSize: "13px"
            }}
          >
            Pulling from menu training…
          </motion.div>
        )}
        <div ref={scrollAnchorRef} />
      </div>

      {suggestedFollowUps.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            padding: "12px 16px",
            borderRadius: "16px",
            background: "#f1f5f9",
            border: "1px solid rgba(148, 163, 184, 0.3)"
          }}
        >
          {suggestedFollowUps.map((suggestion) => (
            <motion.button
              key={suggestion}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => sendMessage(suggestion)}
              style={{
                borderRadius: "999px",
                border: "none",
                background: "#ffffff",
                color: "#0f172a",
                padding: "10px 18px",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 10px 20px -18px rgba(15, 23, 42, 0.65)"
              }}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      )}

      <MessageComposer onSend={sendMessage} disabled={isThinking} />
    </section>
  );
}
