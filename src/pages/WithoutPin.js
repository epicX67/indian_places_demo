import React, { useEffect, useState } from "react";
import { getStates } from "indian_places";
import Select from "react-select";

const sort = (arr) => {
  return arr.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

export default function WithoutPin() {
  const [states, setStates] = useState(() => {
    return sort(getStates()).map((item) => ({
      value: item,
      label: item.name,
    }));
  });
  const [state, setState] = useState(() => states[0]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);

  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    onStateChange(state);
  }, []);

  const onStateChange = (selectState) => {
    setState(selectState);
    const d = selectState.value.getDistricts();
    setDistricts(
      sort(d).map((item) => {
        return { value: item, label: item.name };
      })
    );
    onDistrictChange({ value: d[0], label: d[0].name });
  };

  const onDistrictChange = (selectDistrict) => {
    setDistrict(selectDistrict);
    const p = selectDistrict.value.getPlaces();
    setPlaces(
      sort(p).map((item) => {
        return { value: item, label: item.name };
      })
    );
    if (p.length === 0) {
      setPlace(null);
    } else {
      setPlace({ value: p[0], label: p[0].name });
    }
  };
  return (
    <div className="main_cont">
      <div className="title">
        plac<span>e</span>s
      </div>
      <Select
        className="myselect"
        value={state}
        onChange={(value) => onStateChange(value)}
        options={states}
        placeholder="Select State"
      />
      <Select
        className="myselect"
        value={district}
        onChange={(value) => onDistrictChange(value)}
        options={districts}
        placeholder="Select Districts"
      />
      <Select
        className="myselect"
        onChange={(e) => setPlace(e)}
        value={place}
        options={places}
        placeholder="Select Places"
      />
      {place && (
        <div className="result">
          <div className="card">
            <i className="ri-map-pin-fill"></i>
            <div className="info">
              <div className="place-name">{place.value.name},</div>
              <div className="state-name">
                {place.value.state} {"(" + place.value.pin + ")"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
