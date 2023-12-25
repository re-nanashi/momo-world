import momoImgSrc from "../assets/images/momo.png";

export class Momo {
  private momo: HTMLImageElement;
  private xPos: number;
  private yPos: number;
  private isAdvancingToEast: boolean;

  constructor() {
    this.momo = new Image();
    this.momo.src = momoImgSrc;
    this.xPos = 0;
    this.yPos = 285;
    this.isAdvancingToEast = true;
  }

  public flipAdvancingDirection() {
    if (this.isAdvancingToEast) {
      this.isAdvancingToEast = false;
    } else {
      this.isAdvancingToEast = true;
    }
  }

  public advancingToEast(): boolean {
    return this.isAdvancingToEast;
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
