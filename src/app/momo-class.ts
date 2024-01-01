import momoImgSrc from "../assets/images/momo.png";

export class Momo {
  private momo: HTMLImageElement;
  private xPos: number;
  private yPos: number;
  private eastbound: boolean;

  constructor() {
    this.momo = new Image();
    this.momo.src = momoImgSrc;
    this.xPos = 0;
    this.yPos = 285;
    this.eastbound = true;
  }

  public resetXPosition(): void {
    this.eastbound = true;
    this.xPos = 0;
  }

  public flipAdvancingDirection() {
    if (this.eastbound) {
      this.eastbound = false;
    } else {
      this.eastbound = true;
    }
  }

  public isEastbound(): boolean {
    return this.eastbound;
  }

  // advanceByDeltaX could be negative or positive
  public setXPos(advanceByDeltaX: number) {
    this.xPos = this.xPos + advanceByDeltaX;
  }

  // advanceByDeltaY could be negative or positive
  public setYPos(advanceByDeltaY: number) {
    this.yPos = this.yPos + advanceByDeltaY;
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
