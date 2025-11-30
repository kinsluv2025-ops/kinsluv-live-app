import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
/**
 * NOTE: This uses Zego prebuilt kit naming as placeholder.
 * Follow ZEGOCLOUD docs to adapt exact API calls for the package you install.
 */
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function LiveRoom({ liveID, userID, userName }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/token`,
        { userID, liveID }
      );
      const { appID, token } = res.data;

      // The real SDK likely wants an AppID + token or a kitToken. Check docs.
      // Below pseudocode shows creating an instance and joining.
      const kitToken = token; // placeholder

      const instance = ZegoUIKitPrebuilt.create(kitToken);
      instance.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming
        },
        sharedLinks: [{
          name: "Join Live",
          url: window.location.href
        }]
      });

      setLoading(false);
    }
    init();

    return () => {
      // cleanup; leave room if SDK exposes such method
      try { ZegoUIKitPrebuilt.destroy(); } catch(e){}
    };
  }, [liveID, userID, userName]);

  if (loading) return <div>Loading live room...</div>;
  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
