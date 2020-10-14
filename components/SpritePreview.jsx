import React, { useState, useEffect, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { Flex, Radio, RadioGroup } from "@chakra-ui/core";

const colors = {
  ally: "#137CBD",
  neutral: "#30404d",
  enemy: "#DB3737",
};

export const SpritePreview = ({ SquareSize, Show }) => {
  const [reRender, setReRender] = useState(false);
  const [spritePreview, setSpritePreview] = useState({
    content: "",
    horizontalMultiplier: 0,
    verticalMultiplier: 0,
  });
  const [radioControl, setRadioControl] = useState("neutral");
  const { sprite, setSprite } = useContext(SpriteContext);

  useEffect(() => {
    if (sprite.preview) {
      const creatingSprite = {
        content: sprite.content,
        horizontalMultiplier: sprite.horizontalMultiplier,
        verticalMultiplier: sprite.verticalMultiplier,
        type: sprite.type,
      };
      setReRender(!reRender);
      setSpritePreview(creatingSprite);
    }
  }, [sprite, SquareSize]);

  const spriteCliked = () => {
    setSprite({
      ...spritePreview,
      type: radioControl,
      preview: false,
    });
  };
  return (
    <>
      {Show && (
        <Flex
          direction="column"
          justify="center"
          align="center"
          pos="fixed"
          left={0}
        >
          <RadioGroup
            defaultValue="neutral"
            isInline
            spacing={2}
            label="Sprite type"
            onChange={(e) => {
              setRadioControl(e.currentTarget.value);
            }}
            selectedValue={radioControl}
            inline={true}
          >
            <Radio value="neutral"> Neutral</Radio>
            <Radio value="enemy"> Enemy </Radio>
            <Radio value="ally"> Ally </Radio>
          </RadioGroup>

          <img
            style={{
              width: `${spritePreview.horizontalMultiplier * SquareSize}px`,
              height: `${spritePreview.verticalMultiplier * SquareSize}px`,
              backgroundColor: `${
                radioControl === "neutral"
                  ? colors.neutral
                  : radioControl === "enemy"
                  ? colors.enemy
                  : colors.ally
              }`,
            }}
            src={spritePreview.content}
            alt=""
            onClick={(e) => {
              spriteCliked();
            }}
          />
        </Flex>
      )}
    </>
  );
};
/*
             <Flex align="space-around" justify="space-around">
                  <FormControl>
                    <FormLabel align="center">Rows </FormLabel>
                    <NumberInput
                      name="number"
                      size="sm"
                      width="5vw"
                      defaultValue={1}
                      min={1}
                      max={NumberRows}
                      onChange={(value) => {
                        if (value < 1 || value > NumberRows) return;
                        sprites[index].verticalMultiplier = value;
                        for (const sprite of sprites) {
                          sprite.color = "transparent";
                        }
                        sprites[index].color = "white";
                        setReRender(!reRender);
                        setSprite({
                          content: sprite.content,
                          horizontalMultiplier:
                            sprites[index].horizontalMultiplier,
                          verticalMultiplier: value,
                          preview: true,
                          type: "neutral",
                        });
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
                      name="number"
                      size="sm"
                      width="5vw"
                      ml="25%"
                      defaultValue={1}
                      min={1}
                      max={NumberColumns}
                      onChange={(value) => {
                        if (value < 1 || value > NumberColumns) return;
                        sprites[index].horizontalMultiplier = value;
                        for (const sprite of sprites) {
                          sprite.color = "transparent";
                        }
                        sprites[index].color = "white";
                        setReRender(!reRender);
                        setSprite({
                          content: sprite.content,
                          horizontalMultiplier: value,
                          verticalMultiplier: sprites[index].verticalMultiplier,
                          preview: true,
                          type: "neutral",
                        });
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
                </Flex>
                                      */
