var player;
var bullets = [];

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  player = new Player();
  enemy = new Enemy();
}

function draw() {
  background(51);
  player.update();
  enemy.update();
  for(var i = bullets.length - 1; i >= 0; i--){
    bullets[i].update();
  }
}

function Player(){
  this.d = 50;
  this.s = 5;
  this.a = 0;
  
  this.canShoot = true;
  this.fireRate = 1;
  this.nextShot = 0;
  
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0, 0);
  
  this.shoot = function(){
    if(this.canShoot){
      this.nextShot = frameCount + (this.fireRate * 60);
      this.canShoot = false;
      bullets.push(new Bullet());
      console.log("shoot" + bullets.length);
    }
  }
  
  this.update = function(){
    //Set the Player's Angle
    this.a = atan2((mouseY - this.pos.y), (mouseX - this.pos.x)) - (PI / 2);
    //Set the Velocity Vector Back to Zero
    this.vel = createVector(0, 0);
    //Detect Which Keys are Being Pressed
    if(keyIsDown(65))
      this.vel.x -= 1;
    if(keyIsDown(68))
      this.vel.x += 1;
    if(keyIsDown(87))
      this.vel.y -= 1;
    if(keyIsDown(83))
      this.vel.y += 1;
    if(mouseIsPressed && mouseButton == LEFT)
      this.shoot();
    if(frameCount >= this.nextShot)
      this.canShoot = true;
    //Normalize the Velocity Vector
    this.vel.normalize();
    //Add the Velocity Vector Multiplied by the Speed to the Position Vector
    this.pos.add(p5.Vector.mult(this.vel, this.s));
    //Draw the Player's Character
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    //Draw the Player's Gun (Black-Rectangle);
    noStroke();
    fill(0);
    rect((this.d / 2) - 10, 0, 10, 40);
    //Draw the Player (White-Ellipse)
    noStroke();
    fill(255);
    ellipse(0, 0, this.d);
    //Draw Laser Sight
    strokeWeight(1);
    stroke(255, 0, 0);
    line((this.d / 2) - 5, 40, (this.d / 2) - 5, 200);
    pop();
  }
}

function Bullet(){
  this.s = 7;
  this.d = 5;
  this.a = player.a;
  
  this.pos = createVector(player.pos.x, player.pos.y);
  this.vel = createVector(1, 0).rotate(this.a + (PI / 2));
  
  this.update = function(){
    this.pos.add(p5.Vector.mult(this.vel, this.s));
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    noStroke();
    fill(255);
    ellipse((player.d / 2) - 5, 40, this.d);
    pop();
  }
}

function Enemy(){
  this.d = 50;
  this.s = 1;
  this.a = 0;
  
  this.pos = createVector(0, 0);
  this.vel = createVector(0, 0);
  
  this.update = function(){
    //Get Enemy Angle
    this.a = atan2(this.pos.y - player.pos.y, this.pos.x - player.pos.x) + (PI / 2);
    //Determine Where the Enemy is Walking to
    this.vel = p5.Vector.sub(player.pos, this.pos).normalize();
    //Move the Enemy Towards the Player
    this.pos.add(p5.Vector.mult(this.vel, this.s));
    //Draw the Enemy's Character
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    //Draw the Enemy's Arms (Black-Rectangle);
    noStroke();
    fill(0);
    rect((this.d / 2) - 10, 0, 10, 40);
    rect(-(this.d / 2), 0, 10, 40);
    //Draw the Enemy (Green-Ellipse)
    noStroke();
    fill(0, 255, 0);
    ellipse(0, 0, this.d);
    pop();
  }
}