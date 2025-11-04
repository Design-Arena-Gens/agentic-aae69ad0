import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type MessageComposerProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function MessageComposer({
  onSend,
  disabled
}: MessageComposerProps) {
  const [draft, setDraft] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setDraft("");
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{
        display: "flex",
        gap: "12px",
        padding: "14px",
        borderRadius: "20px",
        background: "#f8fafc",
        border: "1px solid rgba(15, 23, 42, 0.05)",
        boxShadow: "0 10px 30px -20px rgba(15,23,42,0.4)",
        position: "sticky",
        bottom: 0
      }}
    >
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Ask about breakfast hours, build a combo, or hunt for deals..."
        style={{
          flexGrow: 1,
          border: "none",
          resize: "none",
          background: "transparent",
          fontSize: "15px",
          lineHeight: 1.5,
          color: "#111827",
          fontFamily: "inherit",
          outline: "none",
          minHeight: "60px"
        }}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          minWidth: "120px",
          borderRadius: "16px",
          border: "none",
          fontWeight: 600,
          padding: "0 18px",
          background: disabled
            ? "rgba(215,0,0,0.3)"
            : "linear-gradient(135deg, var(--primary), var(--primary-dark))",
          color: "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: disabled
            ? "none"
            : "0 15px 25px -15px rgba(215,0,0,0.55)"
        }}
      >
        Send
      </button>
    </motion.form>
  );
}
