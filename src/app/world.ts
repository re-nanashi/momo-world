import { Momo } from "./momo-class";

// Declare canvas, context variables
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

// Instantiate momo
let momo = new Momo();

export function world() {
  canvas = <HTMLCanvasElement>document.getElementById("world-canvas");
  context = canvas.getContext("2d");

  // Start the first frame request
  window.requestAnimationFrame(worldLoop);
}

function worldLoop() {
  render(momo);
  updater(momo);
  keyHandler(momo);

  // Keep requesting new frames
  window.requestAnimationFrame(worldLoop);
}

function render(state: Momo) {
  let momoCurrentXPos = state.getXpos();
  let momoCurrentYPos = state.getYpos();

  const momoImageObject = state.getImageObj();

  // Clear previous canvas
  context.clearRect(0, 0, 1280, 720);

  // Renders background
  context.rect(0, 0, 1280, 720);
  context.fillStyle = "white";
  context.fill();

  // Draws the Momo object to the canvas
  context.drawImage(momoImageObject, momoCurrentXPos, momoCurrentYPos);
}

function updater(state: Momo): void {
  const RIGHT_EDGE_OF_THE_CANVAS = 1280 - 150;
  const LEFT_EDGE_OF_THE_CANVAS = 0;
  const SPEED = 5; // any divisor of the value of the rightEdgeOfTheCanvas
  let currentXPos = state.getXpos();

  if (state.isEastbound()) {
    if (currentXPos >= RIGHT_EDGE_OF_THE_CANVAS) {
      state.flipAdvancingDirection();
    } else {
      state.setXPos(SPEED);
    }
  } else {
    if (currentXPos <= LEFT_EDGE_OF_THE_CANVAS) {
      state.flipAdvancingDirection();
    } else {
      state.setXPos(-SPEED);
    }
  }
}

function keyHandler(state: Momo) {
  document.addEventListener(
    "keydown",
    (event) => {
      var name = event.key;
      if (name === " ") {
        // Reset the image object position
        state.resetXPosition();
        return;
      }
    },
    false
  );
}
