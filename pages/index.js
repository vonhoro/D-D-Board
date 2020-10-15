import Head from "next/head";
import React from "react";
import axios from "axios";
import { SpritesHandler } from "../components/SpritesHandler";
import { Board } from "../components/Board";
import { BoardSettings } from "../components/BoardSettings";
import { SpritesSettings } from "../components/SpritesSettings";
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  Text,
} from "@chakra-ui/core";
export default function Home() {
  const [sprite, setSprite] = React.useState({
    content: "",
    horizontalMultiplier: 1,
    verticalMultiplier: 1,
    preview: true,
    type: "neutral",
  });
  let spriteHandlerTimeout;
  let upload;
  const [numberRows, setNumberRows] = React.useState(10);
  const [numberColumns, setNumberColums] = React.useState(10);
  const [showOptions, setShowOptions] = React.useState(true);
  const [squareSize, setSquareSize] = React.useState(40);
  const [showBoardOptions, setShowBoardOptions] = React.useState(null);
  const [showSpriteSelection, setShowSpriteSelection] = React.useState(null);
  const [mapPrev, setMapPrev] = React.useState(null);
  const [mapUploadModal, setMapUploadModal] = React.useState(null);
  const [mapPicture, setMapPicture] = React.useState(null);
  const [uploading, setUploading] = React.useState(null);
  // Board options component

  const boardOptions = (
    <Flex
      flexDirection="column"
      width="60vw"
      pos="fixed"
      zIndex={50}
      opacity={0.6}
      top="0"
      align="center"
      bg="gray.500"
      rounded="1em"
      p={4}
      onMouseLeave={(e) => {
        setShowBoardOptions(false);
      }}
    >
      <Text as="em" color="white" mb="1vh">
        Adjust the size of each square
      </Text>

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
      <Text as="em" color="white" mt="1vh">
        Adjust the size of the board based on number of squares
      </Text>

      <Flex justify="space-around" width="100%">
        <Flex direction="column" align="center">
          <FormControl>
            <FormLabel htmlFor="number"> Number of Columns</FormLabel>
            <NumberInput
              name="number"
              size="sm"
              width="5vw"
              ml="25%"
              defaultValue={numberColumns}
              min={10}
              onChange={(value) => setNumberColums(value)}
              max={100}
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
        </Flex>

        <Button
          mt="3.5vh"
          variant="ghost"
          bg="green.200"
          variantColor="green"
          children={"Upload map background"}
          onClick={(e) => setMapUploadModal(true)}
        />

        <FormControl>
          <FormLabel htmlFor="number"> Number of Rows</FormLabel>
          <NumberInput
            size="sm"
            width="5vw"
            ml="25%"
            defaultValue={numberRows}
            min={10}
            onChange={(value) => setNumberRows(value)}
            max={100}
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
      </Flex>
    </Flex>
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* To show On top  */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="red.200"
        width="100vw"
        height="100vh"
      >
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
        <Box
          pos="fixed"
          bg="green.500"
          width="60vw"
          height="2vh"
          opacity={showBoardOptions ? 0 : 0.4}
          top={0}
          onMouseEnter={(e) => setShowBoardOptions(true)}
        />
        {/* To show On left  */}
        <Box
          pos="fixed"
          bg="green.500"
          width="1vw"
          height="80vh"
          opacity={showBoardOptions ? 0 : 0.4}
          top={16}
          left={0}
          onMouseEnter={(e) => setShowSpriteSelection(true)}
        />
        {/* To show On right  */}
        <Box
          pos="fixed"
          bg="green.500"
          width="1vw"
          height="80vh"
          top={16}
          opacity={showBoardOptions ? 0 : 0.4}
          right={0}
          onMouseEnter={(e) => setShowSpriteSelection(true)}
        />
        {showBoardOptions && boardOptions}

        {mapUploadModal && (
          <>
            <Box
              bg="black"
              opacity={0.3}
              pos="fixed"
              width="500%"
              height="500%"
              zIndex="1000"
            />
            <Flex
              align="center"
              justify="center"
              pos="fixed"
              top={10}
              left="30vw"
              opacity={1}
              width="40vw"
              height="90vh"
              bg="gray.500"
              zIndex="1050"
              direction="column"
            >
              <Stack spacing={6}>
                <Icon
                  pos="absolute"
                  name="close"
                  cursor="pointer"
                  color="red.500"
                  right={4}
                  top={4}
                  onClick={(e) => {
                    setMapUploadModal(null);
                  }}
                  zIndex={"1051"}
                />

                <Image width="30vw" height="75vh" src={mapPrev} />

                <Flex justify="center" mb="4vh">
                  <Stack spacing={2} isInline>
                    <Button
                      isLoading={uploading}
                      children="Select a map background"
                      onClick={(e) => upload.click()}
                    />
                    <Button
                      children="Upload"
                      isLoading={uploading}
                      onClick={async (e) => {
                        const formData = new FormData();
                        formData.append(
                          "image",
                          upload.files[0],
                          upload.files[0].name
                        );
                        setUploading(true);
                        const answer = await axios.post(
                          "https://api.imgbb.com/1/upload?expiration=300&key=0f6654c0cbf82ce0c4e080de1c4e7d00",
                          formData
                        );
                        setUploading(false);
                        setMapPicture(answer.data.data.url);
                        setMapUploadModal(null);
                      }}
                    />
                    <Button
                      children="Cancel"
                      onClick={(e) => setMapUploadModal(null)}
                    />
                  </Stack>
                </Flex>
              </Stack>
            </Flex>
          </>
        )}

        <SpriteContext.Provider value={{ sprite, setSprite }}>
          {showSpriteSelection && (
            <SpritesHandler
              NumberColumns={numberColumns}
              NumberRows={numberRows}
              SquareSize={squareSize}
              Show={showOptions}
              onMouseOver={(e) => {
                clearTimeout(spriteHandlerTimeout);
              }}
              onMouseLeave={(e) =>
                (spriteHandlerTimeout = setTimeout(
                  () => setShowSpriteSelection(false),
                  5000
                ))
              }
            />
          )}

          <Board
            NumberColumns={numberColumns}
            NumberRows={numberRows}
            SquareSize={squareSize}
            Map={mapPicture}
          />
          <SpritesSettings
            NumberColumns={numberColumns}
            NumberRows={numberRows}
            SquareSize={squareSize}
          />
        </SpriteContext.Provider>
      </Flex>
    </>
  );
}
