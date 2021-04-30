import React from "react";
import './cards.css';

const abrMonths = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function Add() {

  return (
   
      <form className="card-form">

        <div className="grup">
          <div className="label">
            <label htmlFor="event">Event</label>
            <select name="event" required>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </div>

          <div className="label">
            <label htmlFor="type">Type</label>
            <input type="text" name="type" />
          </div>

        </div>

        <div className="grup">
            <div className="label">
              <label htmlFor="day">Day</label>
              <input className="day" type="number" name="day" min="1" max="31" step="1"  required/>
            </div>
            <div className="label">
              <label htmlFor="month">Month</label>
              <select name="month" required>
                {abrMonths.map((m, i) => {
                  return (
                    <option key={i} value={m.toLowerCase()}>
                      {m}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="label">
              <label htmlFor="year">Year</label>
              <input className="year" type="number"name="year" placeholder="any" pattern="[0-9]{4}"/>
            </div>
        </div>

        <div className="label">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" required/>
        </div>

        <div className="grup">
            <div className="grup">
            <label htmlFor="time-before">Add Reminders</label>
            <select name="time-before">
                <option value="same-day">The Same Day</option>
                <option value="days-before">Days Before</option>
                <option value="weeks-before">Weeks Before</option>
                <option value="months-before">Months Before</option>
            </select>
            <input className="a-r-n" type="number" name="num-before" min="1" step="1" />
            <button className="a-r-b">Add</button>
            </div>
            <ul className="reminders">
                <li>The Same Day <img src="img/drop.svg" alt="drop"></img> </li>
                <li>1 Months Before <img src="img/drop.svg" alt="drop"></img> </li>
                <li>3 Days Before <img src="img/drop.svg" alt="drop"></img> </li>
                <li>1 Weeks Before <img src="img/drop.svg" alt="drop"></img> </li> 
            </ul>
        </div>
                <div className="card-form-submit">
                    <button type="submit">Add Event</button>
                </div>
      </form>
  );
}
