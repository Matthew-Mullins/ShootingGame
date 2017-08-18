var player;
var bullets = [];

function setup() {
  createCanvas(600, 600);
  frameRate(60);            //Set Frame Rate to 60
  player = new Player();    //Create Player Character
  enemy = new Enemy();      //Create Test Enemy
}

function draw() {
  background(51);
  player.update();          //Update Player Information
  enemy.update();           //Update Enemy Information
  
  //Update Bullet Information
  for(var i = bullets.length - 1; i >= 0; i--){
    bullets[i].update();
    if(bullets[i].hits(enemy)){
      enemy.h -= 10;
      bullets.splice(i, 1);
    } else if(bullets[i].pos.x < 0 || bullets[i].pos.x > width || bullets[i].pos.y < 0 || bullets[i].pos.y > height){
      //Check if Bullets are Still On Screen 
      bullets.splice(i, 1);
    }
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
  
  //Players Shoot Function
  this.shoot = function(){
    //Check if Player Can Shoot
    if(this.canShoot){
      //If Can Shoot then Get Next Shot Time
      this.nextShot = frameCount + (this.fireRate * 60);
      
      //Set it so Player Cannot Shoot
      this.canShoot = false;
      
      //Create a new Bullet to Shoot
      bullets.push(new Bullet());
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
      
    //Detect When the LEFT Mouse Button is Pressed and Attempt to Shoot
    if(mouseIsPressed && mouseButton == LEFT){
      this.shoot();
    }
    if(frameCount >= this.nextShot)
      this.canShoot = true;
      
    //Normalize the Velocity Vector
    this.vel.normalize();
    
    //Add the Velocity Vector Multiplied by the Speed to the Position Vector
    this.pos.add(p5.Vector.mult(this.vel, this.s));
    
    //Constrain the Player Position
    this.pos.x = constrain(this.pos.x, (this.d / 2), width - (this.d / 2));
    this.pos.y = constrain(this.pos.y, (this.d / 2), height - (this.d / 2));
    
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
  this.a = player.a + (PI / 2);
  
  this.pos = createVector(player.pos.x + (sqrt(2000) * sin(atan(2) + this.a)), player.pos.y - (sqrt(2000) * cos(atan(2) + this.a)));
  this.vel = createVector(1, 0).rotate(this.a);
  
  this.hits = function(enemy_){
    if(p5.Vector.sub(this.pos, enemy_.pos).mag() <= ((this.d / 2) + (enemy_.d / 2))){
      return true;
    } else {
      return false;
    }
  }
  
  this.update = function(){
    //Move the Bullet
    this.pos.add(p5.Vector.mult(this.vel, this.s));
    
    //Draw the Bullet
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.d);
  }
}

function Enemy(){
  this.d = 50;
  this.s = 1;
  this.a = 0;
  
  this.h = 100;
  
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
    fill(0, 100, 0);
    ellipse(0, 0, this.d);
    pop();
    
    noStroke();
    fill(0);
    rect(this.pos.x - (this.h / 2), this.pos.y - 55, this.h, 4);
  }
}