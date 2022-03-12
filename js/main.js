//Bubble Objects (Associative Arrays - property:value pairs)
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 650;

//CREATE ARRAY
let snowflakes = createSnowflakesArray(10);

function createSnowflakesArray(initTotal) {
  let temp = [];
  for (let i = 0; i < initTotal; i++) {
    temp.push(new Snowflake(0, cnv.width, -100, 101, 5, 11));
  }
  return temp;
}

//Draw Function
function drawSnowflake(aSnowflake) {
  circle(aSnowflake.x, aSnowflake.y, aSnowflake.r, "fill", aSnowflake.color);
}

//ANIMATION LOOP
requestAnimationFrame(animate);

function animate() {
  //Background
  background("#00001c");

  //Draw Snowflakes
  for (let i = 0; i < snowflakes.length; i++) {
    drawSnowflake(snowflakes[i]);
    snowflakes[i].fallDown(0, cnv.width);
  }

  requestAnimationFrame(animate);
}

//CATCH SNOWFLAKES
document.addEventListener("mousemove", mouseMoveHandler);

//Collision Detection
function mouseMoveHandler(event) {
  let rect = cnv.getBoundingClientRect();
  posX = event.clientX - rect.left;
  posY = event.clientY - rect.top;
  collisionDetection();
}

function collisionDetection() {
  for (let i = 0; i < snowflakes.length; i++) {
    if (
      posX <= snowflakes[i].x + snowflakes[i].r &&
      posX >= snowflakes[i].x - snowflakes[i].r &&
      posY <= snowflakes[i].y + snowflakes[i].r &&
      posY >= snowflakes[i].y - snowflakes[i].r
    ) {
      snowflakes.splice(i, 1);
      outputLength();
    }
  }
}

//ADD/REMOVE SNOWFLAKES
document.addEventListener("wheel", mouseWheelHandler);
document.addEventListener("keydown", keyDownHandler);

//Mouse Wheel
function mouseWheelHandler(event) {
  let wheelY = event.deltaY;
  if (wheelY < 0) {
    snowflakes.push(new Snowflake(0, cnv.width, -100, 101, 5, 11));
    outputLength();
  } else if (wheelY > 0) {
    snowflakes.pop();
    outputLength();
  }
}

//Arrow keys
function keyDownHandler(KeyboardEvent) {
  if (KeyboardEvent.code === "ArrowRight") {
    snowflakes.push(new Snowflake(0, cnv.width, -100, 101, 5, 11));
    outputLength();
  } else if (KeyboardEvent.code === "ArrowLeft") {
    snowflakes.pop();
    outputLength();
  }
}

//DOCUMENT ELEMENTS
let outputField = document.getElementById("length-output");
//Initial Amount
outputLength();

function outputLength() {
  outputField.innerHTML = `Snowflakes: ${snowflakes.length}`;
}
