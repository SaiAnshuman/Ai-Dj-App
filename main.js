leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWristY = 0;
scorerightWristY = 0;

song = "";

function preload(){

    song = loadSound("music.mp3");
    
   
   }

function setup() {

 canvas = createCanvas(600,500);
 canvas.center();

 video = createCapture(VIDEO);
 video.hide();

 posenet = ml5.poseNet(video,modelLoaded);

 posenet.on('pose',gotPoses);


 

}

function draw(){

image(video,0,0,600,500);

stroke("#FFFFFF");
fill("#0000FF");

 if(scoreleftWristY > 0.2){

 circle(leftWristX,leftWristY,20);
 leftWristYNumber =  Number(leftWristY);
 RemoveDecimal = floor(leftWristYNumber);
 volume = RemoveDecimal / 500;
 song.setVolume(volume);
 document.getElementById("volume").innerHTML = "Volume = " + volume;

 

}


if(scorerightWristY > 0.2){

   circle(rightWristX,rightWristY,20);

  if(rightWristY > 0 && rightWristY <= 100){
 
      song.rate(0.5);
      document.getElementById("speed").innerHTML = "speed = 0.5x";

 }

 else if(rightWristY > 100 && rightWristY <=200){

     song.rate(1);
     document.getElementById("speed").innerHTML = "speed = 1x";

 }

 else if(rightWristY > 200 && rightWristY <=300){

     song.rate(1.5);
     document.getElementById("speed").innerHTML = "speed = 1.5x";

 }

 else if(rightWristY > 300 && rightWristY <=400){

     song.rate(2);
     document.getElementById("speed").innerHTML = "speed = 2x";

 }

 else if(rightWristY > 400){
 
     song.rate(2.5);
     document.getElementById("speed").innerHTML = "speed = 2.5x";

 }




}


}




function play(){

 song.play();
 song.setVolume(1);
 song.rate(1);

}

function modelLoaded(){

console.log("Model Has Been Loaded");


}



function gotPoses(results){

 if(results.length > 0){

    console.log(results);
    
     scoreleftWristY = results[0].pose.keypoints[9].score;
     scorerightWristY = results[0].pose.keypoints[10].score;

     console.log("scoreleftWristY = "+scoreleftWristY);
     console.log("scorerightWristy = "+scorerightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWrist X = " + leftWristX + " left wrist Y = " + leftWristY );

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWrist X = " + rightWristX + " rightWrist Y = " + rightWristY);

 }


}