function Player(){
  //Movement
  this.moveSpeed = 5;
  this.angle = 0;
  this.w = 50;
  this.h = 50;
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  
  //Shooting
  this.fireRate = 10;
  this.canShoot = true;
  this.nextShot = 0;
  
  this.canSpawn = true;
  
  //Get the Users Input
  this.getInput = function(){
    //Reset Velocity Vector
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
    
    //TESTING SPAWN FOR ENEMIES
    if(keyIsDown(32) && this.canSpawn){
      this.canSpawn = false;
      enemies.push(new Enemy());
      console.log(enemies.length);
    } else if(!keyIsDown(32) && !this.canSpawn){
      this.canSpawn = true;
    }
    //TESTING STUFF
      
    //Check if Mouse Down
    if(mouseIsPressed && mouseButton == LEFT){
      if(this.canShoot){
        this.shoot();
      }
    }
  }
  
  //Move Player
  this.movePlayer = function(){
    //Set Players Heading
    var mousePos = createVector(mouseX, mouseY);
    this.angle = p5.Vector.sub(mousePos, this.pos).heading()
    
    //Add the Velocity Vector Multiplied by the Speed to the Position Vector
    this.pos.add(p5.Vector.mult(this.vel.normalize(), this.moveSpeed));
    
    //Constrain the Player Position
    this.pos.x = constrain(this.pos.x, (this.w / 2), width - (this.w / 2));
    this.pos.y = constrain(this.pos.y, (this.h / 2), height - (this.h / 2));
  }
  
  //Shoot Players Gun
  this.shoot = function(){
    this.canShoot = false;
    this.nextShot = millis() + (1000 / this.fireRate);
    projectiles.push(new Projectile());
  }
  
  this.update = function(){
    //Get User Input
    this.getInput();
    
    //Move Player
    this.movePlayer();
    
    //Check for Next Shot Time
    if(millis() >= this.nextShot){
      this.canShoot = true;
    }
  }
  
  //Draw the Player and Their Gun
  this.render = function(){
    push();
    noStroke();
    //Translate to Origin, Rotate
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    
    //Draw Laser Sight
    stroke(255, 0, 0);
    line(40, 20, 800, 20);
    
    //Draw Black Gun
    noStroke();
    fill(0);
    rect(0, (this.h / 2) - 10, 40, 10);
    
    //Draw White Player
    noStroke();
    fill(255);
    ellipse(0, 0, this.w, this.h);
    
    pop();
  }
}