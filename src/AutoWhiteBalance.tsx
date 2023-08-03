import { AWBMode, AutoWhiteBalanceModel } from "./camera";
import axios from "axios";

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
    // don't mind this ugly form :P
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <label htmlFor="awb_mode_field">AWB Mode</label>
        <select
          name="mode"
          id="awb_mode_field"
          value={props.awb.mode}
          placeholder="number"
          onChange={onSelect}
          required
        >
          {Object.keys(AWBMode).map((aw) => (
            <option key={aw} value={aw}>
              {aw}
            </option>
          ))}
        </select>

        <label htmlFor="rgain_field">Red Gain</label>
        <input
          name="r_gain"
          id="rgain_field"
          type="number"
          value={props.awb.r_gain}
          step="any"
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="bgain_field">Blue Gain</label>
        <input
          name="b_gain"
          id="bgain_field"
          type="number"
          value={props.awb.b_gain}
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

export default AutoWhiteBalance;
