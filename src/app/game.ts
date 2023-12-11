import momoImgSrc from "../assets/images/momo.png";

// has ViewModel that renders the game state to the screen
// has GameLogic that "advances" the GameState
class World {
  private state: any;
  private stateUpdater: Function;
  private stateRenderer: Function;

  constructor(state: any, updaterFunc: Function, rendererFunc: Function) {
    this.state = state;
    this.stateUpdater = updaterFunc;
    this.stateRenderer = rendererFunc;

    window.onload = this.initializeWorld;
  }

  private initializeWorld() {
    window.requestAnimationFrame(this.worldLoop);
  }

  private worldLoop() {
    this.update();
    this.render();
  }

  private update(): void {
    this.stateUpdater(this.state);
  }

  private render(): void {
    let currentState = this.state.getCurrentState();
    this.stateRenderer(currentState);
  }
}

export class Momo {
  private momo: HTMLImageElement;
  private xPos: number;
  private yPos: number;

  constructor() {
    this.momo = new Image();
    this.momo.src = momoImgSrc;
    this.xPos = 0;
    this.yPos = 285;
  }

  public setXPos(deltaX: number) {
    this.xPos = this.xPos + deltaX;
  }
  public setYPos(deltaY: number) {
    this.yPos = this.yPos + deltaY;
  }

  public getXpos(): number {
    return this.xPos;
  }

  public getYpos(): number {
    return this.yPos;
  }

  public getImageObj(): HTMLImageElement {
    return this.momo;
  }
}

export function renderer(state: Momo) {
  const world = <HTMLCanvasElement>document.getElementById("world-canvas");
  const ctx = world.getContext("2d");

  ctx.rect(0, 0, 1280, 720);
  ctx.fillStyle = "white";
  ctx.fill();

  let momoCurrentXPos = state.getXpos();
  let momoCurrentYPos = state.getYpos();

  const momoImageObject = state.getImageObj();

  momoImageObject.onload = () => {
    ctx.drawImage(momoImageObject, momoCurrentXPos, momoCurrentYPos);
  };
}
