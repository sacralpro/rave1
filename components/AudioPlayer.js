"use client";

import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false); //Track if played by user
  const [firstLoad, setFirstLoad] = useState(true); // Track first load


  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
      setDuration(audioRef.current?.duration || 0);
    };

    const handleAudioError = (e) => {
      console.error("Error playing audio:", e);
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current && firstLoad) {
        setDuration(audioRef.current.duration);
        //Attempt autoplay only on first load
        audioRef.current.muted = false; // Unmute after metadata loads
        audioRef.current.play().catch(error => {
          console.warn("Autoplay prevented:", error);
          setPlaying(false);
        });
        setPlaying(true); // Set playing state to true after autoplay attempt
        setFirstLoad(false); //Set firstLoad to false after autoplay
      }
    };

    const attachListeners = () => {
      if (audioRef.current) {
        audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.addEventListener("error", handleAudioError);
        audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };

    const detachListeners = () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("error", handleAudioError);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };

    attachListeners();
    return detachListeners;
  }, []);


  const handlePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        if (audioRef.current.readyState >= 2) {
          audioRef.current.play().catch(error => {
            console.warn("Play prevented:", error);
          });
        } else {
          console.warn("Audio not ready to play yet.");
        }
      }
      setPlaying(!playing);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || duration === 0) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    audioRef.current.currentTime = percentage * duration;
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <div className="w-full flex flex-col items-center px-[40px] p-4 absolute bottom-10 z-[1000]">
      <div
        className="w-full h-0.5 bg-white relative cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          style={{
            width: `${(currentTime / duration) * 100}%`,
            height: "100%",
            backgroundColor: "black",
          }}
        />
      </div>
      <button
        onClick={handlePlayPause}
        className="text-white cursor-pointer p-4 mt-4"
        style={{ fontSize: "2em" }}
      >
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <audio ref={audioRef} src="Rave.mp3" preload="auto" />
    </div>
  );
};

export default AudioPlayer;
