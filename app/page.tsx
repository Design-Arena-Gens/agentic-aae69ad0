"use client";

import { motion } from "framer-motion";
import AgentChat from "./components/AgentChat";
import HeroCard from "./components/HeroCard";

export default function Home() {
  return (
    <main
      style={{
        width: "100%",
        maxWidth: "1100px",
        display: "grid",
        gap: "32px"
      }}
    >
      <HeroCard />
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AgentChat />
      </motion.section>
      <div className="noise" />
    </main>
  );
}
