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
import CameraStream from "./components/CameraStream";
import Settings from "./components/Settings";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SnapGallery from "./components/SnapGallery";

import CssBaseline from "@mui/material";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  Button,
  CardMedia,
} from "@mui/material";

import "react-tabs/style/react-tabs.css";

//axios.defaults.proxy.host = "http://localhost";
//axios.defaults.proxy.port = 8081;

const baseurl = "/test";
const snapurl = "/api/snapimage";

// function Button() {
//   const [name, setName] = useState("Push");

//   const get_req = () => {
//     setName("working");
//     axios.get(baseurl).then((response) => {
//       setName(response["data"]["message"]);
//     });
//   };

//   return <button onClick={get_req}> {name}</button>;
// }

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
    return <Box></Box>;
  } else {
    return (
      <Box>
        <Button onClick={get_req}> Get</Button>
        <CardMedia component="img" src={base64} width="128" />
      </Box>
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
  const [open, toggleDrawer] = useState(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Microscope
          </Typography>
        </Toolbar>
      </AppBar>
      <CameraStream />
      <ImageSnap />
      <Button onClick={() => toggleDrawer(true)}> Settings </Button>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <Settings />
      </Drawer>
    </Box>
  );
  // return (
  //   <div className="main-grid">
  //     <div className="layer1">
  //       <Settings></Settings>
  //     </div>
  //     <div className="layer2">
  //       <Tabs>
  //         <TabList>
  //           <Tab>Stream</Tab>
  //           <Tab>Gallery</Tab>
  //         </TabList>
  //         <TabPanel>
  //           <CameraStream />
  //         </TabPanel>
  //         <TabPanel>
  //           <SnapGallery />
  //         </TabPanel>
  //       </Tabs>
  //     </div>
  //     <div className="button-grid">
  //       <Button />
  //       <ImageSnap />
  //     </div>
  //     <div className="wrapper">
  //       <div>One</div>
  //       <div>Two</div>
  //       <div>Three</div>
  //     </div>
  //   </div>
  // );
}

export default AppCam;
