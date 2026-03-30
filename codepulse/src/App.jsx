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

function HabitTracker({ habits, toggleDay }) {
  // const day = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Habit Tracker</h2>

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

function App() {
  const [profile, setProfile] = useState(null);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim() === "") return [...habits, { id: habits.length + 1 }];
  };

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

  const toggleDay = (habitId, day) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          return {
            ...habit,
            days: {
              ...habit.days,
              [day]: !habit.days[day],
            },
          };
        }
        return habit;
      }),
    );
  };

  useEffect(() => {
    const fetchGithub = async () => {
      const responce = await fetch("https://api.github.com/users/anshhhr");
      const data = await responce.json();
      setProfile(data);
    };
    fetchGithub();
  }, []);

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

      {/* <button onClick={() => setName("Raj Kumar")}>Change Name</button> */}
      <div className="max-w-2xl mx-auto">
        <GitHubProfile
          name={profile?.name}
          bio={profile?.bio}
          followers={profile?.followers}
          repos={profile?.public_repos}
          avatar={profile?.avatar_url}
        />
        <HabitTracker habits={habits} toggleDay={toggleDay}></HabitTracker>
      </div>
    </div>
  );
}
export default App;
