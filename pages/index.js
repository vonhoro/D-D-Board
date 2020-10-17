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
  const [squareSize, setSquareSize] = React.useState(50);
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
      opacity={0.8}
      top="0"
      align="center"
      bg="gray.500"
      rounded="1em"
      p={4}
      textAlign="center"
      onMouseLeave={(e) => {
        setShowBoardOptions(false);
      }}
    >
      <Text color="black">Board Settings</Text>

      <Flex justify="center" align="center" width="full" wrap="wrap">
        <Flex direction="column" textAlign="center" align="center">
          <Text color="black"> Columns</Text>

          <NumberInput
            name="number"
            size="sm"
            width="30%"
            defaultValue={numberColumns}
            min={10}
            onChange={(value) => setNumberColums(value)}
            max={100}
          >
            <NumberInputField
              boderColor="blue.900"
              color="blue.400"
              focusBorderColor="red.200"
            />
            <NumberInputStepper>
              <NumberIncrementStepper children="+" />
              <NumberDecrementStepper children="-" />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Button
          bg="blue.200"
          mt="2.5%"
          variantColor="blue"
          children={"Background"}
          onClick={(e) => setMapUploadModal(true)}
        />

        <Flex direction="column" textAlign="center" align="center">
          <Text>Rows</Text>
          <NumberInput
            size="sm"
            width="30%"
            defaultValue={numberRows}
            min={10}
            onChange={(value) => setNumberRows(value)}
            max={100}
          >
            <NumberInputField
              boderColor="blue.900"
              color="blue.400"
              focusBorderColor="red.200"
              focusBorderColor="red.200"
            />
            <NumberInputStepper>
              <NumberIncrementStepper children="+" />
              <NumberDecrementStepper children="-" />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
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
        mt="6%"
        direction="column"
        align="center"
        justify="center"
        width="full"
        height="full"
        wrap="wrap"
        bg="gray.700"
      >
        <input
          type="file"
          ref={(node) => (upload = node)}
          style={{ display: "none" }}
          onChange={(e) => {
            e.persist();
            const FilePrev = URL.createObjectURL(upload.files[0]);
            setMapPrev(FilePrev);
          }}
        />
        <Box
          pos="fixed"
          bg="gray.600"
          width="60vw"
          height="2vh"
          opacity={showBoardOptions || showSpriteSelection ? 0 : 0.4}
          top={0}
          onMouseEnter={(e) => setShowBoardOptions(true)}
        />
        {/* To show On right  */}
        <Box
          pos="fixed"
          bg="gray.600"
          width="1vw"
          height="80vh"
          top={16}
          opacity={showBoardOptions || showSpriteSelection ? 0 : 0.4}
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
              width="full"
              height="full"
              zIndex="1000"
            />
            <Flex
              align="center"
              justify="center"
              pos="fixed"
              top="5vh"
              left="15vw"
              opacity={1}
              p="1rem 3rem 0 3rem"
              width="70vw"
              height="90vh"
              bg="gray.500"
              zIndex="1050"
              direction="column"
            >
              <Stack spacing={4}>
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

                <Image
                  width="70vw"
                  maxWidth="100%"
                  maxHeight="100%"
                  height="70vh"
                  src={mapPrev}
                />

                <Flex justify="center" mb={-1} align="center">
                  <Stack spacing={2} isInline>
                    <Button
                      bg="blue.500"
                      variantColor="blue"
                      color="white"
                      isLoading={uploading}
                      children="Select a map background"
                      onClick={(e) => upload.click()}
                    />
                    <Button
                      bg="blue.500"
                      variantColor="blue"
                      color="white"
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
                      bg="blue.500"
                      variantColor="blue"
                      color="white"
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

          {sprite.context === "settings" && (
            <SpritesSettings
              NumberColumns={numberColumns}
              NumberRows={numberRows}
              SquareSize={squareSize}
            />
          )}
        </SpriteContext.Provider>
      </Flex>
    </>
  );
}
