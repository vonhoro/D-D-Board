import React, { useContext, useEffect, useState } from "react";
import { SpriteContext } from "../context/SpriteContext";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Icon,
  IconButton,
  Input,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from "@chakra-ui/core";
import image1 from "../sprites/1.png";
import image2 from "../sprites/2.png";
import image3 from "../sprites/3.png";
import image4 from "../sprites/4.png";
import image5 from "../sprites/5.png";
import image6 from "../sprites/6.png";
import image7 from "../sprites/7.png";
import image8 from "../sprites/8.png";
import image9 from "../sprites/9.png";
import image10 from "../sprites/10.png";
import abnb from "../sprites/abnb.png";
import ApeBasicNeutral from "../sprites/ApeBasicNeutral.png";
import aquenbe from "../sprites/aquenbe.png";
import bbnb from "../sprites/bbnb.png";
import BeeBasiNeutral from "../sprites/BeeBasiNeutral.png";
import GreenD from "../sprites/GreenD.png";
import hbnb from "../sprites/hbnb.png";
import humanBasicNeutral from "../sprites/humanBasicNeutral.png";
import Monogo1 from "../sprites/Monogo1.png";
import monongo2png from "../sprites/monongo2png.png";
import wbnb from "../sprites/wbnb.png";

const imageArray = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  abnb,
  ApeBasicNeutral,
  aquenbe,
  bbnb,
  BeeBasiNeutral,
  GreenD,
  hbnb,
  humanBasicNeutral,
  Monogo1,
  monongo2png,
  wbnb,
];
export const SpritesHandler = ({
  SquareSize,
  NumberColumns,
  NumberRows,
  Show,
  onMouseLeave,
  onMouseOver,
}) => {
  let upload;

  const { setSprite } = useContext(SpriteContext);
  // const [show, setShow] = useState(false);
  const [reRender, setReRender] = useState(true);
  const [sprites, setSprites] = useState([]);
  const [importSprite, setImportSprite] = useState(false);
  const [spriteUploader, setSpriteUploader] = useState(null);
  const [spritesToUpload, setSpritesToUpload] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [spritesFileList, setSpritesFileList] = useState([]);
  useEffect(() => {
    let preparingSprites = [];
    for (const image of imageArray) {
      preparingSprites.push({
        content: image,
        height: SquareSize,
        width: SquareSize,
        verticalMultiplier: 1,
        horizontalMultiplier: 1,
        color: "transparent",
      });
    }
    setSprites(preparingSprites);
  }, [SquareSize]);

  const spriteCliked = (index) => {
    for (const sprite of sprites) {
      sprite.color = "transparent";
    }
    sprites[index].color = "white";
    setSprite({
      content: sprites[index].content,
      horizontalMultiplier: sprites[index].horizontalMultiplier,
      verticalMultiplier: sprites[index].verticalMultiplier,
      context: "map",
      type: "neutral",
      reference: "",
    });
  };

  const modal = (
    <>
      <Box
        bg="black"
        opacity={0.3}
        pos="fixed"
        width="500%"
        height="500%"
        zIndex="1000"
        onMouseOver={onMouseOver}
      />
      <Flex
        onMouseOver={onMouseOver}
        maxH={`${window.screen.height - window.screen.height * 0.25}px`}
        overflowY="scroll"
        align="center"
        pos="fixed"
        top={10}
        left="30vw"
        opacity={1}
        width="35vw"
        minW="560px"
        p="10px"
        bg="gray.500"
        zIndex="1050"
        direction="column"
      >
        <Stack spacing={2}>
          <Icon
            pos="absolute"
            name="close"
            cursor="pointer"
            color="red.500"
            right={4}
            top={4}
            onClick={(e) => {
              setSpritesToUpload([]);

              setUploading(false);
              setSpritesFileList([]);
              setSpriteUploader(null);
            }}
            zIndex={"1051"}
          />
          <Flex wrap="wrap" p="10px" width="490px" justify="center">
            {spritesToUpload.map((sprite, index) => (
              <>
                <Image
                  onClick={(e) => {
                    console.log(spritesFileList);
                    setSpritesToUpload(
                      spritesToUpload.filter((elemnt, i) => i != index)
                    );
                    setSpritesFileList(
                      spritesFileList.filter((elemnt, i) => i != index)
                    );
                  }}
                  key={89 + 1 * index}
                  width="50px"
                  height="50px"
                  bg={sprite.color}
                  m="10px"
                  className="sprite"
                  src={sprite.content}
                  alt="sprite"
                  tabIndex={index}
                  cursor="pointer"
                  color="transparent"
                />
              </>
            ))}
          </Flex>
          <Flex justify="center" style={{ marginBottom: "20px" }}>
            <Stack spacing={2} isInline>
              <Button
                variantColor={"blue"}
                isLoading={uploading}
                bg="blue.500"
                children="Select sprites"
                onClick={(e) => {
                  upload.click();
                }}
              />
              <Button
                children="Upload"
                isLoading={uploading}
                bg="blue.500"
                variantColor="blue"
                onClick={async (e) => {
                  let newSprites = sprites;
                  setUploading(true);
                  for (const sprite of spritesFileList) {
                    const formData = new FormData();

                    formData.append("image", sprite, sprite.name);
                    const answer = await axios.post(
                      "https://api.imgbb.com/1/upload?expiration=86400&key=0f6654c0cbf82ce0c4e080de1c4e7d00",
                      formData
                    );
                    newSprites = [
                      {
                        content: answer.data.data.url,
                        height: SquareSize,
                        width: SquareSize,
                        verticalMultiplier: 1,
                        horizontalMultiplier: 1,
                        color: "transparent",
                      },
                      ...newSprites,
                    ];
                  }
                  setUploading(false);

                  setSprites(newSprites);
                  setSpriteUploader(null);
                  setSpritesToUpload([]);
                }}
              />
              <Button
                children="Cancel"
                bg="blue.500"
                variantColor="blue"
                onClick={(e) => {
                  setSpritesToUpload([]);
                  setSpriteUploader(null);

                  setUploading(false);
                  setSpritesFileList([]);
                }}
              />
            </Stack>
          </Flex>
        </Stack>
      </Flex>
    </>
  );

  return (
    <>
      {spriteUploader && modal}

      <Flex
        direction="column"
        width="8vw"
        jutify="flex-start"
        align="center"
        pos="fixed"
        right={2}
        top={2}
        opacity={0.8}
        p="10px"
        bg="gray.500"
        height="95vh"
        overflow="scroll"
        overflowX="hidden"
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
      >
        <input
          type="file"
          ref={(node) => (upload = node)}
          style={{ display: "none" }}
          multiple
          onChange={(e) => {
            e.persist();

            let newSprites = spritesToUpload;

            for (const sprite of upload.files) {
              newSprites = [
                {
                  content: URL.createObjectURL(sprite),
                  color: "transparent",
                },
                ...newSprites,
              ];
            }
            const newwSprites = Array.from(upload.files);

            setSpritesToUpload(newSprites);
            setSpritesFileList([...spritesFileList, ...newwSprites]);
          }}
        />
        <IconButton
          width="50px"
          height="50px"
          size="lg"
          my={"10px"}
          color="white"
          variantColor="blue"
          aria-label="Add an Sprite"
          icon="add"
          onClick={(e) => {
            setSpriteUploader(true);
          }}
        />
        {sprites.length === 0 ? (
          <></>
        ) : (
          <>
            {" "}
            {sprites.map((sprite, index) => (
              <>
                <Image
                  onClick={(e) => spriteCliked(index)}
                  key={2018 + 1 * index}
                  width="50px"
                  height="50px"
                  bg={sprite.color}
                  my={"10px"}
                  className="sprite"
                  src={sprite.content}
                  alt="sprite"
                  tabIndex={index}
                  cursor="pointer"
                  color="transparent"
                />
              </>
            ))}
          </>
        )}
      </Flex>
    </>
  );
};
