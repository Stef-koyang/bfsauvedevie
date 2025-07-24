// components/AudioAlert.js
import { useEffect, useRef } from "react";

export default function AudioAlert({ play }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Éviter erreur si interdit par navigateur
      });
    }
  }, [play]);

  return <audio ref={audioRef} src="/alert.mp3" preload="auto" />;
}
