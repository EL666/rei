var ellipseX = 250;
var ellipseY = 250;
var grow = false;
function draw(){
  size(500,500);
  background(200);
  fill(100,100,100);
  noStroke();
  rect(5,225,20,50);
  rect(475,225,20,50);
  rect(25,237.5,450,25);
  stoppage();
  circle();
  textAlign(CENTER,CENTER);
  textSize(30);
  text(ellipseX-250,250,100);
};

function circle(){
  fill(255);
  ellipse(ellipseX,ellipseY,50,50);
  
};

function mouseDragged(){
  if(mouseX > ellipseX-25&&mouseX<ellipseX+25&&mouseY>ellipseY-25&&mouseY<ellipseY+25){
    ellipseX = mouseX;
    grow = true;
  }else{
    grow = false;
  }
};
function stoppage(){
  if(ellipseX >=495){
    ellipseX = 495;
  }else if(ellipseX<=5){
    ellipseX = 5;
  }
};

function keyPressed(){
  if(keyCode == 39){
    ellipseX +=1;
  }
  if(keyCode == 37){
    ellipseX-=1
  }
};
