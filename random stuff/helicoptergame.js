var player = {
  x:150,
  y:250,
  size:50
};
var counterStart = false;
var counter =0;
var walls = [];
var smoke = [];
var gap = {height: 300, y:250};
var propeller = true;
var coins = [];
var shrinkPowers = [];
var wallTimer = 16;
var gravity = 0;
var goUp = false;
var crashed = false;
var mouseCircleSize = 0;
var mouseCircleB = false;
var score = 0;
var coinEffect = [];
var coinEffectSize = 0;
var coinEffectOpacity = 200;

var coinEffect = [];
function setup(){
  setInterval(createSmoke,100);
  setInterval(propellerInterval,100);

};
function draw(){

  createCanvas(500,500);
  background(0,150,0);
  
  if(mouseCircleSize > 0){
    if(mouseCircleB === false){
      mouseCircleSize-=2;
    }
    mouseCircle();
  }
  noStroke();

  if(!crashed){
    
     doSmoke();
  drawPlayer();
    for(var c of coinEffect){
      fill(0,0,0,0);
      strokeWeight(10);
      stroke(255,255,0,c.opacity);
      ellipse(c.x,c.y,c.size,c.size);
      c.size+=5;
      c.opacity -= 5;
      if(c.opacity === 0){
        coinEffect.splice(1,1);
      }
    
    }
    if(counterStart === true){
      counter++;
    }
    
    if(counter > 500){
      player.size = 50;
      counter = 0;
      counterStart = false;
    }
    if(player.size <=0){
      crashed = true;
    }
  noStroke();
  movePlayer();
  doShrinkPower();
   doCoin();
   drawWalls();
    moveWalls();
    drawScore(); 
    
  } else{
    youLoseScreen();
  }
    
};

function drawPlayer(){
  fill(0,0,255);
  noStroke();
  ellipse(player.x,player.y,player.size,player.size-player.size*1/5);
  ellipse(player.x-player.size/2,player.y+player.size/4-5,player.size*4/5,player.size*2/5);
  fill(200,200,200);
  rect(player.x-5,player.y-player.size/2-5,player.size*1/5,player.size*1/10);
  if(propeller === true){
    rect(player.x-player.size+player.size*1/5,player.y-player.size/2-5,player.size*1.5,player.size*1/10);
    propeller = false;
  }
 
};

function movePlayer(){
  if(goUp){
    gravity -= 0.4;
  } else {
 gravity += 0.4; 
  }
  if(gravity > 8){
    gravity = 8;
  }
  if(gravity < -6){
    gravity = -6;
  }
  player.y += gravity;
  if(player.y > 500||player.y<0){
    crashed = true;
  }
};

function mousePressed(){
  if(mouseButton === LEFT){
    goUp = true;
    mouseCircleB = true;
    mouseCircleSize = 75;
    if(crashed){
      crashed = !crashed;
      player.y = 250;
      gravity = 0;
      score = 0;
      coins = [];
      walls = [];
    }
  }
};

function mouseReleased(){
  if(mouseButton === LEFT){
    goUp = false;
    mouseCircleB = false;
    }
};


function youLoseScreen(){
  
  textSize(24);
  fill(0,0,0);
  rect(0,0,500,500);
  fill(255);
  text("Game Over",200,200);
  text("Click to Restart",180,350);
  coinEffect.splice(1,1);
  player.size = 50;
  counter = 0;
};

function mouseCircle(){
  fill(0,0,0,0);
  stroke(255,0,0,100);
  strokeWeight(5);
  ellipse(mouseX,mouseY,mouseCircleSize,mouseCircleSize);
};

function doCoin(){
  
  var filteredCoins = coins.filter((coin) => {return coin.x>0&&!coin.collected});
  coins = filteredCoins;
  if(random(0,100)<2){
    var newCoin = {x: 600,y: random(0,500),size:20,collected:false};
    coins.push(newCoin);
  }
  for(var coin of coins){
  if(coin.collected){
    
    continue;
  }
  noStroke();
  fill(255,255,0);
  ellipse(coin.x,coin.y,coin.size,coin.size);
  coin.x-=3;
  
  var playerRadius = player.size/2;
  var coinRadius = coin.size/2;
  var touchDistance = playerRadius + coinRadius;
  
    if(dist(player.x,player.y,coin.x,coin.y) < touchDistance){
      coin.collected = true;
      score += 50;
      // doCoinEffect(coin.x,coin.y);
    }
  }
};

function drawScore(){
  fill(255,255,0);
  textSize(24);
  text(score, 50, 450);
};

function drawWalls(){
  fill(0,255,0);

  for(var i = 0; i <walls.length; i++){
    rect(walls[i].x,walls[i].y,walls[i].w,walls[i].h);
  }
};

function moveWalls(){
  for(var i = 0; i < walls.length; i++){
    walls[i].x -= 3;
    
    if(walls[i].x < player.x && walls[i].x + walls[i].w >player.x){
      if(player.y-player.size/2<walls[i].y+walls[i].h&&player.y+player.size/2>walls[i].y){
        crashed = true;
      }
    }
  }
  
  if(wallTimer <= 0){
    wallTimer = 16;

  fill(0,255,0);

  var newWall = {x:500,y:0,w:50,h:gap.y-gap.height/2};
  walls.push(newWall);
  newWall = {x:500,y:gap.y+gap.height/2,w:50,h:500};
  walls.push(newWall);
      gap.y+= 25*Math.floor(random(3)-1);
    if(gap.y < 175){
      gap.y = 175;
    }
    if(gap.y>325){
      gap.y = 325;
    }
  }
  wallTimer-=1;
};

function createSmoke(){
  var newSmoke = {x:player.x,y:player.y,size:player.size*1/5};
  smoke.push(newSmoke);
}; 

function doSmoke(){
  
  smoke = smoke.filter((s)=> {return s.x > -50});
  for(var s of smoke){
    fill(200,200,200,175);
    ellipse(s.x,s.y,s.size,s.size);
      s.x-=4;
      s.size+=player.size*1/50;
  }
  

};



 function propellerInterval(){
  propeller = true;
};

function coinEffect(x,y){
    var newCoinEffect = {x: x,y: y,size:50,finished:false,opacity:200};
    coinEffect.push(newCoinEffect);


};

var doShrinkPower = function(){
  
  var filteredShrinkPower = shrinkPowers.filter((shrinkPower) => {return shrinkPower.x>0&&!shrinkPower.collected});
  shrinkPowers = filteredShrinkPower;
  if(random(0,100)<0.5){
    var newShrinkPower = {x: 600,y: random(0,500),size:30,collected:false};
    shrinkPowers.push(newShrinkPower);
  }
  for(var shrinkPower of shrinkPowers){
  if(shrinkPower.collected){
    
    continue;
  }
  noStroke();
  fill(0,0,255);
  ellipse(shrinkPower.x,shrinkPower.y,shrinkPower.size,shrinkPower.size);
  shrinkPower.x-=3;
  
  var playerRadius = player.size/2;
  var shrinkPowerRadius = shrinkPower.size/2;
  var touchDistance = playerRadius + shrinkPowerRadius;
  
    if(dist(player.x,player.y,shrinkPower.x,shrinkPower.y) < touchDistance){
      shrinkPower.collected = true;
      player.size-=25;
      counterStart = true;
    }
  }
}