import { useState, useEffect } from "react";
import axios from "axios";

import Exposure from "./Exposure";
import AutoWhiteBalance from "./AutoWhiteBalance";
import ZoomComponent from "./Zoom";

import { Divider, Stack } from "@mui/material";

import {
  ExposureModel,
  DRC,
  ExpMode,
  Iso,
  AutoWhiteBalanceModel,
  AWBMode,
  Zoom,
} from "../models/camera";

const baseurl2 = "/api/exposure";

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

const Settings = () => {
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
    <Stack spacing={1}>
      <Divider textAlign="left">Exposure</Divider>
      <Exposure exposure={camModel} setModel={setCamModel} />
      <Divider textAlign="left">White Balance</Divider>
      <AutoWhiteBalance awb={awb} setModel={setAWBModel} />
      <Divider textAlign="left">Zoom</Divider>
      <ZoomComponent zoom={zoom} setModel={setZoom} />
    </Stack>
  );
};

export default Settings;
