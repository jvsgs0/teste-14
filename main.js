song = "";
song2 = "";

song1_status = "";
song2_status = "";

SRW = 0;
SLW = 0;

PeX = 0;
PeY = 0;
PdX = 0;
PdY = 0;

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3") 
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet foi inicializado');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        PdX = results[0].pose.rightWrist.x;
        PdY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + PdX + " rightWristY = " + PdY);

        PeX = results[0].pose.leftWrist.x;
        PeY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + PeX + " leftWristY = " + PeY);

        SRW = results[0].pose.keypoints[10].score;
        SLW = results[0].pose.keypoints[9].score;
        console.log("ScoreRightWidth = " + SRW + " ScoreLeftWidth = " + SLW);

    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

    song1_status = song.isPlaying();
    song2_status = song2.isPlaying();

    if(SLW > 0.2)
    {
        circle(PeX, PeY, 20);

        song2.stop();

        if(song1_status == false)
        {
            song.play();
            document.getElementById("song").innerHTML = "Tema do Harry Poter";
        }
    }

    if(SRW > 0.2)
    {
        circle(PdX, PdY, 20);

        song.stop();

        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Tema do Peter Pan";
        }
    }
}

function play()
{
    setVolume(1);
    song.play();
    song.rate(1);
}