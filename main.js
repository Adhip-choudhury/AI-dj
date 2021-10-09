 music="";
 leftWristx=0;
 rightWristx=0;

 leftWristy=0;
 rightWristy=0;

function preload(){
   music=loadSound("music.mp3");
}


function setup(){
  canvas=createCanvas(400,300);
  canvas.position(476,230);
  video=createCapture(VIDEO);
  video.hide();

  poseNet= ml5.poseNet(video , modelLoaded);
  poseNet.on("pose", gotResult);
}


function draw(){
   image(video, 0, 0, 400, 300);

}


function PLAY(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}


function modelLoaded(){
   console.log("model is loaded");
}


function gotResult(results){
    if(  results.length > 0){
      console.log(results);
      leftWristx=results[0].pose.leftWrist.x.toFixed(0);
      leftWristy=results[0].pose.leftWrist.y.toFixed(0);
      console.log("leftWristx: " +leftWristx+ " leftWristy: " +leftWristy );

      
      rightWristx=results[0].pose.rightWrist.x.toFixed(0);
      rightWristy=results[0].pose.rightWrist.y.toFixed(0);
      console.log("rightWristx: " +rightWristx+ " rightWristy: " +rightWristy );
    }  
}
