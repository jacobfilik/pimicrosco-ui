import { useState, useEffect } from "react";
import JMuxer from "jmuxer";

import { Box, CardMedia, Button } from "@mui/material";
// import "./CameraStream.css";
const websocket_address = "ws://localhost:8000/ws/";
//

// const websocket_address = "ws://192.168.0.117:8000/ws/";

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
      console.log("MESSAGE");
      console.log(event.data);

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
    <Box>
      <CardMedia
        component="video"
        id="stream"
        autoPlay
        preload="none"
        muted
        // width="960"
        height="720"
        sx={{ objectFit: "contain" }}
      ></CardMedia>
      <Box position="absolute" right="0px">
        <Button onClick={connection == null ? make_connect : stop_connection}>
          {connection == null ? "Connect" : "Disconnect"}{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default CameraStream;
