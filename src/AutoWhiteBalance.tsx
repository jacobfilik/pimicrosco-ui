import { AWBMode, AutoWhiteBalanceModel } from "./camera";

function AutoWhiteBalance(props: {
  awb: AutoWhiteBalanceModel;
  setModel: React.Dispatch<AutoWhiteBalanceModel>;
}) {
  const onChange = () => {};
  const onSubmit = () => {};
  const onSelect = () => {};
  return (
    // don't mind this ugly form :P
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <label htmlFor="awb_mode_field">AWB Mode</label>
        <select
          name="iso"
          id="iso_field"
          value={props.awb.mode}
          placeholder="number"
          onChange={onSelect}
          required
        >
          {Object.keys(AWBMode)
            .filter((aw) => parseInt(aw) >= 0)
            .map((aw) => (
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
