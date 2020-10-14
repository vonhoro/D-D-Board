import React from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/core";
export const BoardSettings = () => {
  return (
    <Flex direction="column" align="center" bg="red.200">
      <Button
        variantColor="blue"
        bg="orange.200"
        onClick={(e) => setShowOptions(!showOptions)}
      >
        {showOptions ? "Hide Options" : "Show Options"}
      </Button>
      <Flex direction="column" width="50%" align="center">
        <h1>Adjust the size of each square</h1>

        <Slider
          bg="blue.100"
          defaultValue={40}
          min={10}
          max={100}
          step={10}
          onChange={(value) => setSquareSize(value)}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        {showOptions && (
          <h1>Adjust the size of the board based on number of squares</h1>
        )}
        {showOptions && (
          <Flex justify="space-around" width="100%">
            <FormControl justifyContent="center">
              <FormLabel htmlFor="number"> Number of Columns</FormLabel>
              <Input
                width="3.5em"
                borderColor="blue.500"
                type="number"
                defaultValue="10"
                min="1"
                onChange={(e) => setNumberColums(e.target.valueAsNumber)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="number"> Number of Rows</FormLabel>
              <Input
                width="3.5em"
                borderColor="blue.50"
                type="number"
                defaultValue="10"
                min="1"
                onChange={(e) => setNumberRows(e.target.valueAsNumber)}
              />
            </FormControl>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
