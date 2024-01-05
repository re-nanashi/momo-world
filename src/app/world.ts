import { Momo } from "./momo-class";

// Declare canvas, context variables
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

abstract class Command {
  abstract execute(actor: Momo): void;
}

class ResetPositionCommand extends Command {
  execute(actor: Momo): void {
    actor.resetXPosition();
  }
}

class FlipDirectionCommand extends Command {
  execute(actor: Momo): void {
    actor.flipAdvancingDirection();
  }
}

type button = string;

class InputHandler {
  readonly BUTTON_SPACE: button = " ";
  readonly BUTTON_F: button = "f";

  private _buttonSpace: Command;
  private _buttonF: Command;

  private _userInput: button = null;

  constructor() {
    document.addEventListener(
      "keydown",
      (event) => {
        let buttonStr = event.key;

        if (buttonStr === this.BUTTON_SPACE) {
          this._userInput = this.BUTTON_SPACE;
        } else if (buttonStr === this.BUTTON_F) {
          this._userInput = this.BUTTON_F;
        } else {
          this._userInput = null;
        }
      },
      false
    );
  }

  public handleUserKeyboardInput(): Command {
    let ret: Command = null;

    if (this._userInput === this.BUTTON_SPACE) ret = this._buttonSpace;
    if (this._userInput === this.BUTTON_F) ret = this._buttonF;

    // Remove previous user input.
    this._userInput = null;

    // Nothing pressed, so do nothing.
    return ret;
  }

  public bindSpaceButton(commandToBind: Command): void {
    this._buttonSpace = commandToBind;
  }

  public bindFButton(commandToBind: Command): void {
    this._buttonF = commandToBind;
  }
}

// Instantiate momo, inputHandler.
let momo = new Momo();
let inputHandler = new InputHandler();

export function world() {
  canvas = <HTMLCanvasElement>document.getElementById("world-canvas");
  context = canvas.getContext("2d");

  // Initialize button events.
  let spaceButtonCommand = new ResetPositionCommand();
  let fButtonCommand = new FlipDirectionCommand();

  // Bind button events.
  inputHandler.bindSpaceButton(spaceButtonCommand);
  inputHandler.bindFButton(fButtonCommand);

  // Start the first frame request.
  window.requestAnimationFrame(worldLoop);
}

function worldLoop() {
  // User Keyboard Input Handling.
  let command: Command = inputHandler.handleUserKeyboardInput();
  if (command) command.execute(momo);

  // Render the object's current state.
  render(momo);

  // Update the object's state.
  updater(momo);

  // Keep requesting new frames.
  window.requestAnimationFrame(worldLoop);
}

function render(state: Momo) {
  let momoCurrentXPos = state.getXpos();
  let momoCurrentYPos = state.getYpos();

  const momoImageObject = state.getImageObj();

  // Clear previous canvas.
  context.clearRect(0, 0, 1280, 720);

  // Render white background.
  context.rect(0, 0, 1280, 720);
  context.fillStyle = "white";
  context.fill();

  // Draws the Momo object to the canvas.
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
