// type Coordinates={
// Width:number;
// Heigth:number;
// currentCoordinates:Array<number>;

// }

export const shadowedSquaresCoordinates = (
  Width,
  Heigth,
  OldCoordinates,
  Rotation
) => {
  const rotation = Rotation;

  const spriteWidth = Width;
  const spriteHeigth = Heigth;
  const coordinates = OldCoordinates;
  let xCoordinates = [];
  let yCoordinates = [];
  let coordinatesToChange = [];
  let j = 0;

  switch (rotation) {
    case 0:
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
      break;
    case -90:
      for (let m = 0; m < spriteWidth; m += 1) {
        for (let i = 0; i < spriteHeigth; i += 1) {
          if (spriteWidth > spriteHeigth) {
            xCoordinates.push(coordinates[0] + m);
          } else {
            xCoordinates.push(coordinates[0] - m);
          }
        }
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        if (j === spriteHeigth) {
          j = 0;
        }

        yCoordinates.push(coordinates[1] + j);
        j += 1;
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        coordinatesToChange.push([yCoordinates[i], xCoordinates[i]]);
      }

      break;
    case 90:
      for (let m = 0; m < spriteWidth; m += 1) {
        for (let i = 0; i < spriteHeigth; i += 1) {
          xCoordinates.push(coordinates[0] - m);
        }
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        if (j === spriteHeigth) {
          j = 0;
        }

        yCoordinates.push(coordinates[1] - j);
        j += 1;
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        coordinatesToChange.push([yCoordinates[i], xCoordinates[i]]);
      }

      break;
    case 180:
      for (let m = 0; m < spriteHeigth; m += 1) {
        for (let i = 0; i < spriteWidth; i += 1) {
          yCoordinates.push(coordinates[0] - m);
        }
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        if (j === spriteWidth) {
          j = 0;
        }

        xCoordinates.push(coordinates[1] - j);
        j += 1;
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        coordinatesToChange.push([xCoordinates[i], yCoordinates[i]]);
      }

      break;
  }
  return coordinatesToChange;
};
