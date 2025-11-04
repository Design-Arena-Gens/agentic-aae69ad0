import { motion } from "framer-motion";

const featureHighlights = [
  {
    title: "Menu Concierge",
    body: "Personalized meal suggestions across breakfast, classics, and limited-time offers."
  },
  {
    title: "Nutrition Snapshot",
    body: "Instant calories, protein, and allergen info pulled from our knowledge base."
  },
  {
    title: "Deal Hunter",
    body: "Surfacing current app-only deals, bundles, and rewards boosters in seconds."
  }
];

export default function HeroCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(215,0,0,0.9), rgba(215,0,0,0.65))",
        color: "#fff",
        borderRadius: "28px",
        padding: "40px",
        boxShadow:
          "0 25px 50px -12px rgba(215,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.12)",
        display: "grid",
        gap: "24px"
      }}
    >
      <div>
        <p
          style={{
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "8px",
            color: "rgba(255, 255, 255, 0.65)",
            margin: 0,
            marginBottom: "12px"
          }}
        >
          McDonald&apos;s AI Crew Member
        </p>
        <h1
          style={{
            fontSize: "38px",
            lineHeight: 1.1,
            margin: 0,
            fontWeight: 700
          }}
        >
          Serve personalized Golden Arches experiences at any scale.
        </h1>
      </div>

      <p
        style={{
          fontSize: "18px",
          maxWidth: "720px",
          margin: 0,
          color: "rgba(255, 255, 255, 0.8)"
        }}
      >
        A conversational agent built for crew teams, franchisees, and fans. It
        blends menu intelligence, nutrition lookup, and promotional guidance to
        answer questions the same way a seasoned crew member would—24/7.
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
        }}
      >
        {featureHighlights.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "20px",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              backdropFilter: "blur(12px)"
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                margin: "0 0 10px 0",
                fontWeight: 600
              }}
            >
              {feature.title}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: 1.4,
                color: "rgba(255, 255, 255, 0.75)"
              }}
            >
              {feature.body}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
