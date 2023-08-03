import { useForm } from "./useForm";
import axios from "axios";
import { DRC, ExpMode, ExposureModel, Iso } from "./camera";
import "./Exposure.css";

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
    // don't mind this ugly form :P
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <label htmlFor="iso_field">Iso</label>
        <select
          name="iso"
          id="iso_field"
          value={props.exposure.iso}
          placeholder="number"
          onChange={onSelect}
          required
        >
          {Object.keys(Iso)
            .filter((iso) => parseInt(iso) >= 0)
            .map((iso) => (
              <option key={iso} value={iso}>
                {iso}
              </option>
            ))}
        </select>
        <label htmlFor="exmode_field">Exposure Mode</label>
        <select
          name="mode"
          id="exmode_field"
          value={props.exposure.mode}
          placeholder="text"
          onChange={onSelect}
          required
        >
          {Object.keys(ExpMode).map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        <label htmlFor="drc_field">DRC Strength</label>
        <select
          name="drc_strength"
          id="drc_field"
          value={props.exposure.drc_strength}
          placeholder="text"
          onChange={onSelect}
          required
        >
          {Object.keys(DRC).map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        <label htmlFor="again_field">Analog Gain</label>
        <input
          name="analog_gain"
          id="again_field"
          type="number"
          value={props.exposure.analog_gain}
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="dgain_field">Digital Gain</label>
        <input
          name="digital_gain"
          id="dgain_field"
          type="number"
          value={props.exposure.digital_gain}
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="espeed_field">Exposure Speed</label>
        <input
          disabled
          name="exposure_speed"
          id="espeed_field"
          type="number"
          value={props.exposure.exposure_speed}
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="sspeed_field">Shutter Speed</label>
        <input
          name="shutter_speed"
          id="espeed_field"
          type="number"
          value={props.exposure.shutter_speed}
          placeholder="number"
          onChange={onChange}
          required
        />

        <label htmlFor="compensation_field">Compensation</label>
        <input
          disabled
          name="compensation"
          id="compensation_field"
          type="number"
          value={props.exposure.compensation}
          placeholder="number"
          onChange={onChange}
          required
        />
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default Exposure;
