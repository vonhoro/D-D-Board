[33mcommit d94f07afdfd500b915ab2e87c1b1079c95af0674[m[33m ([m[1;36mHEAD -> [m[1;32mnewFeatures[m[33m)[m
Author: VonHoro <64147799+vonhoro@users.noreply.github.com>
Date:   Thu Oct 15 15:58:05 2020 -0400

    cambios

[1mdiff --git a/components/Board.jsx b/components/Board.jsx[m
[1mindex 976bafd..8ac13cc 100644[m
[1m--- a/components/Board.jsx[m
[1m+++ b/components/Board.jsx[m
[36m@@ -4,7 +4,7 @@[m [mimport { Square } from "./Square";[m
 import { moveSprite } from "../utils/moveSprite";[m
 import { shadowedSquaresCoordinates } from "../utils/shadowedSquaresCoordinates";[m
 import io from "socket.io-client";[m
[31m-import { Grid } from "@chakra-ui/core";[m
[32m+[m[32mimport { Grid, Image } from "@chakra-ui/core";[m
 // const socket = io("https://rocky-hamlet-30601.herokuapp.com");[m
 [m
 const colors = {[m
[36m@@ -166,18 +166,23 @@[m [mexport const Board = ({ NumberColumns, NumberRows, SquareSize, Map }) => {[m
 [m
   const rotateSprite = (e, index) => {[m
     e.preventDefault();[m
[31m-    const spriteWidth = parseInt([m
[31m-      spriteRef.current[index].style.width.replace("px", "")[m
[31m-    );[m
[31m-    const spriteHeigth = parseInt([m
[31m-      spriteRef.current[index].style.height.replace("px", "")[m
[31m-    );[m
[32m+[m[32m    const spriteWidth = spriteRef.current[index].width;[m
[32m+[m[32m    // parseInt([m
[32m+[m[32m    // spriteRef.current[index].style.width.replace("px", "")[m
[32m+[m[32m    // );[m
[32m+[m[32m    const spriteHeigth = spriteRef.current[index].height;[m
[32m+[m[32m    // parseInt([m
[32m+[m[32m    // spriteRef.current[index].style.height.replace("px", "")[m
[32m+[m[32m    // );[m
     let spriteInformation = {[m
       ...numberArray[index],[m
       size: [spriteWidth / SquareSize, spriteHeigth / SquareSize],[m
     };[m
     const spriteChange = moveSprite(spriteInformation, e.key);[m
     if (spriteChange) {[m
[32m+[m[32m      spriteRef.current[[m
[32m+[m[32m        index[m
[32m+[m[32m      ].style.transform = `rotate(${spriteChange.rotation}deg) translate(${spriteChange.translation[0]}%,${spriteChange.translation[1]}%)`;[m
       numberArray[index] = spriteChange;[m
       setSquareWasClicked(false);[m
       setRotatingSprite(!rotatingSprite);[m
[36m@@ -264,38 +269,44 @@[m [mexport const Board = ({ NumberColumns, NumberRows, SquareSize, Map }) => {[m
         width={`${NumberColumns * SquareSize}px`}[m
         color="none"[m
         templateColumns={numberColumns}[m
[32m+[m[32m        boxSizing="border-box"[m
       >[m
         {numberArray ? ([m
           <>[m
             {numberArray.map((square, index) => ([m
               <>[m
                 {square.content !== "" ? ([m
[31m-                  <img[m
[32m+[m[32m                  <Image[m
                     ref={spriteRefUse(index)}[m
                     className="sprite"[m
                     src={square.content}[m
                     alt="sprite"[m
                     key={index + 100}[m
[31m-                    onFocus={(e) => (square.spriteColor = colors.spriteFocus)}[m
[31m-                    tabIndex={index}[m
[31m-                    style={{[m
[31m-                      width: `${SquareSize * square.size[0]}px`,[m
[31m-                      height: `${SquareSize * square.size[1]}px`,[m
[31m-                      gridArea: `${square.coordinate[0]} / ${square.coordinate[1]} /span ${NumberRows} / span ${NumberColumns}`,[m
[31m-                      transform: `rotate(${square.rotation}deg) translate(${square.translation[0]}%,${square.translation[1]}%)`,[m
[31m-                      boxShadow: `${square.ofSet[0]}em ${square.ofSet[1]}em 0 0 ${colors.direction} inset`,[m
[31m-                      backgroundColor: `${square.spriteColor}`,[m
[31m-                      zIndex: 2 + square.order,[m
[32m+[m[32m                    onFocus={(e) => {[m
[32m+[m[32m                      spriteRef.current[index].style.border = "white solid 4px";[m
[32m+[m[32m                      // square.spriteColor = colors.spriteFocus[m
                     }}[m
[32m+[m[32m                    tabIndex={index}[m
[32m+[m[32m                    width="50px"[m
[32m+[m[32m                    height="50px"[m
[32m+[m[32m                    gridArea={`${square.coordinate[0]} / ${square.coordinate[1]} / span ${NumberRows} / span ${NumberColumns}`}[m
[32m+[m[32m                    boxShadow={`${square.ofSet[0]}em ${square.ofSet[1]}em 0 0 ${colors.direction} inset`}[m
[32m+[m[32m                    bg={colors.neutral}[m
[32m+[m[32m                    zIndex={2 + square.order}[m
                     onKeyUp={(e) => {[m
                       rotateSprite(e, index);[m
                     }}[m
                     onBlur={(e) => {[m
[31m-                      square.spriteColor = square.spriteColorBlur;[m
[32m+[m[32m                      spriteRef.current[index].style.border = "";[m
[32m+[m[32m                    }}[m
[32m+[m[32m                    onClick={(e) => {[m
[32m+[m[32m                      console.log(e.target);[m
[32m+[m
[32m+[m[32m                      putSprite(e, index, "sprite");[m
                     }}[m
[31m-                    onClick={(e) => putSprite(e, index, "sprite")}[m
                     onContextMenu={(e) => {[m
                       e.preventDefault();[m
[32m+[m[32m                      e.target.blur();[m
                       setSprite({[m
                         content: square.content,[m
                         horizontalMultplier: square.size[0],[m
[1mdiff --git a/components/SpritesSettings.jsx b/components/SpritesSettings.jsx[m
[1mindex b362bc6..4e8febc 100644[m
[1m--- a/components/SpritesSettings.jsx[m
[1m+++ b/components/SpritesSettings.jsx[m
[36m@@ -27,10 +27,23 @@[m [mimport {[m
   Stack,[m
   Text,[m
 } from "@chakra-ui/core";[m
[32m+[m
[32m+[m[32mconst colors = {[m
[32m+[m[32m  ally: "#137CBD",[m
[32m+[m[32m  neutral: "#30404d",[m
[32m+[m[32m  enemy: "#DB3737",[m
[32m+[m[32m  boardDefault: "transparent",[m
[32m+[m[32m  spritePlace: "#0F9960",[m
[32m+[m[32m  spriteFocus: "#A7B6C2",[m
[32m+[m[32m  direction: "#CED9E0",[m
[32m+[m[32m};[m
[32m+[m
 export const SpritesSettings = ({ NumberColumns, NumberRows, SquareSize }) => {[m
   const { sprite, setSprite } = React.useContext(SpriteContext);[m
[31m-  const [sizesValues, setSizesValues] = React.useState({ columns: 1, rows: 1 });[m
[32m+[m
[32m+[m[32m  const [update, setUpdate] = React.useState(false);[m
   const [radioValue, setRadioValue] = React.useState(null);[m
[32m+[m[32m  const [defaultValue, setDefaultValue] = React.useState(1);[m
   const [spriteInformation, setSpriteInformation] = React.useState({[m
     content: "",[m
     horizontalMultplier: "",[m
[36m@@ -43,15 +56,17 @@[m [mexport const SpritesSettings = ({ NumberColumns, NumberRows, SquareSize }) => {[m
   React.useEffect(() => {[m
     if (sprite.context !== "settings") return;[m
     setSpriteInformation(sprite);[m
[31m-    const spriteWidth =[m
[31m-      parseInt(sprite.reference.style.width.replace("px", "")) / SquareSize;[m
[31m-    const spriteHeigth =[m
[31m-      parseInt(sprite.reference.style.height.replace("px", "")) / SquareSize;[m
[31m-[m
[31m-    setSizesValues({ columns: spriteWidth, rows: spriteHeigth });[m
[31m-    console.log(sprite);[m
[32m+[m[32m    console.log(SquareSize);[m
[32m+[m[32m    const spriteWidth = sprite.reference.style.width;[m
[32m+[m[32m    // parseInt(sprite.reference.width.replace("px", "")) / SquareSize;[m
[32m+[m[32m    // const spriteHeight = sprite.reference.height / SquareSize;[m
[32m+[m[32m    // parseInt(sprite.reference.height.replace("px", "")) / SquareSize;[m
[32m+[m[32m    console.log(spriteWidth);[m
[32m+[m[32m    console.log(sprite.reference);[m
   }, [sprite]);[m
 [m
[32m+[m[32m  React.useEffect(() => console.log("updating"), [update]);[m
[32m+[m
   return ([m
     <Grid[m
       pos="fixed"[m
[36m@@ -83,28 +98,54 @@[m [mexport const SpritesSettings = ({ NumberColumns, NumberRows, SquareSize }) => {[m
               defaultValue={1}[m
               min={1}[m
               max={NumberRows}[m
[31m-              value={sizesValues.rows}[m
[31m-              onChange={(value) => {[m
[31m-                if ([m
[31m-                  value < 1 ||[m
[31m-                  value > NumberRows ||[m
[31m-                  !spriteInformation.reference[m
[31m-                )[m
[31m-                  return;[m
[31m-                spriteInformation.reference.style.height = `${[m
[31m-                  value * SquareSize[m
[31m-                }px`;[m
[31m-                setSizesValues({ ...sizesValues, rows: value });[m
[31m-              }}[m
             >[m
[31m-              <NumberInputField focusBorderColor="red.200" />[m
[32m+[m[32m              <NumberInputField[m
[32m+[m[32m                value={[m
[32m+[m[32m                  spriteInformation.reference[m
[32m+[m[32m                    ? parseInt(sprite.reference.height + 8) / SquareSize[m
[32m+[m[32m                    : 1[m
[32m+[m[32m                }[m
[32m+[m[32m                focusBorderColor="red.200"[m
[32m+[m[32m              />[m
               <NumberInputStepper>[m
                 <NumberIncrementStepper[m
[32m+[m[32m                  onClick={(e) => {[m
[32m+[m[32m                    let value = spriteInformation.reference[m
[32m+[m[32m                      ? parseInt(sprite.reference.height + 8) / SquareSize[m
[32m+[m[32m                      : 1;[m
[32m+[m[32m                    value += 1;[m
[32m+[m[32m                    if ([m
[32m+[m[32m                      value < 1 ||[m
[32m+[m[32m                      value > NumberRows ||[m
[32m+[m[32m                      !spriteInformation.reference[m
[32m+[m[32m                    )[m
[32m+[m[32m                      return;[m
[32m+[m[32m                    spriteInformation.reference.style.height = `${[m
[32m+[m[32m                      value * SquareSize[m
[32m+[m[32m                    }px`;[m
[32m+[m[32m                    setUpdate(!update);[m
[32m+[m[32m                  }}[m
                   bg="green.200"[m
                   _active={{ bg: "green.300" }}[m
                   children="+"[m
                 />[m
                 <NumberDecrementStepper[m
[32m+[m[32m                  onClick={(e) => {[m
[32m+[m[32m                    let value = spriteInformation.reference[m
[32m+[m[32m                      ? parseInt(sprite.reference.height + 8) / SquareSize[m
[32m+[m[32m                      : 1;[m
[32m+[m[32m                    value -= 1;[m
[32m+[m[32m                    if ([m
[32m+[m[32m                      value < 1 ||[m
[32m+[m[32m                      value > NumberRows ||[m
[32m+[m[32m                      !spriteInformation.reference[m
[32m+[m[32m                    )[m
[32m+[m[32m                      return;[m
[32m+[m[32m                    spriteInformation.reference.style.height = `${[m
[32m+[m[32m                      value * SquareSize[m
[32m+[m[32m                    }px`;[m
[32m+[m[32m                    setUpdate(!update);[m
[32m+[m[32m                  }}[m
                   bg="pink.200"[m
                   _active={{ bg: "pink.300" }}[m
                   children="-"[m
[36m@@ -121,32 +162,56 @@[m [mexport const SpritesSettings = ({ NumberColumns, NumberRows, SquareSize }) => {[m
               width="5vw"[m
               ml="25%"[m
               min={1}[m
[32m+[m[32m              defaultValue={1}[m
               max={NumberColumns}[m
[31m-              onChange={(value) => {[m
[31m-                if ([m
[31m-                  value < 1 ||[m
[31m-                  value > NumberColumns ||[m
[31m-                  !spriteInformation.reference[m
[31m-                )[m
[31m-                  return;[m
[31m-[m
[31m-                spriteInformation.reference.style.width = `${[m
[31m-                  value * SquareSize[m
[31m-                }px`;[m
[31m-                setSizesValues({ ...sizesValues, columns: value });[m
[31m-              }}[m
             >[m
               <NumberInputField[m
[31m-                value={sizesValues.columns}[m
[32m+[m[32m                value={[m
[32m+[m[32m                  spriteInformation.reference[m
[32m+[m[32m                    ? parseInt(sprite.reference.width + 8) / SquareSize[m
[32m+[m[32m                    : 1[m
[32m+[m[32m                }[m
                 focusBorderColor="red.200"[m
               />[m
               <NumberInputStepper>[m
                 <NumberIncrementStepper[m
[32m+[m[32m                  onClick={(e) => {[m
[32m+[m[32m                    let value = spriteInformation.reference[m
[32m+[m[32m                      ? parseInt(sprite.reference.width + 8) / SquareSize[m
[32m+[m[32m                      : 1;[m
[32m+[m[32m                    value += 1;[m
[32m+[m[32m                    if ([m
[32m+[m[32m                      value < 1 ||[m
[32m+[m[32m                      value > NumberColumns ||[m
[32m+[m[32m                      !spriteInformation.reference[m
[32m+[m[32m                    )[m
[32m+[m[32m                      return;[m
[32m+[m[32m                    spriteInformation.reference.style.width = `${[m
[32m+[m[32m                      value * SquareSize[m
[32m+[m[32m                    }px`;[m
[32m+[m[32m                    setUpdate(!update);[m
[32m+[m[32m                  }}[m
                   bg="green.200"[m
                   _active={{ bg: "green.300" }}[m
                   children="+"[m
                 />[m
                 <NumberDecrementStepper[m
[32m+[m[32m                  onClick={(e) => {[m
[32m+[m[32m                    let value = spriteInformation.reference[m
[32m+[m[32m                      ? parseInt(sprite.reference.width + 8) / SquareSize[m
[32m+[m[32m                      : 1;[m
[32m+[m[32m                    value -= 1;[m
[32m+[m[32m                    if ([m
[32m+[m[32m                      value < 1 ||[m
[32m+[m[32m                      value > NumberColumns ||[m
[32m+[m[32m                      !spriteInformation.reference[m
[32m+[m[32m                    )[m
[32m+[m[32m                      return;[m
[32m+[m[32m                    spriteInformation.reference.style.width = `${[m
[32m+[m[32m                      value * SquareSize[m
[32m+[m[32m                    }px`;[m
[32m+[m[32m                    setUpdate(!update);[m
[32m+[m[32m                  }}[m
                   bg="pink.200"[m
                   _active={{ bg: "pink.300" }}[m
                   children="-"[m
[36m@@ -164,13 +229,15 @@[m [mexport const SpritesSettings = ({ NumberColumns, NumberRows, SquareSize }) => {[m
             if (!spriteInformation.reference) return;[m
             switch (e.target.value) {[m
               case "neutral":[m
[31m-                spriteInformation.reference.style.backgroundColor = "gray";[m
[32m+[m[32m                spriteInformation.reference.style.backgroundColor =[m
[32m+[m[32m                  colors.neutral;[m
                 break;[m
               case "enemy":[m
[31m-                spriteInformation.reference.style.backgroundColor = "red";[m
[32m+[m[32m                spriteInformation.reference.style.backgroundColor =[m
[32m+[m[32m                  colors.enemy;[m
                 break;[m
               default:[m
[31m-                spriteInformation.reference.style.backgroundColor = "blue";[m
[32m+[m[32m                spriteInformation.reference.style.backgroundColor = colors.ally;[m
             }[m
           }}[m
           color="blue.200"[m
[1mdiff --git a/components/Square.jsx b/components/Square.jsx[m
[1mindex 5d5dcc0..00a60e5 100644[m
[1m--- a/components/Square.jsx[m
[1m+++ b/components/Square.jsx[m
[36m@@ -11,8 +11,9 @@[m [mexport const Square = ({[m
   return ([m
     <Box[m
       borderColor="gray.100"[m
[31m-      border="0.01em"[m
[32m+[m[32m      border="1px"[m
       borderStyle="solid"[m
[32m+[m[32m      boxSizing="border-box"[m
       style={{[m
         height: Height,[m
         width: Width,[m
[1mdiff --git a/pages/index.js b/pages/index.js[m
[1mindex d9cc8d1..c4937df 100644[m
[1m--- a/pages/index.js[m
[1m+++ b/pages/index.js[m
[36m@@ -45,7 +45,7 @@[m [mexport default function Home() {[m
   const [numberRows, setNumberRows] = React.useState(10);[m
   const [numberColumns, setNumberColums] = React.useState(10);[m
   const [showOptions, setShowOptions] = React.useState(true);[m
[31m-  const [squareSize, setSquareSize] = React.useState(40);[m
[32m+[m[32m  const [squareSize, setSquareSize] = React.useState(50);[m
   const [showBoardOptions, setShowBoardOptions] = React.useState(null);[m
   const [showSpriteSelection, setShowSpriteSelection] = React.useState(null);[m
   const [mapPrev, setMapPrev] = React.useState(null);[m
[36m@@ -70,24 +70,8 @@[m [mexport default function Home() {[m
         setShowBoardOptions(false);[m
       }}[m
     >[m
[31m-      <Text as="em" color="white" mb="1vh">[m
[31m-        Adjust the size of each square[m
[31m-      </Text>[m
[31m-[m
[31m-      <Slider[m
[31m-        bg="blue.100"[m
[31m-        defaultValue={40}[m
[31m-        min={10}[m
[31m-        max={100}[m
[31m-        step={10}[m
[31m-        onChange={(value) => setSquareSize(value)}[m
[31m-      >[m
[31m-        <SliderTrack />[m
[31m-        <SliderFilledTrack />[m
[31m-        <SliderThumb />[m
[31m-      </Slider>[m
       <Text as="em" color="white" mt="1vh">[m
[31m-        Adjust the size of the board based on number of squares[m
[32m+[m[32m        Adjust the map size[m
       </Text>[m
 [m
       <Flex justify="space-around" width="100%">[m
