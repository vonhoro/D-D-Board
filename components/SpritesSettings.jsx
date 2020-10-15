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
export const SpritesSettings = ({ NumberColumns, NumberRows, SquareSize }) => {
  const { sprite, setSprite } = React.useContext(SpriteContext);
  const [sizesValues, setSizesValues] = React.useState({ columns: 1, rows: 1 });
  const [radioValue, setRadioValue] = React.useState(null);
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
    const spriteWidth =
      parseInt(sprite.reference.style.width.replace("px", "")) / SquareSize;
    const spriteHeigth =
      parseInt(sprite.reference.style.height.replace("px", "")) / SquareSize;

    setSizesValues({ columns: spriteWidth, rows: spriteHeigth });
    console.log(sprite);
  }, [sprite]);

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
              value={sizesValues.rows}
              onChange={(value) => {
                if (
                  value < 1 ||
                  value > NumberRows ||
                  !spriteInformation.reference
                )
                  return;
                spriteInformation.reference.style.height = `${
                  value * SquareSize
                }px`;
                setSizesValues({ ...sizesValues, rows: value });
              }}
            >
              <NumberInputField focusBorderColor="red.200" />
              <NumberInputStepper>
                <NumberIncrementStepper
                  bg="green.200"
                  _active={{ bg: "green.300" }}
                  children="+"
                />
                <NumberDecrementStepper
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
              max={NumberColumns}
              onChange={(value) => {
                if (
                  value < 1 ||
                  value > NumberColumns ||
                  !spriteInformation.reference
                )
                  return;

                spriteInformation.reference.style.width = `${
                  value * SquareSize
                }px`;
                setSizesValues({ ...sizesValues, columns: value });
              }}
            >
              <NumberInputField
                value={sizesValues.columns}
                focusBorderColor="red.200"
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  bg="green.200"
                  _active={{ bg: "green.300" }}
                  children="+"
                />
                <NumberDecrementStepper
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
                spriteInformation.reference.style.backgroundColor = "gray";
                break;
              case "enemy":
                spriteInformation.reference.style.backgroundColor = "red";
                break;
              default:
                spriteInformation.reference.style.backgroundColor = "blue";
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
