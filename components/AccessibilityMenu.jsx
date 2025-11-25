"use client";
import { useState, useEffect } from "react";

// === GLOBAL TTS HANDLER ===
let selectedVoice = null;

const loadVoices = () => {
  const voices = window.speechSynthesis.getVoices();

  // Cari voice Indonesia berdasarkan NAMA voice
  selectedVoice =
    voices.find(v => v.name.toLowerCase().includes("indonesia")) || // Google Bahasa Indonesia
    voices.find(v => v.name.toLowerCase().includes("bahasa")) ||    // fallback voice Indonesia
    voices.find(v => v.lang === "id-ID") ||                         // normal indonesia voice
    voices[0]; // fallback jika semua gagal
};

if (typeof window !== "undefined") {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

const speak = (text) => {
  if (!text || window.speechSynthesis.speaking) return;

  const utter = new SpeechSynthesisUtterance(text);

  utter.lang = "id-ID";

  if (selectedVoice) {
    utter.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utter);
};

const handleTTSSelection = () => {
  const text = window.getSelection().toString();
  if (text.trim().length > 0) speak(text);
};

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);

  const items = [
    { key: "contrast", label: "Contrast +" },
    { key: "highlight", label: "Highlight Links" },
    { key: "biggerText", label: "Bigger Text" },
    { key: "spacing", label: "Text Spacing" },
    { key: "pauseAnim", label: "Pause Animations" },
    { key: "hideImg", label: "Hide Images" },
    { key: "dyslexia", label: "Dyslexia Friendly" },
    { key: "cursor", label: "Big Cursor" },
    { key: "tooltips", label: "Tooltips" },
    { key: "lineHeight", label: "Line Height" },
    { key: "align", label: "Text Align" },
    { key: "saturation", label: "Low Saturation" },
    { key: "tts", label: "Text To Speech" },
    { key: "oversized", label: "Oversized Widget" }
  ];

  const [settings, setSettings] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    setSettings(saved);
  }, []);

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem("a11y-settings", JSON.stringify(updated));
    applySetting(key, value);
  };

  const applySetting = (key, value) => {
    switch (key) {
      case "contrast":
        document.body.classList.toggle("high-contrast", value);
        break;
      case "highlight":
        document.body.classList.toggle("highlight-links", value);
        break;
      case "biggerText":
        document.body.classList.toggle("big-text", value);
        break;
      case "spacing":
        document.body.classList.toggle("text-spacing", value);
        break;
      case "pauseAnim":
        document.body.classList.toggle("pause-anim", value);
        break;
      case "hideImg":
        document.body.classList.toggle("hide-images", value);
        break;
      case "dyslexia":
        document.body.classList.toggle("dyslexic-font", value);
        break;
      case "cursor":
        document.body.classList.toggle("big-cursor", value);
        break;
      case "tooltips":
        document.body.classList.toggle("show-tooltips", value);
        break;
      case "lineHeight":
        document.body.classList.toggle("line-height", value);
        break;
      case "align":
        document.body.classList.toggle("text-align", value);
        break;
      case "saturation":
        document.body.classList.toggle("low-saturation", value);
        break;
      case "oversized":
        document.body.classList.toggle("oversized-widget", value);
        break;
      case "tts":
        if (value) {
          document.addEventListener("mouseup", handleTTSSelection);
        } else {
          document.removeEventListener("mouseup", handleTTSSelection);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    Object.keys(settings).forEach((key) => applySetting(key, settings[key]));
  }, [settings]);

  const resetSettings = () => {
    setSettings({});
    localStorage.removeItem("a11y-settings");

    document.body.classList.remove(
      "high-contrast",
      "highlight-links",
      "big-text",
      "text-spacing",
      "pause-anim",
      "hide-images",
      "dyslexic-font",
      "big-cursor",
      "show-tooltips",
      "line-height",
      "text-align",
      "low-saturation",
      "oversized-widget"
    );

    document.removeEventListener("mouseup", handleTTSSelection);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="access-btn">
        ♿
      </button>

      {open && (
        <div className="access-panel">
          <h3>Aksesibilitas</h3>

          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => updateSetting(item.key, !settings[item.key])}
              className={`access-item ${settings[item.key] ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}

          <button onClick={resetSettings} className="reset-btn">
            Reset
          </button>
        </div>
      )}
    </>
  );
}
