import axios from "axios";
import React, { useEffect, useState } from "react";

import "../css/SpaceX.css";
import RocketsCard from "./RocketsCard";
import { successLanding, successLaunch, year } from "../data/data";

export default function SpaceX() {
  const [rockets, setRockets] = useState([]);
  const [launchYear, setLaunchYear] = useState(year);
  const [launchSuccess, setLaunchSuccess] = useState(successLaunch);
  const [landingSuccess, setLandingSuccess] = useState(successLanding);
  const [filterYear, setFilterYear] = useState();
  const [landing, setLanding] = useState();
  const [launch, setLaunch] = useState();

  useEffect(() => {
    axios
      .get("https://api.spaceXdata.com/v4/launches?limit=100")
      .then((res) => {
        setRockets(res.data);
      });
  }, []);

  const handleFilterYear = (year) => {
    setFilterYear(year);
  };

  const handleLaunch = (success) => {
    setLaunch(success);
  };

  const handleLanding = (success) => {
    setLanding(success);
  };

  return (
    <div className="container">
      <div className="filter">
        <h2>Filters</h2>
        <div className="filter-content">
          <div className="launch-year">
            <p>Launch Year</p>
            <hr />
            <div className="filter-year">
              {launchYear.map((year) => (
                <div key={year.id} className="year-btn">
                  <button
                    onClick={() => handleFilterYear(year.year)}
                    className="filter-btn"
                  >
                    {year.year}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="successful-launch">
            <p>Successful Launch</p>
            <hr />
            <div className="filter-year">
              {launchSuccess.map((success) => (
                <div key={success.id} className="success-btn">
                  <button onClick={() => handleLaunch(success.success)} className="filter-btn">{success.success}</button>
                </div>
              ))}
            </div>
          </div>

          <div className="successful-landing">
            <p>Successful Landing</p>
            <hr />
            <div className="filter-year">
              {landingSuccess.map((success) => (
                <div key={success.id} className="success-btn">
                  <button onClick={() => handleLanding(success.success)} className="filter-btn">{success.success}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rockets">
        {rockets.map((rocket) => {
          return (
            <RocketsCard
              filterYear={filterYear}
              launch={launch}
              landing={landing}
              rocket={rocket}
              key={rocket.id}
            />
          );
        })}
      </div>
    </div>
  );
}
