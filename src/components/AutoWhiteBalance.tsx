import { AWBMode, AutoWhiteBalanceModel } from "../models/camera";
import axios from "axios";

import {
  FormControl,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";

const zoom_put_url = "/api/awb";

function AutoWhiteBalance(props: {
  awb: AutoWhiteBalanceModel;
  setModel: React.Dispatch<AutoWhiteBalanceModel>;
}) {
  async function updateValuesCallback() {
    console.log(props.awb);
    axios.put(zoom_put_url, props.awb).then((response) => {
      console.log(response);
      // setValues(response["data"]);
    });
  }
  // onSubmit
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateValuesCallback();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value: any = event.target.value;
    const name = event.target.name;
    props.setModel({ ...props.awb, [name]: value });
  };

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var value: any = event.target.value;
    const name = event.target.name;

    const new_state = { ...props.awb, [name]: value };

    console.log(new_state);

    props.setModel({
      ...props.awb,
      [name]: value,
    });
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      direction="row"
      spacing={2}
      width={"600px"}
    >
      <Grid item xs={6}>
        <FormControl>
          <InputLabel id="awbmode">AWB Mode</InputLabel>
          <Select
            sx={{ minWidth: 100 }}
            name="AWB Mode"
            id="awbmode"
            label="AWB Mode"
            value={props.awb.mode}
            onChange={(e) => {
              const newModel = { ...props.awb };
              newModel.mode = e.target.value as AWBMode;
              props.setModel(newModel);
            }}
          >
            {Object.keys(AWBMode).map((aw) => (
              <MenuItem key={aw} value={aw}>
                {aw}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            margin="dense"
            id="rgain"
            type="number"
            inputProps={{ step: "any" }}
            label="Red gain"
            variant="outlined"
            value={props.awb.r_gain}
            onChange={(e) => {
              const newModel = { ...props.awb };
              newModel.r_gain = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            margin="dense"
            id="bgain"
            type="number"
            inputProps={{ step: "any" }}
            label="Blue gain"
            variant="outlined"
            value={props.awb.b_gain}
            onChange={(e) => {
              const newModel = { ...props.awb };
              newModel.b_gain = e.target.value as number;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default AutoWhiteBalance;
