// type Coordinates={
// Width:number;
// Heigth:number;
// currentCoordinates:Array<number>;

// }

export const shadowedSquaresCoordinates = (Width, Heigth, OldCoordinates) => {
  console.log(Width);
  const spriteWidth = Width;
  const spriteHeigth = Heigth;
  const coordinates = OldCoordinates;
  let xCoordinates = [];
  let yCoordinates = [];
  let coordinatesToChange = [];
  let j = 0;
  for (let m = 0; m < spriteHeigth; m += 1) {
    for (let i = 0; i < spriteWidth; i += 1) {
      yCoordinates.push(m + coordinates[0]);
    }
  }
  for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
    if (j === spriteWidth) {
      j = 0;
    }

    xCoordinates.push(j + coordinates[1]);
    j += 1;
  }

  for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
    coordinatesToChange.push([xCoordinates[i], yCoordinates[i]]);
  }

  return coordinatesToChange;
};
