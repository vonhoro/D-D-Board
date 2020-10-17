import React, { useState, useEffect, useRef, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { Square } from "./Square";
import { moveSprite } from "../utils/moveSprite";
import { shadowedSquaresCoordinates } from "../utils/shadowedSquaresCoordinates";
import { Button, Grid, Image } from "@chakra-ui/core";
import io from "socket.io-client";
const socket = io("https://rocky-hamlet-30601.herokuapp.com/");

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
  const [orderSprites, setOrderSprites] = useState(0);
  const [numberColumns, setNumberColumns] = useState("auto");
  const [rotatingSprite, setRotatingSprite] = useState(false);
  const [squaresArray, setSquaresArray] = useState([]);
  const [spritesArray, setSpritesArray] = useState([]);
  const [mapColumns, setMapColumns] = useState(NumberColumns);
  const [mapRows, setMapRows] = useState(NumberRows);
  const [mapBg, setMapBg] = useState(Map);
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

  useEffect(() => {
    socket.on("Sprite change", (sprite) => {
      if (sprite?.gridArea) {
        spriteRef.current[
          sprite.spriteRefIndex
        ].style.gridArea = `${sprite.gridArea}`;
      } else if (sprite?.transform) {
        spriteRef.current[
          sprite.spriteRefIndex
        ].style.transform = `${sprite.transform}`;
      } else {
        spriteRef.current[
          sprite.spriteRefIndex
        ].style.height = `${sprite.Height}px`;
        spriteRef.current[
          sprite.spriteRefIndex
        ].style.width = `${sprite.Width}px`;
        spriteRef.current[
          sprite.spriteRefIndex
        ].style.backgroundColor = `${sprite.bgColor}`;
      }
    });

    socket.on("Map Config", ({ shape, mapBgr, columns, rows, squares }) => {
      setNumberColumns(shape);
      setMapBg(mapBgr);
      setMapColumns(columns);
      setMapRows(rows);
      setSquaresArray(squares);
    });
    socket.on("Sprites Information", (data) => {
      setSpritesArray(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  });

  useEffect(() => {
    let row = 0;
    let column = 0;
    let array = Array.from(Array(NumberColumns * NumberRows)).map(() => {
      column = column === NumberColumns ? 0 : column;
      column += 1;
      row = column === 1 ? row + 1 : row;
      return {
        coordinate: [row, column],
        color: colors.boardDefault,
      };
    });
    setSquaresArray(array);
    let numberOfColumns = "";

    for (let i = 0; i < NumberColumns; i++) {
      numberOfColumns += `auto `;
    }
    setNumberColumns(numberOfColumns);
    socket.emit("Map Config", {
      shape: numberOfColumns,
      mapBgr: Map,
      columns: NumberColumns,
      rows: NumberRows,
      squares: array,
    });
  }, [NumberColumns, NumberRows, Map]);

  // functions

  // for setting and putting sprites on the baord

  const putSprite = (e, index, type) => {
    // this conditios puts a new sprite on the board
    const xCoordinate = 1 + (index % NumberColumns);
    const yCoordinate = 1 + (index + 1 - xCoordinate) / NumberColumns;
    if (sprite.context === "map") {
      setSpritesArray([
        ...spritesArray,
        {
          content: sprite.content,
          order: orderSprites,
          coordinate: [yCoordinate, xCoordinate],
        },
      ]);
      // setRotatingSprite(!rotatingSprite);
      setOrderSprites(orderSprites + 1);
      setSquareWasClicked(false);
      setSprite({ ...sprite, context: "none" });
      socket.emit("Sprites Information", [
        ...spritesArray,
        {
          content: sprite.content,
          order: orderSprites,
          coordinate: [yCoordinate, xCoordinate],
        },
      ]);
      return;
    }

    // this prepares the sprite to move

    if (type === "sprite") {
      if (squareWasClicked) {
        setSquareWasClicked(false);
        spriteRef.current[index].blur();
        return;
      }
      setSpriteCondition({ clicked: true, position: index });
      setSquareWasClicked(true);
    } else {
      setSpriteCondition({ clicked: false, position: index });
    }

    if (squareWasClicked) {
      spriteRef.current[
        spriteCondition.position
      ].style.gridArea = `${yCoordinate} / ${xCoordinate} / span ${NumberRows} / span ${NumberColumns}`;

      socket.emit("Sprite change", {
        gridArea: `${yCoordinate} / ${xCoordinate} / span ${NumberRows} / span ${NumberColumns}`,
        spriteRefIndex: spriteCondition.position,
      });
      setSquareWasClicked(false);

      return;
    }
  };

  // to delete the sprite

  const removeSprite = (e, index) => {
    e.preventDefault();
    const removingElement = spritesArray.filter(
      (sprite, position) => position != index
    );
    setSpritesArray(removingElement);

    socket.emit("Sprites Information", removingElement);

    setOrderSprites(orderSprites - 1);

    setRotatingSprite(!rotatingSprite);
    setSquareWasClicked(false);
    // socket.emit("Board change", numberArray);
  };

  // key bindings on the sprite

  const rotateSprite = (e, index) => {
    e.preventDefault();
    const key = e.key;
    const currentDirection = spriteRef.current[index].style.transform;

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

    // spriteRef.current[1].style = spriteRef.current[index].style;

    socket.emit("Sprite change", {
      transform: spriteRef.current[index].style.transform,
      spriteRefIndex: index,
    });
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
      for (const square of squaresArray) {
        for (const coordinate of coordinatesToChange) {
          if (
            square.coordinate[0] === coordinate[1] &&
            square.coordinate[1] === coordinate[0]
          ) {
            square.color = colors.spritePlace;
          }
        }
      }
      setSquaresArray(squaresArray);
      setRotatingSprite(!rotatingSprite);
      setTimeout(() => {
        for (const square of squaresArray) {
          square.color = colors.boardDefault;
        }
        setSquaresArray(squaresArray);
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
    for (const square of squaresArray) {
      for (const coordinate of coordinatesToChange) {
        if (
          square.coordinate[0] === coordinate[1] &&
          square.coordinate[1] === coordinate[0]
        ) {
          square.color = colors.spritePlace;
        }
      }
    }
    setSquaresArray(squaresArray);
    setRotatingSprite(!rotatingSprite);
    setTimeout(() => {
      for (const square of squaresArray) {
        square.color = colors.boardDefault;
      }
      setSquaresArray(squaresArray);

      setRotatingSprite(!rotatingSprite);
    }, 0);
  };
  return (
    <>
      <Grid
        bgImage={`url('${mapBg}')`}
        bgPos="center"
        pgRepeat="no-repeat"
        bgSize="cover"
        height={`${mapRows * SquareSize}px`}
        width={`${mapColumns * SquareSize}px`}
        templateColumns={numberColumns}
        boxSizing="border-box"
        border="white solid 1px"
      >
        {squaresArray && (
          <>
            {squaresArray.map((square, index) => (
              <Square
                key={index}
                Height={SquareSize}
                Width={SquareSize}
                Coordinates={square.coordinate}
                Color={square.color}
                onClick={(e) => {
                  setSprite({ ...sprite, context: "none" });

                  putSprite(e, index, "square");
                }}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  squaresPreview(e, square.coordinate);
                }}
              />
            ))}
          </>
        )}

        {spritesArray && (
          <>
            {spritesArray.map((sprite, index) => (
              <Image
                ref={spriteRefUse(index)}
                src={sprite.content}
                alt="sprite"
                key={index + 100}
                onFocus={(e) => {
                  spriteRef.current[index].style.boxShadow = "0 0 0 5px white";
                  // sprite.spriteColor = colors.spriteFocus;
                }}
                maxWidth="100%"
                maxHeight="100%"
                tabIndex={index}
                style={{ transform: "scaleX(1) scaleY(1)" }}
                width="50px"
                height="50px"
                gridArea={`${sprite.coordinate[0]} / ${sprite.coordinate[1]} / span ${NumberRows} / span ${NumberColumns}`}
                bg={colors.neutral}
                zIndex={2 + sprite.order}
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
                    content: sprite.content,
                    context: "settings",
                    reference: e.target,
                    spriteRefIndex: index,
                  });
                  setSpriteCondition({
                    ...spriteCondition,
                    position: index,
                  });
                }}
              />
            ))}
          </>
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
