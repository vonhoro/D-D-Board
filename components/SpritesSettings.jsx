import React from "react";
import { SpriteContext } from "../context/SpriteContext";
import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  Icon,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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
    horizontalMultplier: "",
    verticalMultiplier: "",
    context: "settings",
    type: "neutral",
    reference: "",
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

  React.useEffect(() => console.log("updating"), [update]);

  return (
    <Grid
      pos="fixed"
      opacity={0.8}
      bottom={0}
      width="full"
      height="30vh"
      bg="green.500"
      templateColumns="repeat(5,1fr)"
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

        <Flex align="space-around" justify="space-around">
          <FormControl>
            <FormLabel>Rows </FormLabel>
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
                    ? parseInt(sprite.reference.height + 8) / SquareSize
                    : 1
                }
                focusBorderColor="red.200"
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.height + 8) / SquareSize
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
                  }}
                  bg="green.200"
                  _active={{ bg: "green.300" }}
                  children="+"
                />
                <NumberDecrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.height + 8) / SquareSize
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
                    setUpdate(!update);
                  }}
                  bg="pink.200"
                  _active={{ bg: "pink.300" }}
                  children="-"
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Columns </FormLabel>
            <NumberInput
              step={1}
              size="sm"
              width="5vw"
              ml="25%"
              min={1}
              defaultValue={1}
              max={NumberColumns}
            >
              <NumberInputField
                value={
                  spriteInformation.reference
                    ? parseInt(sprite.reference.width + 8) / SquareSize
                    : 1
                }
                focusBorderColor="red.200"
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.width + 8) / SquareSize
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
                    setUpdate(!update);
                  }}
                  bg="green.200"
                  _active={{ bg: "green.300" }}
                  children="+"
                />
                <NumberDecrementStepper
                  onClick={(e) => {
                    let value = spriteInformation.reference
                      ? parseInt(sprite.reference.width + 8) / SquareSize
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
                  }}
                  bg="pink.200"
                  _active={{ bg: "pink.300" }}
                  children="-"
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>
      </Flex>
      <Flex direction="column" justify="center">
        <RadioGroup
          defaultValue="neutral"
          spacing={2}
          onChange={(e) => {
            if (!spriteInformation.reference) return;
            switch (e.target.value) {
              case "neutral":
                spriteInformation.reference.style.backgroundColor =
                  colors.neutral;
                break;
              case "enemy":
                spriteInformation.reference.style.backgroundColor =
                  colors.enemy;
                break;
              default:
                spriteInformation.reference.style.backgroundColor = colors.ally;
            }
          }}
          color="blue.200"
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
