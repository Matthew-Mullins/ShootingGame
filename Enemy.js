function Enemy(){
  //Movement
  this.moveSpeed = 4;
  this.angle = 0;
  this.w = 50;
  this.h = 50;
  this.pos = createVector(0, 0);
  this.vel = createVector(0, 0);
  
  //Other Stats
  this.healthTotal = 100;
  this.currentHealth = 100;
  
  //Deal Damage Equal to Projectile's Damage
  this.dealDamage = function(projectile_){
    this.currentHealth -= projectile_.damage;
  }
  
  this.moveEnemy = function(){
    //Get Player Angle
    this.angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
    //Get Velocity
    this.vel = p5.Vector.sub(player.pos, this.pos).normalize();
    //Move Enemy
    this.pos.add(p5.Vector.mult(this.vel, this.moveSpeed));
  }
  
  this.update = function(){
    //Move Enemy
    this.moveEnemy();
    
    //If Dead, Destroy
    if(this.currentHealth <= 0){
      enemies.splice(enemies.indexOf(this), 1);
    }
  }
  
  this.render = function(){
    //Draw Arms
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(0);
    rect(0, -25, 40, 10);
    rect(0, 15, 40, 10);
    //Draw Enemy Body
    fill(0, 77, 0);
    ellipse(0, 0, this.w, this.h);
    pop();
    //Draw Enemy Health Number
    stroke(255);
    textSize(24);
    text(this.currentHealth, this.pos.x - 22, this.pos.y + 8);
  }
}