import { useState } from "react";

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
  const [name, setName] = useState("Ansh Rahangdale");

  return (
    <div>
      <h1>CodePulse</h1>

      <button onClick={() => setName("Raj Kumar")}>Change Name</button>
      <GitHubProfile
        name={name}
        bio="Full Stack Developer"
        followers={23}
        repos={12}
      />
    </div>
  );
}
export default App;
