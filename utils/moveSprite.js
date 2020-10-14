

export const moveSprite = (SpriteArray, Key) => {
  const spriteArray = SpriteArray;
  const key = Key;
  const xAxis = spriteArray.size[0];
  const yAxis = spriteArray.size[1];
  const difference = Math.abs(xAxis - yAxis);
  const smallerNumber = Math.min(xAxis, yAxis);
  let xTranslate;
  let yTranslate;
  if (key === "I" || key === "i") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = 180;
      yTranslate = (100 * (yAxis - 1)) / yAxis;
      xTranslate = (100 * (xAxis - 1)) / xAxis;
    } else {
      spriteArray.rotation = 90;
      yTranslate = (50 * difference + 100 * (yAxis - 1)) / yAxis;
      xTranslate = -(50 * difference + 100 * (yAxis - 1)) / xAxis;
    }

    spriteArray.translation = [xTranslate, yTranslate];
  } else if (key === "K" || key === "k") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = 0;
      yTranslate = 0;
      xTranslate = 0;
    } else {
      spriteArray.rotation = -90;
      yTranslate = -(50 * difference) / yAxis;
      xTranslate = -50 + (50 * yAxis) / xAxis;
    }

    spriteArray.translation = [xTranslate, yTranslate];
  } else if (key === "J" || key === "j") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = 90;
      yTranslate = (50 * difference + 100 * (xAxis - 1)) / yAxis;
      xTranslate = -(50 * difference + 100 * (xAxis - 1)) / xAxis;
    } else {
      spriteArray.rotation = 180;
      yTranslate = (100 * (yAxis - 1)) / yAxis;
      xTranslate = (100 * (xAxis - 1)) / xAxis;
    }

    spriteArray.translation = [xTranslate, yTranslate];
  } else if (key === "L" || key === "l") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = -90;
      yTranslate = (50 * difference) / yAxis;
      xTranslate = (50 * difference + 100 * (xAxis - 1)) / xAxis;
    } else {
      spriteArray.rotation = 0;
      xTranslate = 0;
      yTranslate = 0;
    }
    spriteArray.translation = [xTranslate, yTranslate];
  } else if (key === "a" || key === "A") {
    switch (spriteArray.rotation) {
      case 0:
        spriteArray.ofSet = [1, 0];
        break;
      case 90:
        spriteArray.ofSet = [0, -1];
        break;
      case -90:
        spriteArray.ofSet = [0, 1];
        break;
      case 180:
        spriteArray.ofSet = [-1, 0];
        break;
    }
  } else if (key === "d" || key === "D") {
    switch (spriteArray.rotation) {
      case 0:
        spriteArray.ofSet = [-1, 0];
        break;
      case 90:
        spriteArray.ofSet = [0, 1];
        break;
      case -90:
        spriteArray.ofSet = [0, -1];
        break;
      case 180:
        spriteArray.ofSet = [1, 0];
        break;
    }
  } else if (key === "s" || key === "S") {
    switch (spriteArray.rotation) {
      case 0:
        spriteArray.ofSet = [0, -1];
        break;
      case 90:
        spriteArray.ofSet = [-1, 0];
        break;
      case -90:
        spriteArray.ofSet = [1, 0];
        break;
      case 180:
        spriteArray.ofSet = [0, 1];
        break;
    }
  } else if (key === "w" || key === "W") {
    switch (spriteArray.rotation) {
      case 0:
        spriteArray.ofSet = [0, 1];
        break;
      case 90:
        spriteArray.ofSet = [1, 0];
        break;
      case -90:
        spriteArray.ofSet = [-1, 0];
        break;
      case 180:
        spriteArray.ofSet = [0, -1];
        break;
    }
  } else {
    return false;
  }
  return spriteArray;
};
