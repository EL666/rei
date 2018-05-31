var counter = 0;
var counter2 = 0;
var lavaParticles = [];
class LavaParticle{
    constructor(x,y,w,h,dir,speed,height,vis){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dir = dir;
    this.speed = speed;
    this.height = height;
    this.vis = vis;
  }
  drawSelf(){
    fill(249,103,34);
    if(this.y >= 500){
      this.vis = false;
    }
    if(this.vis === true){
    rect(this.x,this.y,this.w,this.h);
  } else {

  }
  }
  move(){
    if(this.dir == 2){//right
      this.x+=this.speed
    }else if(this.dir == 1){//left
      this.x-=this.speed 
  }
    for(var i = this.height; i > -50;i--){
        
        this.y-=i 
        
        break;
          } 
   this.height--
}
}
//     for(var i = jumpSpeed; i > 0; i--){
//       if(placeFree(player.x,player.y - i,player.w, player.h, walls1)){
//         player.y -= i;
//         break;
//       }
//    } 
//    if(jumpSpeed > 0){
//      jumpSpeed--
//    }
//    if(!up) {
//      jumpSpeed = 0;
//    }
// };
function setup(){
  createCanvas(500,500);
}
function draw(){
  if(counter2>2){
    background(0);
    doLavaParticle();
    counter2= 0;
  }
  
  if(counter > 20){
pushLavaParticle();
  counter = 0;
}
counter++
counter2++
}
function doLavaParticle(){
  var filteredLavaParticles = lavaParticles.filter((lavaParticle) => {return lavaParticle.vis === true});
  lavaParticles = filteredLavaParticles;
  for(var l of lavaParticles){
    fill(230,50,50)
    l.drawSelf();
    l.move();
   
  }   
}
function pushLavaParticle(){

  lavaParticles.push(new LavaParticle(250+random(-20,20),
                              250,
                              5,
                              5,
                              Math.floor(random(1,3)),
                              random(1,5),
                              random(10,20),
                              true));
}
function mouseClicked(){
  console.log(lavaParticles)
  pushLavaParticle();
}