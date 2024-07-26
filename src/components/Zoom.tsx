import { Zoom } from "../models/camera";
import axios from "axios";

import { Grid, FormControl, TextField } from "@mui/material";

const zoom_put_url = "/api/zoom";

function ZoomComponent(props: { zoom: Zoom; setModel: React.Dispatch<Zoom> }) {
  async function updateValuesCallback() {
    console.log(props.zoom);
    axios.put(zoom_put_url, props.zoom).then((response) => {
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
    props.setModel({ ...props.zoom, [name]: value });
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
          <TextField
            margin="dense"
            id="xfield"
            type="number"
            inputProps={{ step: "any" }}
            label="X"
            variant="outlined"
            value={props.zoom.x}
            onChange={(e) => {
              const newModel = { ...props.zoom };
              newModel.x = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            margin="dense"
            id="yfield"
            type="number"
            inputProps={{ step: "any" }}
            label="Y"
            variant="outlined"
            value={props.zoom.y}
            onChange={(e) => {
              const newModel = { ...props.zoom };
              newModel.y = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            margin="dense"
            id="hfield"
            type="number"
            inputProps={{ step: "any" }}
            label="Height"
            variant="outlined"
            value={props.zoom.h}
            onChange={(e) => {
              const newModel = { ...props.zoom };
              newModel.h = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            margin="dense"
            id="wfield"
            type="number"
            inputProps={{ step: "any" }}
            label="Width"
            variant="outlined"
            value={props.zoom.w}
            onChange={(e) => {
              const newModel = { ...props.zoom };
              newModel.w = e.target.value;
              props.setModel(newModel);
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default ZoomComponent;
