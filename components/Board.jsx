import React, { useState, useEffect, useRef, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { Square } from "./Square";
import { moveSprite } from "../utils/moveSprite";
import { shadowedSquaresCoordinates } from "../utils/shadowedSquaresCoordinates";
import io from "socket.io-client";
import { Button, Grid, Image } from "@chakra-ui/core";
// const socket = io("https://rocky-hamlet-30601.herokuapp.com");

const colors = {
  ally: "#137CBD",
  neutral: "#30404d",
  enemy: "#DB3737",
  boardDefault: "transparent",
  spritePlace: "#0F9960",
  spriteFocus: "#A7B6C2",
  direction: "#CED9E0",
};

export const Board = ({ NumberColumns, NumberRows, SquareSize, Map }) => {
  // context
  const { sprite, setSprite } = useContext(SpriteContext);

  // states

  const [spriteCondition, setSpriteCondition] = useState({
    clicked: false,
    position: 0,
  });

  const [prevSquare, setPrevSquare] = useState(null);
  const [squareWasClicked, setSquareWasClicked] = useState(false);
  const [numberArray, setNumberArray] = useState(null);
  const [orderSprites, setOrderSprites] = useState(0);
  const [numberColumns, setNumberColumns] = useState("auto");
  const [rotatingSprite, setRotatingSprite] = useState(false);

  const [squareSize, setSquareSize] = useState({ height: "4em", width: "4em" });

  // ref
  const arr = [...new Array(NumberColumns * NumberRows)].map(
    (_, index) => index
  );
  const spriteRef = useRef(arr);
  const spriteRefUse = (index) => (element) => {
    spriteRef.current[index] = element;
  };
  // effects

  //this setps Up the board size on number of squares

  // useEffect(() => {
  // socket.on("Board Status", (data) => {
  // setNumberArray(data);
  // });
  // return () => {
  // socket.off("connect");
  // socket.off("disconnect");
  // socket.off("message");
  // };
  // });

  useEffect(() => {
    let row = 0;
    let column = 0;
    let array = Array.from(Array(NumberColumns * NumberRows)).map(() => {
      column = column === NumberColumns ? 0 : column;
      column += 1;

      row = column === 1 ? row + 1 : row;

      return {
        content: "",
        coordinate: [row, column],
        size: [0, 0],
        color: colors.boardDefault,
      };
    });
    setNumberArray(array);
    let numberOfColumns = "";

    for (let i = 0; i < NumberColumns; i++) {
      numberOfColumns += `auto `;
    }
    setNumberColumns(numberOfColumns);
  }, [NumberColumns, NumberRows]);

  useEffect(() => {
    const squareSize = SquareSize + "px";

    setSquareSize({ height: squareSize, width: squareSize });
  }, [SquareSize]);

  // functions

  // for setting and putting sprites on the baord

  const putSprite = (e, index, type) => {
    // this conditios puts a new sprite on the board

    if (sprite.context === "map") {
      const colorType =
        sprite.type === "neutral"
          ? colors.neutral
          : sprite.type === "enemy"
          ? colors.enemy
          : colors.ally;

      numberArray[index].content = sprite.content;
      numberArray[index] = {
        ...numberArray[index],
        size: [sprite.horizontalMultiplier, sprite.verticalMultiplier],
        rotation: 0,
        translation: [0, 0],
        ofSet: [0, 1],
        order: orderSprites,
        spriteColor: colorType,
        spriteColorBlur: colorType,
        color: colors.boardDefault,
        type: sprite.type,
      };
      setOrderSprites(orderSprites + 1);
      setNumberArray(numberArray);
      setSquareWasClicked(false);
      setSprite({ ...sprite, context: "none" });
      // socket.emit("Board change", numberArray);
      return;
    }

    // this prepares the sprite to move

    if (type === "sprite") {
      setSpriteCondition({ clicked: true, position: index });
      setSquareWasClicked(true);
      setPrevSquare(index);
      if (squareWasClicked) spriteRef.current[index].blur();
    } else {
      setSpriteCondition({ clicked: false, position: index });
    }

    if (squareWasClicked) {
      const acomodateBoard = numberArray;
      const temp = acomodateBoard[prevSquare].coordinate;
      acomodateBoard[prevSquare].coordinate = acomodateBoard[index].coordinate;
      acomodateBoard[index].coordinate = temp;
      // socket.emit("Board change", acomodateBoard);
      setSquareWasClicked(false);
      setNumberArray(acomodateBoard);

      return;
    }
  };

  // to delete the sprite

  const removeSprite = (e, index) => {
    e.preventDefault();

    setOrderSprites(orderSprites - 1);
    numberArray[index].content = "";
    setNumberArray(numberArray);
    setRotatingSprite(!rotatingSprite);
    setSquareWasClicked(false);
    // socket.emit("Board change", numberArray);
  };

  // key bindings on the sprite

  const rotateSprite = (e, index) => {
    e.preventDefault();
    const key = e.key;
    const currentDirection = spriteRef.current[index].style.transform;
    console.log(currentDirection);
    if (key === "I" || key === "i") {
      const wasNegative = currentDirection.match(/scaleX\(-/);
      if (wasNegative) {
        spriteRef.current[index].style.transform = "scaleX(-1) scaleY(1)";
      } else {
        spriteRef.current[index].style.transform = "scaleX(1) scaleY(1)";
      }
    } else if (key === "K" || key === "k") {
      const wasNegative = currentDirection.match(/scaleX\(-/);
      if (wasNegative) {
        spriteRef.current[index].style.transform = "scaleX(-1) scaleY(-1)";
      } else {
        spriteRef.current[index].style.transform = "scaleX(1) scaleY(-1)";
      }
    } else if (key === "J" || key === "j") {
      const wasNegative = currentDirection.match(/scaleY\(-/);
      if (wasNegative) {
        spriteRef.current[index].style.transform = "scaleX(1) scaleY(-1)";
      } else {
        spriteRef.current[index].style.transform = "scaleX(1) scaleY(1)";
      }
    } else if (key === "L" || key === "l") {
      const wasNegative = currentDirection.match(/scaleY\(-/);
      if (wasNegative) {
        spriteRef.current[index].style.transform = "scaleX(-1) scaleY(-1)";
      } else {
        spriteRef.current[index].style.transform = "scaleX(-1) scaleY(1)";
      }
    }

    // socket.emit("Board change", numberArray);
  };

  // esto da un preview del area que ocupara el sprite

  const squaresPreview = (e, coordinates) => {
    if (
      !squareWasClicked &&
      (sprite.context === "none" || sprite.context === "settings")
    )
      return;
    if (spriteCondition.clicked) {
      let widthMultiplier;
      let heightMultiplier;
      if (!spriteRef.current[spriteCondition.position]) {
        widthMultiplier = 1;
        heightMultiplier = 1;
      } else {
        widthMultiplier =
          spriteRef.current[spriteCondition.position].width / SquareSize;
        heightMultiplier =
          spriteRef.current[spriteCondition.position].height / SquareSize;
      }
      const coordinatesToChange = shadowedSquaresCoordinates(
        widthMultiplier,
        heightMultiplier,
        coordinates
      );
      console.log(coordinatesToChange);
      for (const square of numberArray) {
        for (const coordinate of coordinatesToChange) {
          if (
            square.coordinate[0] === coordinate[1] &&
            square.coordinate[1] === coordinate[0]
          ) {
            square.color = colors.spritePlace;
          }
        }
      }
      setNumberArray(numberArray);
      setRotatingSprite(!rotatingSprite);
      setTimeout(() => {
        for (const square of numberArray) {
          square.color = colors.boardDefault;
        }
        setNumberArray(numberArray);
      }, 0);
    }

    // Just as separation t not loose my self on this mess for this momnet

    if (sprite.preview) return;
    const coordinatesToChange = shadowedSquaresCoordinates(
      sprite.horizontalMultiplier,
      sprite.verticalMultiplier,
      coordinates,
      0
    );
    for (const square of numberArray) {
      for (const coordinate of coordinatesToChange) {
        if (
          square.coordinate[0] === coordinate[1] &&
          square.coordinate[1] === coordinate[0]
        ) {
          square.color = colors.spritePlace;
        }
      }
    }
    setNumberArray(numberArray);
    setRotatingSprite(!rotatingSprite);
    setTimeout(() => {
      for (const square of numberArray) {
        square.color = colors.boardDefault;
      }
      setNumberArray(numberArray);

      setRotatingSprite(!rotatingSprite);
    }, 0);
  };
  return (
    <>
      <Grid
        bgImage={`url('${Map}')`}
        bgPos="center"
        pgRepeat="no-repeat"
        bgSize="cover"
        height={`${NumberRows * SquareSize}px`}
        width={`${NumberColumns * SquareSize}px`}
        templateColumns={numberColumns}
        boxSizing="border-box"
      >
        {numberArray ? (
          <>
            {numberArray.map((square, index) => (
              <>
                {square.content !== "" ? (
                  <Image
                    ref={spriteRefUse(index)}
                    src={square.content}
                    alt="sprite"
                    key={index + 100}
                    onFocus={(e) => {
                      spriteRef.current[index].style.boxShadow =
                        "0 0 0 5px white";
                      // square.spriteColor = colors.spriteFocus
                    }}
                    maxWidth="100%"
                    maxHeight="100%"
                    tabIndex={index}
                    style={{ transform: "scaleX(1) scaleY(1)" }}
                    width="50px"
                    height="50px"
                    gridArea={`${square.coordinate[0]} / ${square.coordinate[1]} / span ${NumberRows} / span ${NumberColumns}`}
                    bg={colors.neutral}
                    zIndex={2 + square.order}
                    onKeyUp={(e) => {
                      rotateSprite(e, index);
                    }}
                    onBlur={(e) => {
                      setTimeout(() => {
                        if (!spriteRef.current[index]) return;

                        spriteRef.current[index].style.boxShadow = "";
                      }, 400);
                    }}
                    onClick={(e) => {
                      setSprite({ ...sprite, context: "none" });

                      putSprite(e, index, "sprite");
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setSprite({
                        content: square.content,
                        horizontalMultplier: square.size[0],
                        verticalMultiplier: square.size[1],
                        context: "settings",
                        type: "neutral",
                        reference: e.target,
                      });
                      setSpriteCondition({
                        ...spriteCondition,
                        position: index,
                      });
                    }}
                  />
                ) : (
                  <Square
                    key={index}
                    Height={squareSize.height}
                    Width={squareSize.width}
                    Coordinates={square.coordinate}
                    Color={square.color}
                    onClick={(e) => {
                      setSprite({ ...sprite, context: "none" });

                      putSprite(e, index, "square");
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "green";

                      // squaresPreview(e, square.coordinate);
                    }}
                  />
                )}{" "}
              </>
            ))}
          </>
        ) : (
          <></>
        )}
      </Grid>
      {sprite.context === "settings" && (
        <Button
          variantColor="red"
          children="Delete"
          pos="fixed"
          bottom={"22.5vh"}
          left="36vw"
          zIndex={2000}
          onClick={(e) => {
            setSprite({ ...sprite, context: "none" });
            removeSprite(e, spriteCondition.position);
          }}
        />
      )}
    </>
  );
};
