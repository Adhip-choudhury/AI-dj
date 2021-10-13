 music="";
 leftWristx=0;
 rightWristx=0;

 leftWristy=0;
 rightWristy=0;


 leftWrist_Socre=0;
 rightWrist_Socre=0;

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


   fill("#ff391e");
   stroke("#ff391e");
   if(leftWrist_Socre > 0.2){

  
   circle(leftWristx, leftWristy, 20);

   leftWristy_number=Number(leftWristy);
   leftWristy_without_decimals=floor(leftWristy_number);
   volume=leftWristy_without_decimals/800;
  
   document.getElementById("volumename").innerHTML="Volume: "+volume;
   music.setVolume(volume);
   console.log("volume: "+volume);

  }

  if(rightWrist_Socre > 0.2){

  
   circle(rightWristx, rightWristy, 20);
   if(rightWristy > 0 && rightWristy <= 60){
     music.rate(0.5);

     document.getElementById("speed").innerHTML="Speed: 0.5x";
   }

   else if(rightWristy > 60 && rightWristy <= 120){
      music.rate(1);
 
      document.getElementById("speed").innerHTML="Speed: 1x";
    }
 

    else if(rightWristy > 120 && rightWristy <= 180){
      music.rate(1.5);
 
      document.getElementById("speed").innerHTML="Speed: 1.5x";
    }

    
    else if(rightWristy > 180 && rightWristy <= 240){
      music.rate(2);
 
      document.getElementById("speed").innerHTML="Speed: 2x";
    }


    else if(rightWristy > 240 && rightWristy <= 300){
      music.rate(2.5);
 
      document.getElementById("speed").innerHTML="Speed: 2.5x";
    }
 


  }
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
      leftWristx=results[0].pose.leftWrist.x;
      leftWristy=results[0].pose.leftWrist.y;
      console.log("leftWristx: " +leftWristx+ " leftWristy: " +leftWristy);

      
      rightWristx=results[0].pose.rightWrist.x;
      rightWristy=results[0].pose.rightWrist.y;
      console.log("rightWristx: " +rightWristx+ " rightWristy: " +rightWristy);

      leftWrist_Socre=results[0].pose.keypoints[9].score;
      rightWrist_Socre=results[0].pose.keypoints[10].score;


      console.log("leftWrist_score: "+leftWrist_Socre);
      console.log("righWrist_score: "+rightWrist_Socre);
    }  
}