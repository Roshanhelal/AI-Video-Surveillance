video="";
status1="";
objects=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image (video,0,0,480,380);
    if(status1 != ""){
        objectDetector.detect(video,gotResults)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected: "+objects.length;
            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
             noFill();
             stroke("#ff0000");
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
   
}

function modelLoaded(){
    console.log("modelLoaded");
    video.speed(1);
    video.volume(0);
    video.loop();
    status1=true;
}

function gotResults(error,results){
if(error){
    console.error(error);
}
 else {
    console.log(results);
    objects=results;
}
}