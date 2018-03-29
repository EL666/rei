var ellipse1 = {x:0,y:150};
var ellipse2 = {x:0,y:250};
var grow = false;
var redColor = ellipse1.x - 5;
function setup(){
  createCanvas(500,500)
}
function draw(){
  redColor = ellipse1.x/1.92 - 3;
  background(redColor,200,200);
  fill(100,100,100);
  noStroke();
  rect(5,225,20,50);
  rect(475,225,20,50);
  rect(25,237.5,450,25);
  stoppage(ellipse1);
  stoppage(ellipse2);
  circle(ellipse1);
  circle(ellipse2);
  textAlign(CENTER,CENTER);
  textSize(30);
  text(Math.round(ellipse1.x/1.92-3),250,100);
};

function circle(obj){
  fill(255);
  ellipse(obj.x,obj.y,50,50);
  
};

function mouseDragged(){
  if(mouseX > ellipse1.x-25&&mouseX<ellipse1.x+25&&mouseY>ellipse1.y-25&&mouseY<ellipse1.y+25){
    ellipse1.x = mouseX;
}
};
function stoppage(obj){
  if(obj.x >=495){
    obj.x = 495;
  }else if(obj.x<=5){
    obj.x = 5;
  }
};

function keyPressed(){
  if(keyCode == 39){
    ellipse1.x +=1.92;
  }
  if(keyCode == 37){
    ellipse1.x-=1.92;
  }
};
