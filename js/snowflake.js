class Snowflake {
  constructor(lowX, highX, lowY, highY, lowR, highR) {
    //Properties
    this.x = randomInt(lowX, highX);
    this.y = randomInt(lowY, highY);
    this.r = randomInt(lowR, highR);
    this.color = "white";
    this.speed = randomInt(5, 15);
  }

  //Methods (function/Behavior)
  fallDown(lowX, highX) {
    this.y += this.speed;
    if (this.y >= cnv.height) {
      this.x = randomInt(lowX, highX);
      this.y = 0;
    }
  }
}
