function Projectile(){
  //Movement
  this.travelSpeed = 10;
  this.angle = player.angle;
  this.w = 5;
  this.h = 5;
  this.tempX = player.pos.x;
  this.tempY = player.pos.y;
  this.pos = createVector(this.tempX + (sqrt(2000) * -sin(this.angle - atan(2))), this.tempY + (sqrt(2000) * cos(this.angle - atan(2))));
  this.vel = createVector(1, 0).rotate(this.angle);
  
  //Other Stats
  this.damage = 10;

  //Detects a Collision Between Projectile and Enemy
  this.hit = function(enemy_){
    if(p5.Vector.sub(this.pos, enemy_.pos).mag() <= ((this.w / 2) + (enemy_.w / 2))){
      return true;
    } else {
      return false;
    }
  }
  
  this.update = function(){
    //Move the Bullet
    this.pos.add(p5.Vector.mult(this.vel, this.travelSpeed));
    
    //Despawn Projectiles Outside Screen
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height){
      projectiles.splice(projectiles.indexOf(this), 1);
    }
  }
  
  this.render = function(){
    //Draw the Projectile
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.w, this.h);
  }
}