import { useState, useEffect } from "react";
import "./index.css";

function GitHubProfile({ name, bio, followers, repos, avatar }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center gap-4">
        <img
          className="rounded-full w-20 h-20"
          src={avatar}
          alt="Profile Image"
        />
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-500 mt-1">{bio}</p>
        </div>
      </div>
      <div className="flex gap-6 mt-4">
        <div className="text-center">
          <p className="text-xl font-bold">{followers}</p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{repos}</p>
          <p className="text-gray-400 text-sm">Repos</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Top Languages</p>
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            JavaScript
          </span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            React
          </span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            CSS
          </span>
        </div>
      </div>
    </div>
  );
}

function HabitTracker({ habits, toggleDay, newHabit, setNewHabit, addHabit }) {
  // const day = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Habit Tracker</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 outline-none"
        />
        <button
          onClick={addHabit}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center gap-1 mb-2">
          <p className="w-24 text-sm font-medium shrink-0">{habit.name}</p>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              onClick={() => toggleDay(habit.id, day)}
              className={`w-6 h-6 border rounded cursor-pointer
  ${habit.days[day] ? "bg-green-400 border-green-500" : "border-gray-300 hover:bg-green-100"}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProgressGraph({ habits }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const getScore = (day) => {
    return habits.filter((habit) => habit.days[day] === true).length;
  };

  const maxScore = habits.length || 1;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Progress Graph</h2>
      <div className="flex items-end gap-1 h-24">
        {days.map((day) => {
          const score = getScore(day);
          const height = (score / maxScore) * 100;
          return (
            <div
              key={day}
              className="flex-1 bg-green-400 rounded-t"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">Day 1</span>
        <span className="text-xs text-gray-400">Day 31</span>
      </div>
    </div>
  );
}

function Achievements({ habits }) {
  const achievements = [];

  // Achievement 1 — First Check
  const anyChecked = habits.some((habit) =>
    Object.values(habit.days).some((v) => v === true),
  );
  if (anyChecked) {
    achievements.push({
      icon: "🏆",
      title: "First Step",
      desc: "Completed your first habit",
    });
  }

  // Achievement 2 — Perfect Day
  const hasPerfectDay = Array.from({ length: 31 }, (_, i) => i + 1).some(
    (day) =>
      habits.length > 0 && habits.every((habit) => habit.days[day] === true),
  );
  if (hasPerfectDay) {
    achievements.push({
      icon: "⭐",
      title: "Perfect Day",
      desc: "Completed all habits in one day",
    });
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Achievements</h2>
      {achievements.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Complete habits to unlock achievements!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {achievements.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
            >
              <span className="text-2xl">{a.icon}</span>
              <div>
                <p className="font-semibold text-sm">{a.title}</p>
                <p className="text-gray-500 text-xs">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [profile, setProfile] = useState(null);
  const [newHabit, setNewHabit] = useState("");
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "DSA", days: {} },
          { id: 2, name: "GYM", days: {} },
          { id: 3, name: "JS/React", days: {} },
        ];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const fetchGithub = async () => {
      const response = await fetch("https://api.github.com/users/anshhhr");
      const data = await response.json();
      setProfile(data);
    };
    fetchGithub();
  }, []);

  const toggleDay = (habitId, day) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          return {
            ...habit,
            days: { ...habit.days, [day]: !habit.days[day] },
          };
        }
        return habit;
      }),
    );
  };

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    setHabits([...habits, { id: habits.length + 1, name: newHabit, days: {} }]);
    setNewHabit("");
  };

  const getScore = (day) => {
    return habits.filter((habit) => habit.days[day] === true).length;
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">CodePulse</h1>
      <div className="max-w-2xl mx-auto">
        <GitHubProfile
          name={profile?.name}
          bio={profile?.bio}
          followers={profile?.followers}
          repos={profile?.public_repos}
          avatar={profile?.avatar_url}
        />
        <HabitTracker
          habits={habits}
          toggleDay={toggleDay}
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          addHabit={addHabit}
        />
        <ProgressGraph habits={habits} />
        <Achievements habits={habits} />
      </div>
    </div>
  );
}
export default App;
