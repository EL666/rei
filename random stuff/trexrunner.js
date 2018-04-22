
var y = 200;
var c = random(50,200);
var obstS = 4;
var up = 0;
var feetx1 = 0;
var feetx2 = 0;
var ones = 1;
var startTimer = 0;
var num = 0;
var lose = false;
var tens = 0;
var hundreds = 0;
var thousands = 0;
var score1 = 0;
var time = millis();
var counter = 0;
var timer = millis();
var obstacleCheck = true;
var resetTime = true;
var test = false;
var jumpSpeed = 5;
var jumpHeight = 17;
var gravity = 0;
var counter2 = 0;
var counter3 = 0;
var obstacles = [];
var dirts =[];
var highscore = 1;
var newHighscore = 0;
var ground = {
  x: 0,
  y:350,
  w:1000,
  h:60
};
var player = {
  x: 100,
  y: 300,
  w: 40,
  h: 40
};
class Obstacle{
  constructor(x,y,w,h,spd){
    this.x = x;
    this.y = ground.y-h;
    this.w = w;
    this.h = h;
    this.spd = spd;
  }
  drawSelf(){
    rect(this.x,this.y,this.w,this.h);
  }
  move(){
    this.x = this.x - this.spd;

  }
}

class Dirt{
  constructor(x,y,w,h,spd){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.spd = spd;
  }
  drawSelf(){
    rect(this.x,this.y,this.w,this.h);
  }
  move(){
    this.x = this.x - this.spd;
  }
}
function setup(){
  createCanvas(1000,400);
}
function draw(){
  
  time = millis();

background(200,200,200);
  fill(0,0,0);
    if(lose === false){
      score1 = ones+(tens*10)+(hundreds*100)+(thousands*1000);
      
      drawGround();
      movePlayer();


      score();
      obstacleSpawn();
      if(counter2 >= 10){
        pushDirt();
        counter2 = 0;
      }
        if(placeFree(player.x,player.y + 1)===false) {
          test = false;
          gravity = 0;
        }
      obstacles.forEach(function(o,index){
        o.drawSelf();
        o.move();
          if(o.x<=0){
            obstacles.splice(index,index+1);
          }
        }
      );
      dirts.forEach(function(d,index){
        d.drawSelf();
        d.move();
          if(d.x<=0){
            dirts.splice(index,index+1);
          }

        }
      );
      for(var j = 0; j < obstacles.length;j++){
        if(collision(player,obstacles[j])){
          
          lose = true;
        }
      }
      fill(200,200,200)
    drawPlayer();
    counter++;
    counter2++;
    counter3++;
    }else{
      textAlign(CENTER,CENTER);
      textSize(50);
      var finalScore = ones + tens*10 + hundreds*100+ thousands*1000;
      text("Score:",400,300);
      text(finalScore,550,300);
      text("Highscore:",400,200);
      text(highscore,575,200);
      if(finalScore > highscore){
        highscore = finalScore;
      }

    }
};

function mouseClicked(){
  if(mouseX > 0&& mouseX< 1000 && mouseY > 0 && mouseY < 400 && lose === true){
    lose = false;
    resetTime = true;
    ones = 1;
    tens = 0; 
    hundreds = 0;
    counter = 0;
    counter2 = 0;
    counter3 = 0;
    obsS = 4;
    player.y = 300;
    obstacles = [];
    dirt = [];
  }
};

function pushObstacle(){
  obstacles.push(new Obstacle(1000,300,random(25,75),random(25,80),obstS));
};

function pushDirt(){
  dirts.push(new Dirt(1000,random(350,400),random(1,5),random(1,5),obstS));
};


function drawPlayer(){
  if(counter3 === 8){
    feetx2+=5;
    feetx1-=5;
  }
  if(counter3 === 12){
    feetx2-=5;
    counter3 = 0;
  }
  if(counter3 === 4){
    feetx1+=5;
  }
  rect(player.x+7,player.y+player.h-feetx1,5,15);
  rect(player.x+player.w-13,player.y+player.h-feetx2,5,15);
  rect(player.x,player.y,player.w, player.h);
};

function obstacleSpawn(){

  var z = 50;
  var x = 200;
  if(score1 == 100){
    c = 250;
  }
  if(score1>= 100&& score1<250){
    x = 150;
    z = 45;
    obstS = 5;
  }
  if(score1 == 250){
    c = 250;
  }
  if(score1>=250&&score1<500){
    obstS = 6;
    x = 100;
    z = 40;
  }
  if(score1 == 500){
    c = 250;
  }
  if(score1 >= 500&&score1<1000){
    obstS = 7;
    x = 50;
    z = 25;
  }
  if(score1>= 1000){
    obstS = 8;
  }
  if(counter >= c){
    pushObstacle();
    counter = 0;
    c = random(z,x);
  }
};

function playerJump(){
  for(var i = jumpSpeed; i > 0; i--){
    if(placeFree(player.x,player.y - i)){
      player.y -= i;
      break;
    }
  } 
  if(jumpSpeed > 0){
    jumpSpeed--;
  }
  if(!up) {
    jumpSpeed = 0;
  }
};

function playerFall() {
  if(placeFree(player.x,player.y + 1)===false) {
    gravity = 0;
  }else{
    gravity = gravity + 0.1;
  }

  for(var i = gravity; i > 0; i--) {
    if(placeFree(player.x, player.y + i)) {
      player.y += i;
      break;
    }
  }
};

function collision(r1, r2) {
  if (r1.x + r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h) {
        return true;
  }else{
    return false;
  }
};
function placeFree(xNew, yNew) {
  var temp = {x: xNew,
              y: yNew,
              w: player.w,
              h: player.h};
  if(collision(temp,ground)) {
    return false;
  }
    return true;
};

function movePlayer() {
  if(up == 1&& !(placeFree(player.x,player.y + 1))) {
    jumpSpeed = jumpHeight;
  }
  if(jumpSpeed > 0) {
    playerJump();
  }else if(jumpSpeed <= 0) 
    playerFall();
};

function keyPressed(){
  if(keyCode == 32){
    up = 1;
  }
};

function keyReleased(){
  if(keyCode == 32){
    up = 0;
  }
};

function drawGround(){
  fill(200,200,200);
  rect(ground.x,ground.y,ground.w,ground.h);
};

function score(){
  fill(0,0,0);
  textSize(30);
  if(resetTime === true){
  startTimer = time;
  resetTime = false;
  }
  num = Math.floor(((time - startTimer)/100000)*1000)+1;
  ones = num%10;
  var repOnes = num%10;
    if(ones >= 9){
      tens = Math.floor((num%100)/10);
      if(tens < 9){
        tens = tens +1;
      }else{
        tens = tens - 9;
      }
    }
    if(tens<=0&&ones<=0){
      hundreds = Math.floor((num%1000)/100);
    }
    if(hundreds<=0&&tens<=0&&ones<=0){
      thousands = Math.floor((num%10000)/1000);
    }
  text(ones,975,30);
  text(tens,955,30);
  text(hundreds,935,30);
  text(thousands,915,30);
};