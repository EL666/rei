var ellipse1 = {x:0,y:250};
var ellipse2 = {x:0,y:350};
var ellipse3 = {x:0,y:450};
var bar1 = {x:5,y:225};
var bar2 = {x:5,y:325};
var bar3 = {x:5,y:425};
var redColor = 0;
var greenColor = 0;
var blueColor = 0;
function setup(){
  createCanvas(500,500);
}
function draw(){
  redColor = (ellipse1.x/1.92) - 3;
  greenColor = (ellipse2.x/1.92) - 3;
  blueColor = (ellipse3.x/1.92) - 3;
  background(redColor,greenColor,blueColor);
  fill(100,100,100);
  noStroke();
  sliderBar(bar1);
  sliderBar(bar2);
  sliderBar(bar3);
  stoppage(ellipse1);
  stoppage(ellipse2);
  stoppage(ellipse3);
  circle(ellipse1);
  circle(ellipse2);
  circle(ellipse3);
  texts();
};
function sliderBar(obj){
  rect(obj.x,obj.y,20,50);
  rect(475,obj.y,20,50);
  rect(25,obj.y+12.5,450,25);
}
function circle(obj){
  fill(255);
  ellipse(obj.x,obj.y,50,50);
  
};

function mouseDragged(){
  if(mouseX > ellipse1.x-25&&mouseX<ellipse1.x+25&&mouseY>ellipse1.y-25&&mouseY<ellipse1.y+25){
    ellipse1.x = mouseX;
}
  if(mouseX > ellipse2.x-25&&mouseX<ellipse2.x+25&&mouseY>ellipse2.y-25&&mouseY<ellipse2.y+25){
    ellipse2.x = mouseX;
}
  if(mouseX > ellipse3.x-25&&mouseX<ellipse3.x+25&&mouseY>ellipse3.y-25&&mouseY<ellipse3.y+25){
    ellipse3.x = mouseX;
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

function texts(){
  textAlign(CENTER,CENTER);
  textSize(30);
  text("fill(",150,100);
  text(Math.round(ellipse1.x/1.92-3),200,100);
  text(",",230,100);
  text(Math.round(ellipse2.x/1.92-3),260,100);
  text(",",290,100);
  text(Math.round(ellipse3.x/1.92-3),320,100);
  text(")",350,100);
} 
