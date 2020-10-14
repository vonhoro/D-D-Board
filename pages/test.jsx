import React from "react";
import axios from "axios";
import { Button } from "@chakra-ui/core";
export default function Test() {
  /* axios.post  */
  const [picture, setPicture] = React.useState("boba");
  const [reRender, setReRender] = React.useState(false);
  const [mapPrev, setMapPrev] = React.useState("");
  let upload;
  return (
    <>
        <form
        onSubmit={async (e) => {
          e.preventDefault();
          let formData = new FormData();
          formData.append("image", upload.files[0], upload.files[0].name);
          const answer = await axios.post(
            "https://api.imgbb.com/1/upload?expiration=60&key=0f6654c0cbf82ce0c4e080de1c4e7d00",
            formData
          );
          console.log(answer);
          setPicture(answer.data.data.url);
        }}
      >
        <input
          ref={(node) => (upload = node)}
          type="file"
          onChange={(e) => {
 
          }}
        />
        <button
          type="submit"
          children="enviar"
          style={{ backgroundColor: "white" }}
        />
      </form>
      {/*
      <input
        type="file"
        ref={(node) => (upload = node)}
        style={{ display: "none" }}
        onChange={(e) => {
          e.persist();
          console.log("fsdaxfgwfb");
          const FilePrev = URL.createObjectURL(upload.files[0]);
          setMapPrev(FilePrev);
        }}
      />
      <Button
        variant="ghost"
        bg="green.200"
        variantColor="green.500"
        children={"Upload map background"}
        onClick={(e) => upload.click()}
      />
      <img src={mapPrev} alt="babum" /> */
}
    </>
  );
}
