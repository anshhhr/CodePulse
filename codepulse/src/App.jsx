import { useState, useEffect } from "react";

function GitHubProfile({ name, bio, followers, repos }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{bio}</p>
      <p>Follower: {followers}</p>
      <p>Repos: {repos}</p>
    </div>
  );
}

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchGithub = async () => {
      const responce = await fetch("https://api.github.com/users/anshhhr");
      const data = await responce.json();
      setProfile(data);
    };
    fetchGithub();
  }, []);

  return (
    <div>
      <h1>CodePulse</h1>

      {/* <button onClick={() => setName("Raj Kumar")}>Change Name</button> */}

      <GitHubProfile
        name={profile?.name}
        bio={profile?.bio}
        followers={profile?.followers}
        repos={profile?.public_repos}
      />
    </div>
  );
}
export default App;
