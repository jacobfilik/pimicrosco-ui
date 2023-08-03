import { Zoom } from "./camera";
import axios from "axios";

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
    // don't mind this ugly form :P
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <label htmlFor="x_field">X</label>
        <input
          name="x"
          id="x_field"
          type="number"
          value={props.zoom.x}
          step="any"
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="y_field">Y</label>
        <input
          name="y"
          id="y_field"
          type="number"
          value={props.zoom.y}
          step="any"
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="height_field">Height</label>
        <input
          name="h"
          id="h_field"
          type="number"
          value={props.zoom.h}
          step="any"
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="w_field">Width</label>
        <input
          name="w"
          id="w_field"
          type="number"
          value={props.zoom.w}
          step="any"
          placeholder="number"
          onChange={onChange}
          required
        />

        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default ZoomComponent;
