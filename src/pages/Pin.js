import React, { useState } from "react";
import "./Pin.scss";
import { get_places_by_pin } from "indian_places";

export default function Pin() {
  const [pin, setPin] = useState("");
  const [places, setPlaces] = useState([]);

  const search = (pin) => {
    setPlaces(get_places_by_pin(pin));
  };

  const onchange = (value) => {
    if (value === "") {
      setPin("");
      return;
    }
    if (isNaN(parseInt(value))) return;
    if (value.length > 6) return;

    if (value.length === 6) search(parseInt(value));
    else setPlaces([]);
    setPin(value);
  };
  return (
    <div className="main_cont">
      <div className="title">
        plac<span>e</span>s
      </div>
      <input
        onChange={(e) => onchange(e.target.value)}
        name="pincode"
        value={pin}
        type="text"
        accept=""
        placeholder="enter pincode"
      ></input>
      <div className="result">
        {places.map((item, key) => (
          <div key={key} className="card">
            <i className="ri-map-pin-fill"></i>
            <div className="info">
              <div className="place-name">{item.place},</div>
              <div className="state-name">{item.state}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
