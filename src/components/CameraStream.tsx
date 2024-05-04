import { useState, useEffect } from "react";
import JMuxer from "jmuxer";
import "./CameraStream.css";
// const websocket_address = "ws://localhost:8000/ws/";
//

const websocket_address = "ws://192.168.0.117:8000/ws/";

function create_connection() {
  console.log("CREATE CONNECTION");
  const ws = new WebSocket(websocket_address);
  ws.binaryType = "arraybuffer";
  return ws;
}

const CameraStream = () => {
  //const [websock, setWebsock] = useState(null);
  const [connection, setConnection] = useState<WebSocket | null>(null);

  useEffect(() => {
    console.log("USE EFFECT");
  }, []);

  const make_connect = () => {
    const websock = create_connection();
    console.log("WEBSOCK not null");

    const jmuxer = new JMuxer({
      node: "stream",
      mode: "video",
      flushingTime: 0,
      fps: 30,
      debug: false,
    });
    console.log("SET ON MESSAGE");
    websock.onmessage = function (event) {
      if (!document.hidden) {
        jmuxer.feed({
          video: new Uint8Array(event.data),
        });
      }
    };
    setConnection(websock);
  };

  const stop_connection = () => {
    console.log("Stop connection");
    if (connection != null) {
      connection.close();
      setConnection(null);
      console.log("Closed called");
    }
  };

  return (
    <div id="streamStage" className="video-stage">
      <video
        className="video-container"
        // width="960"
        // height="720"
        muted
        id="stream"
        autoPlay
        preload="none"
      ></video>
      <div className="video-control">
        <button onClick={connection == null ? make_connect : stop_connection}>
          {" "}
          {connection == null ? "Connect" : "Disconnect"}{" "}
        </button>
      </div>
    </div>
  );
};

export default CameraStream;
