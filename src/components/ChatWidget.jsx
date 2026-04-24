import { useMemo, useState } from "react";

const qa = {
  hello: "Hi, I am Mahabub's AI assistant. Ask about skills, services, or projects.",
  project: "Featured projects include AI commerce dashboards, realtime analytics, and fintech onboarding.",
  skill: "Core stack: React, Node.js, JavaScript, Python, SQL, and modern animation tooling.",
  contact: "Reach out via the Contact page or email: alammahabub333@gmail.com",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("Ask me anything about this portfolio.");
  const [listening, setListening] = useState(false);

  const recognition = useMemo(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const instance = new SpeechRecognition();
    instance.lang = "en-US";
    instance.interimResults = false;
    instance.maxAlternatives = 1;
    return instance;
  }, []);

  const ask = () => {
    const key = Object.keys(qa).find((k) => msg.toLowerCase().includes(k));
    setReply(qa[key] || "Great question. For detailed discussion, use the contact form.");
    setMsg("");
  };

  const listen = () => {
    if (!recognition) {
      setReply("Voice mode is not supported in this browser.");
      return;
    }
    setListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      const spoken = event.results?.[0]?.[0]?.transcript || "";
      setMsg(spoken);
      const key = Object.keys(qa).find((k) => spoken.toLowerCase().includes(k));
      setReply(qa[key] || `Voice received: "${spoken}"`);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  return (
    <div className={`chat-widget ${open ? "open" : ""}`}>
      <button className="chat-toggle ai-orb" onClick={() => setOpen((v) => !v)}>{open ? "Close AI" : "AI Orb"}</button>
      {open && (
        <div className="chat-body glass">
          <p>{reply}</p>
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask about projects, skills..." />
          <div className="row">
            <button onClick={ask}>Send</button>
            <button onClick={listen}>{listening ? "Listening..." : "Voice Ask"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
