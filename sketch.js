let player;
let pressedKeys = {};
let debugMode = false;
let bedroom, tyro, beanbag, shelf, bed, closet, toybox, table, pile, speechbox, tyrospeechbox, pixel, mono, tyroBack, tyroFront, tyroLeft, tyroRight
let monoFont = false;

function preload() {
  pixel = loadFont("PixelifySans-VariableFont_wght.ttf");
  mono = loadFont("SyneMono-Regular.ttf");
}

function setup() {
  createCanvas(600, 600);
  colorMode(RGB);

  //props
  bedroom = loadImage("tyros_room_floor_and_wall.png");
  tyro = loadImage("tyro_front.png");
  tyroFront = loadImage("tyro_front.png")
  tyroBack = loadImage ("tyro_back.png")
  tyroLeft = loadImage("tyro_left.png")
  tyroRight = loadImage("tyro_right.png")
  beanbag = loadImage("tyro_beanbag.png");
  shelf = loadImage("tyro_shelf.png");
  bed = loadImage("tyro_bed.png");
  closet = loadImage("tyro_closet.png");
  toybox = loadImage("tyro_toybox.png");
  table = loadImage("tyro_table.png");
  pile = loadImage("tyro_pile.png");
  speechbox = loadImage("speechbox.png");
  tyrospeechbox = loadImage("tyro_speechbox.png");

  //player
  player = new Player(337, 100, 110, 123);
}

function draw() {
  image(bedroom, 0, 0);
  player.update();
  player.draw();

  if (debugMode) {
    debug();
  }
}

function keyPressed() {
  pressedKeys[key] = true;

  if (key == "b") {
    debugMode = !debugMode;
  }

  if (key == "e") {
    player.drawTextBox = !player.drawTextBox;
  }
}

function keyReleased() {
  delete pressedKeys[key];
}



class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xPrev = x;
    this.yPrev = y;
    this.object = "none";
    this.speed = 4;
    this.drawTextBox = false;
  }

  update() {
    let mvmt = createVector(0, 0);

    this.xPrev = this.x;
    this.yPrev = this.y;

    if (pressedKeys.a) {
      mvmt.x -= 1;
      tyro = tyroLeft;
    }
    else if (pressedKeys.d) {
      mvmt.x += 1;
      tyro = tyroRight
    }
    else if (pressedKeys.w) {
      mvmt.y -= 1;
      tyro = tyroBack
    }
    else if (pressedKeys.s) {
      mvmt.y += 1;
      tyro = tyroFront
    }

    mvmt.setMag(this.speed);

    this.x += mvmt.x;
    this.y += mvmt.y;

    this.checkBoundaries();
  }

  //boudaries
  checkBoundaries() {
    if (this.x > width - 112) {
      this.x = width - 112;
    } else if (this.x < 2) {
      this.x = 2;
    } else if (this.y < 50) {
      this.y = 50;
    } else if (this.y > height - 115) {
      this.y = height - 115;
    } else {
      // this.currentText = ""
    }

    fill(133, 204, 255);
    stroke(24, 69, 148);
    strokeWeight(7);
    
    // pile boundary check
    if (this.x < 130 && this.y < 125) {
      monoFont = false;
      this.currentText = "my snack pile.";

      // if player was moving in x direction
      if (this.x != this.xPrev) {
        this.x = 130;
        //console.log("pile x was hit")
      }
      if (this.y != this.yPrev) {
        this.y = 125;
        //console.log("pile y was hit")
      }
    }
    // tent boundary check
    if (this.x > 340 && this.y < 260) {
      monoFont = false;
      this.currentText = "My cave...aka my bed";
      if (this.x != this.xPrev) {
        this.x = 340;
      }
      if (this.y != this.yPrev) {
        this.y = 260;
      }
    }

    //beanbag boundary check
    if (this.x > 340 && this.y > 330) {
      monoFont = false;
      this.currentText = "Very comfy";
      if (this.x != this.xPrev) {
        this.x = 340;
      }
      if (this.y != this.yPrev) {
        this.y = 330;
      }
    }

    //table boundary check
    if (this.x < 325 && this.y > 129 && this.x > 100 && this.y < 365) {
      monoFont = false;
      this.currentText =
        "My friend visited a while ago and didn't clean up after themselves...rude.";
      if (this.x != this.xPrev) {
        if (this.x < 320) {
          this.x = 100;
        } else {
          this.x = 325;
        }
      }
      if (this.y != this.yPrev) {
        if (this.y < 360) {
          this.y = 129;
        } else {
          this.y = 365;
        }
      }
    }

    //toybox boundary check
    if (this.x < 70 && this.y < 380 && this.y > 190) {
      monoFont = false;
      this.currentText =
        "I mostly have tools to make snacks in here. I don't really play with toys other than this red ball.";
      if (this.x != this.xPrev) {
        this.x = 70;
      }
      if (this.y != this.yPrev) {
        if (this.y < 374) {
          this.y = 190;
        } else {
          this.y = 380;
        }
      }
      // if (this.y != this.yPrev) {
      //   this.y = 190;
      // }
    }  
    //closet boundary check
    if (this.y < 65 && this.x < 290) {
      monoFont = false;
      this.currentText =
        "...I don't think it's a good idea to look in there right now..";
      if (this.y != this.yPrev) {
        this.y = 65;
      }
      if (this.x != this.xPrev) {
        this.x = 290;
      }
      monoFont = true
    }
    
    
    //shelf boundary check
    if (this.y > 440) {
      monoFont = false;
      this.currentText = "My friends.";
      if (this.y != this.yPrev) {
        this.y = 440;
      }
    }
  }

  draw() {
    image(beanbag, 413, 440);
    image(closet, 60, 20);
    image(pile, 0, 65);
    image(bed, 430, 50);
    image(toybox, 0, 300);
    image(table, 170, 240);
    image(tyro, this.x, this.y);
    image(shelf, 35, 465);

    if (this.drawTextBox) {
      image(tyrospeechbox, 0, 390);
      
      
      textSize(26);
      textAlign(LEFT, CENTER)
      
      textFont(pixel);
      
      if(monoFont) {
        textFont(mono);
      }
      text(this.currentText, 180, 390, width-220, 240);
    }
  }
}

function debug() {
  let stepSize = 20;
  fill(0)
  textSize(10);
  strokeWeight(1);
  for (let y = 0; y < height; y += stepSize) {
  stroke(0);
  line(0, y, width, y);
  noStroke();
  text(y, 0, y);
  for (let x = 0; x < width; x += stepSize) {
  stroke(0);
  line(x, 0, x, height);
  noStroke();
  text(x, x, stepSize / 2);
  }
  }
  push();
  textSize(20);
  fill(255);
  stroke(0);
  text(`${player.x}, ${player.y}`, player.x, player.y);
  pop();
  //player.currentText = "I mostly have tools to make snacks in here. I don't really play with toys other than this red ball."
}
