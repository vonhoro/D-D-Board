import React, { useState, useEffect, useRef, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { Square } from "./Square";
import { moveSprite } from "../utils/moveSprite";
import background from "../sprites/try.jpg";
import { shadowedSquaresCoordinates } from "../utils/shadowedSquaresCoordinates";
import io from "socket.io-client";
import { Grid } from "@chakra-ui/core";
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

    if (!sprite.preview) {
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
      setSprite({ ...sprite, preview: true });
      // socket.emit("Board change", numberArray);
      return;
    }

    // this prepares the sprite to move

    if (type === "sprite") {
      spriteRef.current[index].focus();
      setSpriteCondition({ clicked: true, position: index });
      setPrevSquare(index);
      setSquareWasClicked(true);
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
    const spriteChange = moveSprite(numberArray[index], e.key);
    if (spriteChange) {
      numberArray[index] = spriteChange;
      setSquareWasClicked(false);
      setRotatingSprite(!rotatingSprite);
      setNumberArray(numberArray);
      // socket.emit("Board change", numberArray);
    }
  };

  // esto da un preview del area que ocupara el sprite

  const squaresPreview = (e, coordinates) => {
    if (!squareWasClicked && sprite.preview) return;
    if (spriteCondition.clicked) {
      const coordinatesToChange = shadowedSquaresCoordinates(
        numberArray[spriteCondition.position].size[0],
        numberArray[spriteCondition.position].size[1],
        coordinates,
        numberArray[spriteCondition.position].rotation
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
        alignContent="start"
        justifyContent="left"
        height={`${NumberRows * SquareSize}px`}
        width={`${NumberColumns * SquareSize}px`}
        color="none"
        templateColumns={numberColumns}
      >
        {numberArray ? (
          <>
            {numberArray.map((square, index) => (
              <>
                {square.content !== "" ? (
                  <img
                    ref={spriteRefUse(index)}
                    className="sprite"
                    src={square.content}
                    alt="sprite"
                    key={index + 100}
                    onFocus={(e) => (square.spriteColor = colors.spriteFocus)}
                    tabIndex={index}
                    style={{
                      width: `${SquareSize * square.size[0]}px`,
                      height: `${SquareSize * square.size[1]}px`,
                      gridArea: `${square.coordinate[0]} / ${square.coordinate[1]} /span ${NumberRows} / span ${NumberColumns}`,
                      transform: `rotate(${square.rotation}deg) translate(${square.translation[0]}%,${square.translation[1]}%)`,
                      boxShadow: `${square.ofSet[0]}em ${square.ofSet[1]}em 0 0 ${colors.direction} inset`,
                      backgroundColor: `${square.spriteColor}`,
                      zIndex: 2 + square.order,
                    }}
                    onKeyUp={(e) => {
                      rotateSprite(e, index);
                    }}
                    onBlur={(e) => {
                      square.spriteColor = square.spriteColorBlur;
                    }}
                    onClick={(e) => putSprite(e, index, "sprite")}
                    onContextMenu={(e) => removeSprite(e, index)}
                  />
                ) : (
                  <Square
                    key={index}
                    Height={squareSize.height}
                    Width={squareSize.width}
                    Coordinates={square.coordinate}
                    Color={square.color}
                    onClick={(e) => putSprite(e, index, "square")}
                    onMouseEnter={(e) => {
                      squaresPreview(e, square.coordinate);
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
    </>
  );
};