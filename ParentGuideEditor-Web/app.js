var parentGuideClass = null;
document.addEventListener('DOMContentLoaded', function(event){
    init();
    var video = document.getElementById("video");
    setInterval(function(){
        var violence = (document.getElementById("sel_Violence").value == "Blur") ? '-webkit-filter: blur(5px);' : '-webkit-filter: opacity(0%);';
        var nudity = (document.getElementById("sel_Nudity").value == "Blur") ? '-webkit-filter: blur(5px);' : '-webkit-filter: opacity(0%);';
        var gore = (document.getElementById("sel_Gore").value == "Blur") ? '-webkit-filter: blur(5px);' : '-webkit-filter: opacity(0%);';
        var profanity = document.getElementById("sel_Profanity").value;

        if (parentGuideClass){
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
    }, 100);
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