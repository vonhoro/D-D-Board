import React from "react";
import { SpriteContext } from "../context/SpriteContext";
import io from "socket.io-client";
const socket = io("https://rocky-hamlet-30601.herokuapp.com/");
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/core";

const colors = {
  ally: "#137CBD",
  neutral: "#30404d",
  enemy: "#DB3737",
  boardDefault: "transparent",
  spritePlace: "#0F9960",
  spriteFocus: "#A7B6C2",
  direction: "#CED9E0",
};

export const SpritesSettings = ({ NumberColumns, NumberRows, SquareSize }) => {
  const { sprite, setSprite } = React.useContext(SpriteContext);

  const [update, setUpdate] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState(null);
  const [defaultValue, setDefaultValue] = React.useState(1);
  const [spriteInformation, setSpriteInformation] = React.useState({
    content: "",
    context: "settings",
    reference: "",
    spriteRefIndex: "",
  });

  React.useEffect(() => {
    if (sprite.context !== "settings") return;
    setSpriteInformation(sprite);
    console.log(SquareSize);
    const spriteWidth = sprite.reference.style.width;
    // parseInt(sprite.reference.width.replace("px", "")) / SquareSize;
    // const spriteHeight = sprite.reference.height / SquareSize;
    // parseInt(sprite.reference.height.replace("px", "")) / SquareSize;
    console.log(spriteWidth);
    console.log(sprite.reference);
  }, [sprite]);

  return (
    <Grid
      pos="fixed"
      opacity={0.9}
      bottom={0}
      width="30vw"
      height="30vh"
      bg="gray.500"
      p="1rem"
      templateColumns="20vw 10vw"
      zIndex={1999}
    >
      <Flex direction="column" align="center" width="full">
        <Image
          src={spriteInformation.content}
          width="100px"
          height="100px"
          onClick={(e) => {
            console.log(spriteInformation.reference);
            spriteInformation.reference.style.backgroundColor = "red";
          }}
        />

        <Flex justify="space-evenly" align="center" width="full">
          <Flex textAlign="center" direction="column" justify="center">
            <Text>Columns </Text>
            <NumberInput
              step={1}
              size="sm"
              width="5vw"
              min={1}
              defaultValue={1}
              max={NumberColumns}
            >
              <NumberInputField
                value={
                  spriteInformation.reference
                    ? parseInt(sprite.reference.width) / SquareSize
                    : 1
                }
                focusBorderColor="red.200"
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.width) / SquareSize
                      : 1;
                    value += 1;
                    if (
                      value < 1 ||
                      value > NumberColumns ||
                      !spriteInformation.reference
                    )
                      return;
                    spriteInformation.reference.style.width = `${
                      value * SquareSize
                    }px`;

                    socket.emit("Sprite change", {
                      Width: value * SquareSize,
                      Height: sprite.reference.height,
                      bgColor: sprite.reference.style.backgroundColor,
                      spriteRefIndex: sprite.spriteRefIndex,
                    });

                    setUpdate(!update);
                  }}
                  bg="green.200"
                  _active={{ bg: "green.300" }}
                  children="+"
                />
                <NumberDecrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.width) / SquareSize
                      : 1;
                    value -= 1;
                    if (
                      value < 1 ||
                      value > NumberColumns ||
                      !spriteInformation.reference
                    )
                      return;
                    spriteInformation.reference.style.width = `${
                      value * SquareSize
                    }px`;
                    setUpdate(!update);
                    socket.emit("Sprite change", {
                      Width: value * SquareSize,
                      Height: sprite.reference.height,
                      bgColor: sprite.reference.style.backgroundColor,
                      spriteRefIndex: sprite.spriteRefIndex,
                    });
                  }}
                  bg="pink.200"
                  _active={{ bg: "pink.300" }}
                  children="-"
                />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex textAlign="center" direction="column" justify="center">
            <Text>Rows </Text>
            <NumberInput
              step={1}
              size="sm"
              width="5vw"
              defaultValue={1}
              min={1}
              max={NumberRows}
            >
              <NumberInputField
                value={
                  spriteInformation.reference
                    ? parseInt(sprite.reference.height) / SquareSize
                    : 1
                }
                focusBorderColor="red.200"
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.height) / SquareSize
                      : 1;
                    value += 1;
                    if (
                      value < 1 ||
                      value > NumberRows ||
                      !spriteInformation.reference
                    )
                      return;
                    spriteInformation.reference.style.height = `${
                      value * SquareSize
                    }px`;
                    setUpdate(!update);
                    socket.emit("Sprite change", {
                      Width: sprite.reference.width,
                      Height: value * SquareSize,
                      bgColor: sprite.reference.style.backgroundColor,
                      spriteRefIndex: sprite.spriteRefIndex,
                    });
                  }}
                  bg="green.200"
                  _active={{ bg: "green.300" }}
                  children="+"
                />
                <NumberDecrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.height) / SquareSize
                      : 1;
                    value -= 1;
                    if (
                      value < 1 ||
                      value > NumberRows ||
                      !spriteInformation.reference
                    )
                      return;
                    spriteInformation.reference.style.height = `${
                      value * SquareSize
                    }px`;
                    socket.emit("Sprite change", {
                      Width: sprite.reference.width,
                      Height: value * SquareSize,
                      bgColor: sprite.reference.style.backgroundColor,
                      spriteRefIndex: sprite.spriteRefIndex,
                    });
                    setUpdate(!update);
                  }}
                  bg="pink.200"
                  _active={{ bg: "pink.300" }}
                  children="-"
                />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" justify="center">
        <Text>Type </Text>
        <RadioGroup
          defaultValue="neutral"
          spacing={2}
          onChange={(e) => {
            if (!spriteInformation.reference) return;
            switch (e.target.value) {
              case "neutral":
                spriteInformation.reference.style.backgroundColor =
                  colors.neutral;

                socket.emit("Sprite change", {
                  Width: sprite.reference.width,
                  Height: sprite.reference.height,
                  bgColor: colors.neutral,
                  spriteRefIndex: sprite.spriteRefIndex,
                });

                break;
              case "enemy":
                spriteInformation.reference.style.backgroundColor =
                  colors.enemy;
                socket.emit("Sprite change", {
                  Width: sprite.reference.width,
                  Height: sprite.reference.height,
                  bgColor: colors.enemy,
                  spriteRefIndex: sprite.spriteRefIndex,
                });

                break;
              default:
                spriteInformation.reference.style.backgroundColor = colors.ally;
                socket.emit("Sprite change", {
                  Width: sprite.reference.width,
                  Height: sprite.reference.height,
                  bgColor: colors.ally,
                  spriteRefIndex: sprite.spriteRefIndex,
                });
            }
          }}
          color="blue.700"
          variantColor="blue"
        >
          <Radio value="neutral"> Neutral</Radio>
          <Radio value="enemy"> Enemy </Radio>
          <Radio value="ally"> Ally </Radio>
        </RadioGroup>
      </Flex>
    </Grid>
  );
};
