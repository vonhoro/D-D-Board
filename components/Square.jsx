import React from "react";
import { Box } from "@chakra-ui/core";
export const Square = ({
  Height,
  Width,
  Coordinates,
  Color,
  onClick,
  onMouseEnter,
}) => {
  return (
    <Box
      border="white solid 1px"
      color="transparent"
      boxSizing="border-box"
      style={{
        height: Height,
        width: Width,
        gridArea: `${Coordinates[0]} / ${Coordinates[1]}`,
        backgroundColor: Color,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {""}
    </Box>
  );
};
