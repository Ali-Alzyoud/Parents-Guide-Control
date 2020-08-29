
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
var edit_table = false;
var edit_file = false;
var edit_control = false;
var UI_UPDATE = false;

document.addEventListener('DOMContentLoaded', function(event){
    init();
    var video = document.getElementById("video");
    var play = document.getElementById("btn_play");
    var stop = document.getElementById("btn_stop");
    var guide = document.getElementById("btn_guide");
    var lbl = document.getElementById("lbl_time");
    var edit = document.getElementById("btn_edit");
    var btn_document = document.getElementById("btn_document");
    var control = document.getElementById("btn_control");
    var div_tb = document.getElementById("div_tb");
    var div_document = document.getElementById("div_document");
    var div_control = document.getElementById("div_control");
    var lbl_video = document.getElementById("lbl_video");
    function video_reset(){
        video.style = '';
        lbl_video.innerText = "";
        video.volume = 1.0;
    }
    setInterval(function(){
        var violence = (document.getElementById("sel_Violence").value == "Blur") ? '-webkit-filter: blur(10px);' : '-webkit-filter: opacity(0%);';
        var nudity = (document.getElementById("sel_Nudity").value == "Blur") ? '-webkit-filter: blur(10px);' : '-webkit-filter: opacity(0%);';
        var gore = (document.getElementById("sel_Gore").value == "Blur") ? '-webkit-filter: blur(10px);' : '-webkit-filter: opacity(0%);';

        if (parentGuideClass && guide_state === GUIDE_STATE.ON){
            var record = parentGuideClass.getRecordAtTime(video.currentTime);
            if (record){
                video_reset();
                if (record.Type == ParentGuideType.Violence)
                    video.style = violence;
                else if (record.Type == ParentGuideType.Nudity)
                    video.style = nudity;
                else if (record.Type == ParentGuideType.Gore)
                    video.style = gore;
                else if (record.Type == ParentGuideType.Profanity)
                    video.volume = 0.0;
                if(lbl_video.innerText != record.Type)
                lbl_video.innerText = record.Type;
            }
            else{
                video_reset();
            }
        }
        var mm1 = Math.floor(video.duration/60);
        var ss1 = Math.floor(video.duration%60);
        var mm2 = Math.floor(video.currentTime/60);
        var ss2 = Math.floor(video.currentTime%60);
        var innerText = "";
        if(mm1 < 10) innerText+="0";
        innerText += mm1;
        innerText += ":";
        if(ss1 < 10) innerText+="0";
        innerText += ss1;

        innerText += " / ";

        if(mm2 < 10) innerText+="0";
        innerText += mm2;
        innerText += ":";
        if(ss2 < 10) innerText+="0";
        innerText += ss2;
        lbl.innerText = innerText;
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
        video_reset();
        if (guide_state == GUIDE_STATE.ON){
            guide_state = GUIDE_STATE.OFF;
            guide.style.opacity = "50%";
        }
        else{
            guide_state = GUIDE_STATE.ON;
            guide.style.opacity = "100%";
        }
    });
    edit.addEventListener("click", function(){
        if(edit_table === true){
            edit.style.opacity = "50%";
            div_tb.style.display = "none";
        }
        else{
            edit.style.opacity = "100%";
            div_tb.style.display = "inherit";
        }
        edit_table = !edit_table;
    });
    btn_document.addEventListener("click", function(){
        if(edit_file === true){
            btn_document.style.opacity = "50%";
            div_document.style.display = "none";
        }
        else{
            btn_document.style.opacity = "100%";
            div_document.style.display = "inherit";
        }
        edit_file = !edit_file;
    });
    control.addEventListener("click", function(){
        if(edit_control === true){
            control.style.opacity = "50%";
            div_control.style.display = "none";
        }
        else{
            control.style.opacity = "100%";
            div_control.style.display = "inherit";
        }
        edit_control = !edit_control;
    });
});

function init(){
    UI_UPDATE = true;
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
    document.querySelectorAll("input").forEach(function(a){
        a.onchange = update;
    })
    UI_UPDATE = false;
}

function save(){
    var contentFile = document.getElementById("contentID");
    var tb_body = document.getElementById("tb_body");
    parentGuideClass = new ParentGuideClass();
    parentGuideClass.fromHTML(tb_body);
    contentFile.value = parentGuideClass.toString();
}

function add(){
    UI_UPDATE = true;
    var contentFile = document.getElementById("contentID");
    var tb_body = document.getElementById("tb_body");
    parentGuideClass = new ParentGuideClass();
    parentGuideClass.fromHTML(tb_body);
    parentGuideClass.Records.push(new ParentGuideRecord());
    var td = "<tr>"+
    "<th>From (HH : MM : SS)</th>"+
    "<th>To (HH : MM : SS)</th>"+
    "<th>Type</th>"+
    "<th>Age</th>"+
    "</tr>";
    tb_body.innerHTML = td + parentGuideClass.toHTML();
    document.querySelectorAll("input").forEach(function(a){
        a.onchange = update;
    })
    UI_UPDATE = false;
}

function remove(){
    UI_UPDATE = true;
    var contentFile = document.getElementById("contentID");
    var tb_body = document.getElementById("tb_body");
    parentGuideClass = new ParentGuideClass();
    parentGuideClass.fromHTML(tb_body);
    parentGuideClass.Records.pop();
    var td = "<tr>"+
    "<th>From (HH : MM : SS)</th>"+
    "<th>To (HH : MM : SS)</th>"+
    "<th>Type</th>"+
    "<th>Age</th>"+
    "</tr>";
    tb_body.innerHTML = td + parentGuideClass.toHTML();
    document.querySelectorAll("input").forEach(function(a){
        a.onchange = update;
    })
    UI_UPDATE = false;
}

function update(){
    if(UI_UPDATE) return;
    parentGuideClass = new ParentGuideClass();
    parentGuideClass.fromHTML(tb_body);
}