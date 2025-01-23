"use client";

import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
      setDuration(audioRef.current?.duration || 0);
      console.log("Time update:", { currentTime, duration }); // Log time updates
    };
    const handleAudioError = (e) => {
      console.error("Error playing audio:", e);
      console.log("Audio Error:", audioRef.current);
    };
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
        console.log("Metadata loaded:", { duration }); // Log duration after metadata load
        //Attempt autoplay after metadata is loaded
        if(audioRef.current){
            audioRef.current.play().catch(error => {
                console.warn("Autoplay prevented:", error);
                setPlaying(false);
            });
        }
    }


    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("error", handleAudioError);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("error", handleAudioError);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      console.log("Play/pause button clicked. Audio state:", audioRef.current.readyState);
      console.log("Current time:", audioRef.current.currentTime);
      console.log("Duration:", audioRef.current.duration);
      console.log("Paused?", audioRef.current.paused);
      console.log("Playing?", playing);

      if (playing) {
        audioRef.current.pause();
      } else {
        // Check if the audio is ready to play before attempting to play
        if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA (2) or higher
          audioRef.current.play().catch(error => {
              console.warn("Play prevented:", error);
          });
        } else {
          console.warn("Audio not ready to play yet.  readyState:", audioRef.current.readyState);
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
    console.log("Progress bar clicked:", { percentage, currentTime }); //Log progress bar click
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
      <audio ref={audioRef} src="Rave.mp3" />
    </div>
  );
};

export default AudioPlayer;
