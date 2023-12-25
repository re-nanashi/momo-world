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
  const rightEdgeOfTheCanvas = 1280 - 150;
  const leftEdgeOfTheCanvas = 0;
  const speed = 5; // any divisor of the value of the rightEdgeOfTheCanvas
  let currentXPos = state.getXpos();

  if (state.advancingToEast()) {
    if (currentXPos >= rightEdgeOfTheCanvas) {
      state.flipAdvancingDirection();
    } else {
      state.setXPos(speed);
    }
  } else {
    if (currentXPos <= leftEdgeOfTheCanvas) {
      state.flipAdvancingDirection();
    } else {
      state.setXPos(-speed);
    }
  }
}
