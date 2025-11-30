import React, { useState } from "react";
import LiveRoom from "./LiveRoom";

export default function App() {
  const [liveID, setLiveID] = useState("");
  const [userID, setUserID] = useState("");
  const [start, setStart] = useState(false);

  if (start)
    return (
      <LiveRoom
        liveID={liveID}
        userID={userID}
        userName={`User-${userID}`}
      />
    );

  return (
    <div style={{ padding: 40 }}>
      <h1>Kinsluv Live</h1>
      <input
        placeholder="Live ID"
        value={liveID}
        onChange={(e) => setLiveID(e.target.value)}
      />
      <br />
      <input
        placeholder="User ID"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
      />
      <br />
      <button onClick={() => setStart(true)}>Join Live</button>
    </div>
  );
}
