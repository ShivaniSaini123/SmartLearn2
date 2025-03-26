import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Pomodoro Header */}
      <h1 className="text-4xl font-bold text-white mt-20 mb-10 text-center">
        Stay focused
      </h1>
      <h1 className="text-3xl font-bold bg-white text-black px-5 py-2 rounded-lg shadow-md">
        Pomodoro
      </h1>

      {/* Mode Selection */}
      <div className="flex gap-4 my-5">
        {Object.keys(durations).map((key) => (
          <button 
            key={key} 
            onClick={() => setMode(key)} 
            className={`px-4 py-2 rounded-lg font-medium transition ${
              mode === key ? "bg-white text-black shadow-md" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {key.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {/* Circular Timer */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle 
            className="text-gray-600" 
            strokeWidth="4" 
            stroke="currentColor" 
            fill="transparent" 
            r="45" 
            cx="50" 
            cy="50" 
          />
          {/* Animated Progress Circle */}
          <motion.circle 
            className="text-green-500"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            strokeDasharray="282.6"
            strokeDashoffset={(1 - time / (durations[mode] * 60)) * 282.6}
            animate={{ strokeDashoffset: (1 - time / (durations[mode] * 60)) * 282.6 }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <span className="text-4xl font-bold">{formatTime(time)}</span>
      </div>

      {/* Control Buttons */}
      <div className="mt-6 flex gap-6">
        <button 
          onClick={() => setIsRunning(!isRunning)} 
          className="px-5 py-2 bg-blue-500 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button 
          onClick={() => { setTime(durations[mode] * 60); setIsRunning(false); }} 
          className="px-5 py-2 bg-red-500 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      {/* Settings Button */}
      <button onClick={() => setSettingsOpen(true)} className="mt-5 text-3xl">
        <FaCog className="hover:text-gray-400 transition" />
      </button>

      {/* Settings Modal */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white p-6 rounded-lg text-black w-80 shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-4">Settings</Dialog.Title>
          {Object.keys(durations).map((key) => (
            <div key={key} className="flex justify-between items-center my-3">
              <label className="font-medium">{key.replace(/([A-Z])/g, " $1")}:</label>
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
            className="px-4 py-2 bg-green-500 text-grey rounded mt-4 w-full hover:bg-green-600"
          >
            Save
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default PomodoroTimer;
