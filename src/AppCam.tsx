import axios from "axios";
import { useState, useEffect } from "react";

import {
  ExposureModel,
  DRC,
  ExpMode,
  Iso,
  AutoWhiteBalanceModel,
  AWBMode,
  Zoom,
} from "./models/camera";
import "./AppCam.css";
import CameraStream from "./components/CameraStream";
import Settings from "./components/Settings";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SnapGallery from "./components/SnapGallery";

import "react-tabs/style/react-tabs.css";

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
  return (
    <div className="main-grid">
      <div className="layer1">
        <Settings></Settings>
      </div>
      <div className="layer2">
        <Tabs>
          <TabList>
            <Tab>Stream</Tab>
            <Tab>Gallery</Tab>
          </TabList>
          <TabPanel>
            <CameraStream />
          </TabPanel>
          <TabPanel>
            <SnapGallery />
          </TabPanel>
        </Tabs>
      </div>
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
