var time =  0;
var itime = 0;
var timeStart = false;
var timeiStart = false;
var startTimer = 0;
var startiTimer = 15;
var startingiTimer = false;
var startingTimer = false;
var textGreen = false;
var textWhite = true;
var inspectionTime = true;
var textRed = false   
var finishSolved = false
var whichLetter = 0;
var y = 10;
function setup(){
  restart();
  createCanvas(500,500)
}
function draw(){

  background(0,0,0)
  
  textAlign(CENTER,CENTER)
  textSize(100);
  if(textGreen === true){
    fill(0,255,0)
  }
  if(textWhite === true){
    fill(255,255,255);
  }
  if(textRed === true){
    fill(255,0,0);
  }
  
  
  if(inspectionTime === false&& timeStart === false&&startingiTimer=== true){
  text(itime, 250,250);
  }
  if(inspectionTime === false && timeStart === false&&startingiTimer === false){
   text(nf(time,null,3),250,250)
  }
  if(inspectionTime === false && timeStart === true){

    text(nf(time,null,3),250,250)
  }
  if(timeStart === true){

  time = floor(millis()-startTimer)/1000; 
  }
  
  
  if(inspectionTime === true){
  text(itime, 250,250)
  }
  if(timeiStart === true){
  itime = floor((16-(millis()-startiTimer)/1000)); 
  }


  if(itime< 0){
    background(0,0,0);
    text("DNF",250,250)
  }

};
function keyPressed(){
  if(keyCode == 32){

    if(timeStart === false){
    textGreen = true;
    textWhite = false;
    }
  
    if(timeiStart === true){
      
      textGreen = true
      textWhite = false;
      textRed = false;
    }


    if(startingiTimer === false){
      inspectionTime = true;
    }
  }

}
function keyReleased(){
  
  

    
  if(keyCode == 32 && inspectionTime === false){
    startingTimer = !startingTimer;
    textWhite = true;
    textGreen = false;
    textRed = false;
    if(startingTimer === true){
      startTimer = millis()
      timeStart = true;
      timeiStart = false;
      finishSolved = true
    }else{
      timeStart = false;
      finishSolved = true
    }
  }
  if(keyCode == 32 && inspectionTime === true){
    time = itime
    startingiTimer = !startingiTimer;
    textWhite = false;
    textGreen = false;
    textRed = true;
    
    if(startingiTimer === true){
      startiTimer = millis()
      timeiStart = true;
    
    }else{
      timeiStart = false;
      finishSolved = true;
    }   
          if(keyCode == 32 && inspectionTime === true){
      inspectionTime = !inspectionTime;
    }
  }else if(keyCode == 32 && timeStart === false&& inspectionTime === false){
    restart();
  }

}

function restart(){
  
  itime = 0;
  timeStart = false;
  timeiStart = false;
  startingiTimer = false;
  textGreen = false;
  textWhite = true;
  inspectionTime = false;
  textRed = false
  finishSolved = false
}