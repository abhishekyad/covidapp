import React, { useState } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import data from './customer1.json';

function IndiaMap(){
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [i, seti] = useState("");
  const [j, setj] = useState("");
  const [k, setk] = useState("");


  function onLocationClick(event) {
    setStateCode(event.target.id);
    setStateName(event.target.getAttribute("name"));
    // console.log(event.target);
    console.log("Id", event.target.id);
    console.log("Name",event.target.getAttribute("name"));
    var str=event.target.getAttribute("name");
    console.log(data[str]);
    seti("Active Cases : "+data[str].active);
    setj("Cases Cured : "+data[str].cured);
    setk("Deaths : "+data[str].deaths);
  }

  return (
    <><p> State-wise Count</p>
      <SVGMap map={India} onLocationClick={onLocationClick} />
      <p>{stateName}</p>
      <p>{i}</p>
      <p>{j}</p>
      <p>{k}</p>
    </>
  );
}

export default IndiaMap;
