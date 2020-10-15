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
