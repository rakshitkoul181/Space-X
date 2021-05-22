import React, { useEffect, useState } from "react";

export default function RocketsCard({ rocket, filterYear, launch, landing }) {
  const [year, setYear] = useState();
  const [loading, setLoading] = useState(true);
  const [successLaunch, setSuccessLaunch] = useState();
  const [successLanding, setSuccessLanding] = useState();
  const [loadYear, setLoadYear] = useState(false);
  const [loadLaunch, setLoadLaunch] = useState(false);
  const [loadLanding, setLoadLanding] = useState(false);

  useEffect(() => {
    const launchYear = rocket.date_utc;
    const res = launchYear.substring(0, 4);
    setYear(res);

    if (filterYear) {
      setLoadYear(true);
      setLoading(false);
      setLoadLaunch(false);
    }
  }, [rocket, filterYear]);

  useEffect(() => {
    setLoadLaunch(true);
    const successfulLaunch = rocket.success ? "True" : "False";
    setSuccessLaunch(successfulLaunch);

    if (launch) {
      setLoading(false);
      setLoadYear(false);
      setLoadLanding(false);
    }
  }, [rocket, launch]);

  useEffect(() => {
    setLoadLanding(true);
    const successfulLanding = rocket.cores[0].landing_success
      ? "True"
      : "False";
    setSuccessLanding(successfulLanding);

    if (landing) {
      setLoading(false);
      setLoadYear(false);
      setLoadLaunch(false);
    }
  }, [rocket, landing]);

  return (
    <>
      {loading ||
      (loadYear && filterYear === year) ||
      (loadLaunch && launch === successLaunch) ||
      (loadLanding && landing === successLanding) ? (
        <div className="rocket">
          <div className="rocket-image">
            <img src={rocket.links.patch.large} alt="" />
          </div>
          <div className="rocket-name">
            {rocket.name} <span>#{rocket.flight_number}</span>
          </div>
          <div className="rocket-mission-id">
            Mission Ids:{" "}
            <ul>
              <li>no missions</li>
            </ul>
          </div>
          <div className="rocket-launch-year">
            Launch Year: <span>{year}</span>
          </div>
          <div className="rocket-successful-launch">
            Successful Launch: <span>{successLaunch}</span>
          </div>
          <div className="rocket-successful-landing">
            Successful Landing: <span>{successLanding}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
