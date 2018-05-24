var noGrav = false;
var up = 0;
var particles = [];
var down = 0;
var right = 0;
var powerLevel = 100;
var left = 0;
var spd = 4;
var gravity = 0;
var jumpSpeed = 5;
var jumpHeight = 17;

var walls1 = [{x:0,y:-300,w:249,h:900},
              {x:30,y:325,w:140,h:175},
              {x:0,y:465,w:500,h:35},
              {x:500,y:250,w:50,h:25},
              {x:400,y:200,w:75,h:25},
              {x:600,y:350,w:50,h:25},
              {x:225,y:276,w:175,h:300},
              {x: 800, y: 320, w: 100, h: 20},
              {x:0,y:0,w:1000,h:10},
              {x:-500,y:1050,w:4000,h:50}
              ];

var lava = [{x: 800, y: 300, w: 100, h: 20},
            {x: -500, y:1000, w: 4000, h: 50}];

var player = {x:250,y:250,w:25,h:25,grav:0};

class Particle{
  
  constructor(x,y,w,h,speed,grav,vis){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.grav = grav;
    this.vis = vis;
  }
  drawSelf(){
	if(noGrav === false){
  		this.vis === false;
	} else {
    	rect(this.x,this.y,this.w,this.h,);
		}
 	}


  move(){
    if(right){
      this.x-=random(1,3);
    }
    if(left){
      this.x+=random(1,3);
    }
    if(placeFree(this.x,this.y+1,this.w,this.h,walls1)=== false){
    	this.grav = this.grav + this.speed
    }else if(placeFree(this.x,this.y + 1, this.w,this.h, walls1) === true) {
        this.grav = 0;
    } 

  	for(var i = this.grav; i > 0; i--) {
    	if(placeFree(this.x, this.y + i,this.w, this.h, walls1) === false) {
      		this.y += i;
      		break;
    	}
  	}
  }
}

function setup(){
  createCanvas(500,500);
}

function draw() {
  noStroke();
  drawWalls();
  touchLava();

  if(placeFree(player.x,player.y + 1,player.w, player.h , walls1)===false) {
    gravity = 0;
  }
  movePlayer();
  doParticle();

  if(noGrav === true){
    gravity = 0;
    pushParticle();
  }

  texts();
  drawPlayer();
  text("keyCode", 200,50);
  text(keyCode,250,50);
};

function drawPlayer() {
  if(noGrav === false){
  	fill(255,153,51)
  } else if(noGrav === true){
   	fill(230,50,50)
  }
  rect(250,250,player.w,player.h);
};

function drawWalls() {
  level1();
};

function collision(r1, r2) {
  if (r1.x + r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h) {
        return true;
  } else {
    return false;
  }
};

function placeFree(xNew, yNew, wNew,hNew, z) {
  var temp = { x: xNew, y: yNew, w: wNew, h: hNew};
  for(var i = 0; i < z.length; i++) {
    if(collision(temp,z[i])) {
      return false;
    }
    
  }
  return true;
};

function keyPressed() {

  if(keyCode == 32){
    jetpack();
  }
  if(keyCode == 38) {
    up = 1;
  }
    if(keyCode == 40) {
    down = 1;
  }
    if(keyCode == 39) {
    right = 1;
  }
    if(keyCode == 37) {
    left = 1;
  }

}

function keyReleased() {
  if(keyCode == 32){
    noGrav = false;
  }
  if(keyCode == 38) {
    up = 0;
  }
    if(keyCode == 40) {
    down = 0;
  }
    if(keyCode == 39) {
    right = 0;
  }
    if(keyCode == 37) {
    left = 0;
  }

}

function movePlayer() {

  if(noGrav === true && up){
    if(placeFree(player.x,player.y,player.w,player.h,walls1)){
    	player.y -= 1;
  	}
  }
  if(up && !(placeFree(player.x,player.y + 1, player.w,player.h,walls1))) {//jumping when you're on the ground
    jumpSpeed = jumpHeight;
  }

  var dir = right - left;
  text("dir:", 150,50);
  text(dir, 180,50);
  
  for(var s = spd; s >= 0; s--) {
  	if(placeFree(player.x + s * dir, player.y,player.w,player.h,walls1)) {
    	player.x += s * dir;
    	break;
  	}
  }
  if(jumpSpeed > 0) {
    playerJump();
  }else if(jumpSpeed <= 0) 
  playerFall();
};

function playerFall() {
      //for(var j = 0; j < walls1.length; j++) {
	if(noGrav === false){
    	if(placeFree(player.x,player.y + 1, player.w,player.h, walls1) === false) {
          gravity = 0;
        }else{         
          gravity = gravity + 0.1;      
    }

  	for(var i = gravity; i > 0; i--) {
    	if(placeFree(player.x, player.y + i, player.w,player.h, walls1)) {
      		player.y += i;
      		break;
    	}
  	}
  	}
};

function texts() {
  textSize(10);
  text("gravity:",50,50); 
  text(gravity,90,50);
  text(powerLevel,350,50);
};

function playerJump(){

    for(var i = jumpSpeed; i > 0; i--){
      if(placeFree(player.x,player.y - i,player.w, player.h, walls1)){
      	player.y -= i;
      	break;
      }
   } 
   if(jumpSpeed > 0){
     jumpSpeed--
   }
   if(!up) {
     jumpSpeed = 0;
   }
};

function touchLava(){
  for(var i = 0; i < lava.length; i++){
  	if(collision(player,lava[i]) === true){
    	console.log("hi");
  		player.x = 250;
  		player.y = 250;
  	} else {

  }
}
}

function level1(){
  background(54,52,187)
  fill(94,92,237);
  for(var i = 0; i < walls1.length; i++){
  	rect(walls1[i].x-player.x+250,
         walls1[i].y-player.y+250,
       	 walls1[i].w,
         walls1[i].h);
  }

  for(var j = 0; j < lava.length; j++){
    fill(249,103,34);
    rect(lava[j].x - player.x + 250,
         lava[j].y - player.y + 250,
         lava[j].w,
         lava[j].h);
  }
}

function jetpack(){ 

	if(powerLevel > 0) {
  		noGrav = true;

	} else {
		noGrav = false;
	}
}



function doParticle(){
  var filteredParticles = particles.filter((particle) => {return particle.y<random(400,500) && particle.vis === true});
  particles = filteredParticles;
  for(var p of particles){
    p.drawSelf();
    p.move();
   
  }   
}

function pushParticle(){

  particles.push(new Particle(random(250-1,250+player.w+1),
                              250 + player.h,
                              3,
                              3,
                              random(0.05,0.3),
                              1,
                              true));
}