
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const phrases = [
  "Get personalized game recommendations",
  "Discover games you'll love",
  "Your next favorite game awaits",
];

const quotes = [
  `"Games have so much freedom. You can go anywhere." — Jeneva Chen`,
  `"Video games foster the mindset that allows creativity to grow." — Nolan Bushnell`,
  `"Every game is a story waiting to be told." — Unknown`,
];

export default function LandingPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Typing effect for phrases
   useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const isEnd = charIndex === currentPhrase.length;
    const isStart = charIndex === 0;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayedText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (isEnd) setTimeout(() => setDeleting(true), 1000);
      } else {
        setDisplayedText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (isStart) {
          setDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, deleting ? 50 : 120);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  // Rotating quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] flex items-center justify-center px-4">
      {/* Animated background blobs */}
      <div className="absolute w-[60vw] h-[60vw] bg-purple-500 opacity-30 rounded-full top-[-20%] left-[-20%] animate-blob blur-3xl"></div>
      <div className="absolute w-[50vw] h-[50vw] bg-pink-500 opacity-20 rounded-full bottom-[-10%] right-[-15%] animate-blob animation-delay-2000 blur-3xl"></div>

      {/* Glass effect card */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-10 text-white shadow-xl text-center max-w-md w-full">
        <h1 className="text-4xl sm:text-5xl text-gray-500 font-extrabold mb-4">
          Welcome to <span className="text-purple-400">🎮 GameMatch</span>
        </h1>
        <p className="mb-4 min-h-[36px] text-lg text-gray-400 font-mono">
          {displayedText}
          <span className="inline-block w-1 h-6 bg-purple-400 animate-pulse ml-1"></span>
        </p>
        <p className="italic text-sm text-gray-400 mb-6 min-h-[60px]">— {quotes[quoteIndex]}</p>
        <Link to="/login">
          <button className="bg-linear-to-r from-purple-200 via-indigo-400 to-violet-600 text-white font-bold rounded-lg transition-all duration-300 shadow-md w-full">
            Login / Sign Up
          </button>
        </Link>
      </div>

      {/* Blob Animation Keyframes */}
      <style>
        {`
          @keyframes blob {
            0%, 100% {
              transform: scale(1) translate(0px, 0px);
            }
            50% {
              transform: scale(1.1) translate(20px, -30px);
            }
          }
          .animate-blob {
            animation: blob 8s infinite ease-in-out;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}
      </style>
    </div>
  );
}
