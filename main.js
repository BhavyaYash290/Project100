var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();

function start(){
    document.getElementById("text-box").innerHTML="";
    recognition.start();
}
recognition.onresult=function(event){
    console.log(event);
    var Content=event.results[0][0].transcript;

    document.getElementById("text-box").innerHTML=Content;
    console.log(Content);

    if(Content=="Take my selfie"){
        console.log("taking selfie in five seconds");
        speak();
    }
}

var camera=document.getElementById("camera");
Webcam.set({
    width:400,
    height:320,
    image_format:'jpeg',
    jpeg_quality:90,
});

function speak(){
    var synth=window.speechSynthesis;
    var speak_data="Taking Your Selfie In five Seconds"
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);

    setTimeout(function()
    {
        take_snapshot();
        save();
    }, 5000
    );
}
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="selfie_image" src="'+data_uri+'">';
    });
}
function save(){
    link=document.getElementById("link");
    image=document.getElementById("selfie_image").src;
    link.href=image;
    link.click();
}