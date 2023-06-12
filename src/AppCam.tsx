import axios from "axios";
import { useState, useEffect } from "react";
import JMuxer from "jmuxer";
import "./AppCam.css";

//axios.defaults.proxy.host = "http://localhost";
//axios.defaults.proxy.port = 8081;

const baseurl = "/test";
const snapurl = "/api/snapimage";

function Button() {
  const [name, setName] = useState("Push");

  const get_req = () => {
    setName("working");
    axios.get(baseurl).then((response) => {
      setName(response["data"]["message"]);
    });
  };

  return <button onClick={get_req}> {name}</button>;
}

const ImageSnap = () => {
  const [base64, setBase64] = useState<string>();

  const get_req = () => {
    axios
      .get(snapurl, {
        responseType: "text",
      })
      .then((response) => {
        console.log(response.data);
        setBase64("data:image/jpeg;base64," + response.data);
      });
  };

  if (base64 === null) {
    return <div></div>;
  } else {
    return (
      <div className="butonimage">
        <button onClick={get_req}> Get</button>
        <img src={base64} width="128" />
      </div>
    );
  }
};

function create_connection() {
  console.log("CREATE CONNECTION");
  const ws = new WebSocket("ws://192.168.0.117:8000/ws/");
  ws.binaryType = "arraybuffer";
  return ws;
}

const CamStream = () => {
  //const [websock, setWebsock] = useState(null);
  const [connected, setConnected] = useState(false);

  console.log("CREATE_CAM_STREAM");
  useEffect(() => {
    console.log("USE EFFECT");
    // console.log(websock);
    // if (!connected) {
    //   console.log("WEBSOCK null");
    //   setConnected(true);
    //   setWebsock(create_connection());
    //   return;
    // }

    // if (connected && websock != null) {
    // const websock = create_connection();
    // console.log("WEBSOCK not null");

    // const jmuxer = new JMuxer({
    //   node: "stream",
    //   mode: "video",
    //   flushingTime: 0,
    //   fps: 30,
    //   debug: false,
    // });
    // console.log("SET ON MESSAGE");
    // websock.onmessage = function (event) {
    //   if (!document.hidden) {
    //     jmuxer.feed({
    //       video: new Uint8Array(event.data),
    //     });
    //   }
    // };
    // }
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
    setConnected(true);
  };

  return (
    <div id="streamStage">
      <button onClick={make_connect}> Connect </button>
      <video
        width="960"
        height="720"
        muted
        id="stream"
        autoPlay
        preload="none"
      ></video>
    </div>
  );
};

function AppCam() {
  return (
    <div className="main-grid">
      <CamStream />
      <div className="button-grid">
        <Button />
        <ImageSnap />
      </div>
      <div className="wrapper">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </div>
    </div>
  );
}

export default AppCam;
