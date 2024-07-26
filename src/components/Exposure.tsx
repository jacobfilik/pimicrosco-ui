import { useForm } from "./useForm";
import axios from "axios";
import { DRC, ExpMode, ExposureModel, Iso } from "../models/camera";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  Grid,
} from "@mui/material";

const exposure_put_url = "/api/setexp";

function Exposure(props: {
  exposure: ExposureModel;
  setModel: React.Dispatch<ExposureModel>;
}) {
  // defining the initial state for the form
  // var initialState = props.exposure;

  // getting the event handlers from our custom hook
  const { onChange, onSelect, onSubmit } = useForm(
    updateValuesCallback,
    props.setModel,
    props.exposure
  );

  // function getParameters() {
  //   axios.get(baseurl).then((response) => {
  //     console.log(response["data"]);
  //     // setValues(response["data"]);
  //   });
  // }

  // useEffect(() => {
  //   getParameters();
  // });
  // a submit function that will execute upon form submission
  async function updateValuesCallback() {
    console.log(props.exposure);
    axios.put(exposure_put_url, props.exposure).then((response) => {
      console.log(response);
      props.setModel(response["data"]);
      // setValues(response["data"]);
    });
  }

  // analog_gain: number;
  // digital_gain: number;
  // exposure_speed: number;
  // shutter_speed: number;
  // compensation: number;
  return (
    <Grid
      container
      justifyContent="flex-start"
      direction="row"
      width={"600px"}
      spacing={2}
      columns={2}
    >
      <Grid item xs={1}>
        <FormControl>
          <InputLabel id="iso">Iso</InputLabel>
          <Select
            sx={{ minWidth: 100 }}
            name="Iso"
            id="iso"
            label="Iso"
            value={props.exposure.iso}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.iso = e.target.value;
              props.setModel(newModel);
            }}
          >
            {Object.keys(Iso)
              .filter((iso) => parseInt(iso) >= 0)
              .map((iso) => (
                <MenuItem key={iso} value={iso}>
                  {iso}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <InputLabel id="expmode">Exposure Mode</InputLabel>
          <Select
            sx={{ minWidth: 100 }}
            name="Exposure Mode"
            id="expmode"
            label="Exposure Mode"
            value={props.exposure.mode}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.mode = e.target.value;
              props.setModel(newModel);
            }}
          >
            {Object.keys(ExpMode).map((ex) => (
              <MenuItem key={ex} value={ex}>
                {ex}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <InputLabel id="drc">DRC Strength</InputLabel>
          <Select
            sx={{ minWidth: 100 }}
            name="DRC Strength"
            id="drc"
            label="DRC Strength"
            value={props.exposure.drc_strength}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.drc_strength = e.target.value;
              props.setModel(newModel);
            }}
          >
            {Object.keys(DRC).map((ex) => (
              <MenuItem key={ex} value={ex}>
                {ex}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <TextField
            margin="dense"
            id="again"
            type="number"
            inputProps={{ step: "any" }}
            label="Analog Gain"
            variant="outlined"
            value={props.exposure.analog_gain}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.analog_gain = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <TextField
            margin="dense"
            id="again"
            type="number"
            inputProps={{ step: "any" }}
            label="Digital Gain"
            variant="outlined"
            value={props.exposure.digital_gain}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.digital_gain = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <TextField
            margin="dense"
            id="espeed"
            type="number"
            inputProps={{ step: "any" }}
            label="Exposure Speed"
            variant="outlined"
            value={props.exposure.exposure_speed}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.exposure_speed = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <TextField
            margin="dense"
            id="sspeed"
            type="number"
            inputProps={{ step: "any" }}
            label="Shutter Speed"
            variant="outlined"
            value={props.exposure.shutter_speed}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.shutter_speed = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl>
          <TextField
            margin="dense"
            id="comp"
            type="number"
            inputProps={{ step: "any" }}
            label="Compensation"
            variant="outlined"
            value={props.exposure.compensation}
            onChange={(e) => {
              const newModel = { ...props.exposure };
              newModel.compensation = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Exposure;
