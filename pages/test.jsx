import React from "react";
import axios from "axios";
import { Button } from "@chakra-ui/core";

export default function Test() {
  /* axios.post  */

  const [picture, setPicture] = React.useState("boba");
  const [reRender, setReRender] = React.useState(false);
  const [mapPrev, setMapPrev] = React.useState("");

  const [listClicked, setListClick] = React.useState("settings");
  let upload;

  let showElement;
  switch (listClicked) {
    case "usuario":
      showElement = (
        <div>
          <h1>usuario</h1>
          <h1>sam</h1>
        </div>
      );

      break;
    case "settings":
      showElement = (
        <div>
          <h1>settings</h1>
          <h1>sam</h1>
        </div>
      );
      break;
    case "security":
      showElement = (
        <div>
          <h1>security</h1>
          <h1>sam</h1>
        </div>
      );
      break;
    case "shop":
      showElement = (
        <div>
          <h1>shop</h1>
          <h1>sam</h1>
        </div>
      );
      break;
    default:
      showElement = (
        <div>
          <h1>default</h1>
          <h1>sam</h1>
        </div>
      );
  }

  return (
    <>
      <list>
        <ul
          onClick={(e) => {
            console.log("a");
            setListClick("settings");
          }}
        >
          a
        </ul>
        <ul
          onClick={(e) => {
            setListClick("usuario");
          }}
        >
          a
        </ul>
        <ul
          onClick={(e) => {
            setListClick("shop");
          }}
        >
          a
        </ul>
        <ul
          onClick={(e) => {
            setListClick("security");
          }}
        >
          a
        </ul>
        <ul
          onClick={(e) => {
            setListClick("banannero");
          }}
        >
          a
        </ul>
      </list>
      {showElement}
    </>
  );
}
