var j = 0;
var i = 0;

function setup(){
  createCanvas(3000,3000)
}

function draw(){

    while(j<45){
       while(i<60){
         noStroke();
        fill(random(0,255),random(0,255),random(0,255))
      rect(i*50,j*50,50,50) ;
      i++;

    }
    i = 0;
    j++;

  }
i = 0;
j = 0;
};