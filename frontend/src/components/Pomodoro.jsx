import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import "./Pomodoro.css";

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [durations, setDurations] = useState({ work: 25, shortBreak: 5, longBreak: 15 });

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    setTime(durations[mode] * 60);
  }, [mode, durations]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-br from-purple-950 via-fuchsia-800 to-black p-6">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-[0_2px_4px_rgba(255,0,255,0.4)]">Stay Focused</h1>

      <div className="text-3xl font-bold bg-white text-black px-6 py-3 rounded-xl shadow-lg mb-6">
        Pomodoro
      </div>

      {/* Mode Buttons */}
      <div className="flex gap-4 mb-6">
        {Object.keys(durations).map((key) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-5 py-2 rounded-xl font-semibold transition backdrop-blur-md shadow-md ${
              mode === key
                ? "bg-white text-black"
                : "bg-fuchsia-900 hover:bg-fuchsia-700 text-white"
            }`}
          >
            {key.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="relative w-52 h-52 flex items-center justify-center mb-6">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-600"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <motion.circle
            className="text-cyan-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            strokeDasharray="282.6"
            strokeDashoffset={(1 - time / (durations[mode] * 60)) * 282.6}
            animate={{
              strokeDashoffset: (1 - time / (durations[mode] * 60)) * 282.6,
            }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <span className="text-4xl font-bold tracking-widest drop-shadow-md">
          {formatTime(time)}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-6 mb-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-3 bg-gradient-to-tr from-green-400 to-cyan-400 text-black font-bold rounded-lg shadow-xl hover:scale-105 transition"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setTime(durations[mode] * 60);
            setIsRunning(false);
          }}
          className="px-6 py-3 bg-gradient-to-tr from-pink-500 to-red-500 text-white font-bold rounded-lg shadow-xl hover:scale-105 transition"
        >
          Reset
        </button>
      </div>

      {/* Settings Icon */}
      <button onClick={() => setSettingsOpen(true)} className="text-3xl mt-4 text-white hover:text-pink-300 transition">
        <FaCog />
      </button>

      {/* Settings Modal */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <Dialog.Panel className="bg-white text-black p-6 rounded-2xl w-80 shadow-2xl">
          <Dialog.Title className="text-2xl font-bold mb-4 text-center">Settings</Dialog.Title>
          {Object.keys(durations).map((key) => (
            <div key={key} className="flex justify-between items-center my-3">
              <label className="capitalize font-medium">{key.replace(/([A-Z])/g, " $1")}:</label>
              <input
                type="number"
                min="1"
                value={durations[key]}
                onChange={(e) => setDurations({ ...durations, [key]: +e.target.value })}
                className="border border-gray-300 rounded p-2 w-16 text-black"
              />
            </div>
          ))}
          <button
            onClick={() => setSettingsOpen(false)}
            className="w-full mt-5 py-2 bg-gradient-to-tr from-lime-400 to-emerald-500 rounded-lg text-black font-bold hover:scale-105 transition"
          >
            Save
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default PomodoroTimer;
