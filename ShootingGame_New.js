var player;
var enemies = [];
var projectiles = [];

function setup() {
  createCanvas(1600, 900);
  frameRate(60);
  
  player = new Player();
}

function draw() {
  background(51);
  
  //Draw Scene
  player.render();
  for(var i = projectiles.length - 1; i >= 0; i--){
    projectiles[i].render();
  }
  for(var i = enemies.length - 1; i >= 0; i--){
    enemies[i].render();
  }
  
  //Game Logic Updates
  player.update();
  for(var i = projectiles.length - 1; i >= 0; i--){
    projectiles[i].update();
  }
  for(var i = enemies.length - 1; i >= 0; i--){
    enemies[i].update();
  }
  
  //For Each Projectile, Check if Colliding With Any Enemy
  for(var i = projectiles.length - 1; i >= 0; i--){
    for(var j = enemies.length - 1; j >= 0; j--){
      if(projectiles[i].hit(enemies[j])){
        enemies[j].dealDamage(projectiles[i]);
        projectiles.splice(i, 1);
        break;
      }
    }
  }
}