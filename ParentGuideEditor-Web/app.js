
const VIDEO_STATE = {
    PLAY : "PLAY",
    PAUSE: "PAUSE"
};

const GUIDE_STATE = {
    ON : "ON",
    OFF: "OFF"
};

var parentGuideClass = null;
var video_state = VIDEO_STATE.STOP;
var guide_state = GUIDE_STATE.ON;

document.addEventListener('DOMContentLoaded', function(event){
    init();
    var video = document.getElementById("video");
    var play = document.getElementById("btn_play");
    var stop = document.getElementById("btn_stop");
    var guide = document.getElementById("btn_guide");
    var lbl = document.getElementById("lbl_time");
    setInterval(function(){
        var violence = (document.getElementById("sel_Violence").value == "Blur") ? '-webkit-filter: blur(5px);' : '-webkit-filter: opacity(0%);';
        var nudity = (document.getElementById("sel_Nudity").value == "Blur") ? '-webkit-filter: blur(5px);' : '-webkit-filter: opacity(0%);';
        var gore = (document.getElementById("sel_Gore").value == "Blur") ? '-webkit-filter: blur(5px);' : '-webkit-filter: opacity(0%);';
        var profanity = document.getElementById("sel_Profanity").value;

        if (parentGuideClass && guide_state === GUIDE_STATE.ON){
            var record = parentGuideClass.getRecordAtTime(video.currentTime);
            if (record){
                if (record.Type == ParentGuideType.Violence)
                    video.style = violence;
                else if (record.Type == ParentGuideType.Nudity)
                    video.style = nudity;
                else if (record.Type == ParentGuideType.Gore)
                    video.style = gore;
                else if (record.Type == ParentGuideType.Profanity)
                    video.style = profanity;
            }
            else
                video.style = '';
        }
        var x1 = Math.floor(video.duration);
        var x2 = Math.floor(video.currentTime);
        lbl.innerText = "";
        if(x1 < 10) lbl.innerText+="00";
        else if (x1 < 100) lbl.innerText+="0";
        lbl.innerText += x1  + " / ";
        if(x2 < 10) lbl.innerText+="00";
        else if (x2 < 100) lbl.innerText+="0";
        lbl.innerText += x2;
    }, 100);
    video.addEventListener("pause", function(){
        video_state = VIDEO_STATE.PAUSE;
        play.src = "play.png";
    });
    video.addEventListener("ended", function(){
        video_state = VIDEO_STATE.PAUSE;
        play.src = "play.png";
        video.currentTime = 0;
    });
    video.addEventListener("play", function(){
        video_state = VIDEO_STATE.PLAY;
        play.src = "pause.png";
    });
    play.addEventListener("click", function(){
        if(video_state == VIDEO_STATE.PLAY)
           video.pause();
        else
            video.play();
    });
    stop.addEventListener("click", function(){
        video.pause();
        video.currentTime = 0;
    });
    guide.addEventListener("click", function(){
        video.style = '';
        if (guide_state == GUIDE_STATE.ON){
            guide_state = GUIDE_STATE.OFF;
            guide.style.opacity = "50%";
        }
        else{
            guide_state = GUIDE_STATE.ON;
            guide.style.opacity = "100%";
        }
    });
});


function init(){
    var contentFile = document.getElementById("contentID");
    var tb_body = document.getElementById("tb_body");
    parentGuideClass = new ParentGuideClass();
    parentGuideClass.fromString(contentFile.value);
    var td = "<tr>"+
    "<th>From (HH : MM : SS)</th>"+
    "<th>To (HH : MM : SS)</th>"+
    "<th>Type</th>"+
    "<th>Age</th>"+
    "</tr>";
    tb_body.innerHTML = td + parentGuideClass.toHTML();
}

function save(){
    var contentFile = document.getElementById("contentID");
    var tb_body = document.getElementById("tb_body");
    parentGuideClass = new ParentGuideClass();
    parentGuideClass.fromHTML(tb_body);
    contentFile.value = parentGuideClass.toString();
}

function add(){
    var contentFile = document.getElementById("contentID");
    var tb_body = document.getElementById("tb_body");
    parentGuideClass = new ParentGuideClass();
    parentGuideClass.fromHTML(tb_body);
    parentGuideClass.Records.push(new ParentGuideRecord());
    var td = "<tr>"+
    "<th>From (M : S : MS)</th>"+
    "<th>To (M : S : MS)</th>"+
    "<th>Type</th>"+
    "<th>Age</th>"+
    "</tr>";
    tb_body.innerHTML = td + parentGuideClass.toHTML();
}