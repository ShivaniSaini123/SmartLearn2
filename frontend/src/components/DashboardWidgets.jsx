import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AttendanceChart = ({ attendance }) => {
  const data = {
    labels: ['Attendance', 'Absent'],
    datasets: [
      {
        data: [attendance, 100 - attendance],
        backgroundColor: ['#ffcc00', '#22223b'],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="card attendance-chart-card">
      <h3>Attendance</h3>
      <div className="attendance-pie-wrapper">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

const StudyHoursChart = ({ hours }) => {
  const data = {
    labels: ['Study Hours'],
    datasets: [
      {
        label: 'Hours This Week',
        data: [hours],
        backgroundColor: ['#00b894'],
        borderRadius: 8,
      },
    ],
  };
  const options = {
    indexAxis: 'y',
    scales: {
      x: { max: 40, beginAtZero: true },
    },
  };
  return (
    <div className="card">
      <h3>Study Hours</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

const WelcomeCard = ({ name }) => (
  <div className="card">
    <h2>Welcome, {name || "Student"} 👋</h2>
    <p>Ready to crush your goals today?</p>
  </div>
);

const GoalProgressCard = () => (
  <div className="card">
    <h3>🎯 Goal Progress</h3>
    <p>“Complete DBMS Notes”</p>
    <progress value={60} max={100} />
    <p>60% done</p>
  </div>
);

const TodayScheduleCard = () => (
  <div className="card">
    <h3>📅 Today’s Schedule</h3>
    <ul>
      <li>9 AM - DBMS Class</li>
      <li>11 AM - AI Assignment</li>
      <li>4 PM - Group Study</li>
    </ul>
  </div>
);

const PomodoroCard = () => (
  <div className="card">
    <h3>⏱️ Pomodoro</h3>
    <p>25:00 - Focus Mode</p>
    <button>Start</button>
  </div>
);

const QuickStats = ({ stats }) => (
  <div className="card">
    <h3>📊 Quick Stats</h3>
    <p>Attendance: {stats.attendance}%</p>
    <p>Study Hours This Week: {stats.hoursStudied} hrs</p>
  </div>
);

const MotivationCard = () => (
  <div className="card">
    <h3>💡 Motivation</h3>
    <p>“Discipline is the bridge between goals and accomplishment.”</p>
  </div>
);

// Main Dashboard Widgets Wrapper
// ...existing code...
const DashboardWidgets = ({ userdata }) => {
  const stats = {
    attendance: 92,
    hoursStudied: 12
  };

  return (
    <div className="dashboard-widgets-enhanced">
      <div className="welcome-bar"><WelcomeCard name={userdata.name} /></div>
      <div className="motivation-bar"><MotivationCard /></div>
      <div className="attendance-chart"><AttendanceChart attendance={stats.attendance} /></div>
      <div className="study-hours-chart"><StudyHoursChart hours={stats.hoursStudied} /></div>
      <div className="goal-progress"><GoalProgressCard /></div>
      <div className="today-schedule"><TodayScheduleCard /></div>
      <div className="pomodoro"><PomodoroCard /></div>
      <div className="quick-stats"><QuickStats stats={stats} /></div>
    </div>
  );
};
// ...existing code...

export default DashboardWidgets;