import axios from "axios";
import { useState, useEffect } from "react";
import JMuxer from "jmuxer";
import {
  ExposureModel,
  DRC,
  ExpMode,
  Iso,
  AutoWhiteBalanceModel,
  AWBMode,
  Zoom,
} from "./camera";
import "./AppCam.css";
import Exposure from "./Exposure";
import AutoWhiteBalance from "./AutoWhiteBalance";
import ZoomComponent from "./Zoom";

//axios.defaults.proxy.host = "http://localhost";
//axios.defaults.proxy.port = 8081;
const baseurl2 = "/api/exposure";
const baseurl = "/test";
const snapurl = "/api/snapimage";
const websocket_address = "ws://localhost:8000/ws/";

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
        // console.log(response.data);
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
  const ws = new WebSocket(websocket_address);
  ws.binaryType = "arraybuffer";
  return ws;
}

const CamStream = () => {
  //const [websock, setWebsock] = useState(null);
  const [connection, setConnection] = useState<WebSocket | null>(null);

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
        width="960"
        height="720"
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

const expModel: ExposureModel = {
  iso: Iso.iso000,
  analog_gain: 0.1,
  digital_gain: 0.2,
  exposure_speed: 0.3,
  shutter_speed: 0.4,
  compensation: 0.5,
  mode: ExpMode.auto,
  drc_strength: DRC.low,
};

const awbModel: AutoWhiteBalanceModel = {
  mode: AWBMode.auto,
  r_gain: 0,
  b_gain: 0,
};

const zoomModel: Zoom = {
  x: 0,
  y: 0,
  h: 1,
  w: 1,
};

console.log(expModel);

function AppCam() {
  const [camModel, setCamModel] = useState<ExposureModel>(expModel);
  const [awb, setAWBModel] = useState<AutoWhiteBalanceModel>(awbModel);
  const [zoom, setZoom] = useState<Zoom>(zoomModel);

  function getParameters() {
    axios.get(baseurl2).then((response) => {
      console.log(response["data"]);
      setCamModel(response["data"]);
      // setValues(response["data"]);
    });
  }

  useEffect(() => {
    getParameters();
  }, []);

  return (
    <div className="main-grid">
      <CamStream />
      <div className="button-grid">
        <Exposure exposure={camModel} setModel={setCamModel} />
        <AutoWhiteBalance awb={awb} setModel={setAWBModel} />
        <ZoomComponent zoom={zoom} setModel={setZoom} />
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
