import React from "react";

export default function Settings() {
  return (
    <div className="card-form">

      <div className="label-st">
        <label htmlFor="emial">Email Notifications</label>
        <div className="switch-btn-container">
            <p>on/off</p>
        <div className="switch-btn" name="email">
            <div className="switch-btn-int"/>
        </div>
        </div>
      </div>

      <div className="label">
      <label htmlFor="browser">Browser Notifications</label>
      <button className="a-r-b" style={{padding: "5px 10px"}}>Activate</button>
      </div>

    </div>
  );
}
