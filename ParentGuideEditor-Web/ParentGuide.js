const ParentGuideAge = {
    Age_18 : "+18",
    Age_12 : "+12"
}

ParentGuideAge.FromString = function(value){
    switch(value)
    {
        case ParentGuideAge.Age_18:
            return ParentGuideAge.Age_18;
        case ParentGuideAge.Age_12:
            return ParentGuideAge.Age_12;
        default:
            return ParentGuideAge.Age_12;
    }
}

ParentGuideAge.ToString = function(value){
    switch(value)
    {
        case ParentGuideAge.Age_18:
            return ParentGuideAge.Age_18;
        case ParentGuideAge.Age_12:
            return ParentGuideAge.Age_12;
        default:
            return ParentGuideAge.Age_12;
    }
}

const ParentGuideType = {
    Violence    : "Violence",
    Nudity      : "Nudity",
    Profanity   : "Profanity",
    Gore        : "Gore"
}

ParentGuideType.FromString = function(value){
    switch(value)
    {
        case ParentGuideType.Violence:
            return ParentGuideType.Violence;
        case ParentGuideType.Nudity:
            return ParentGuideType.Nudity;
        case ParentGuideType.Profanity:
            return ParentGuideType.Profanity;
        case ParentGuideType.Gore:
            return ParentGuideType.Gore;
        default:
            return ParentGuideType.Violence;
    }
}

ParentGuideType.ToString = function(value){
    switch(value)
    {
        case ParentGuideType.Violence:
            return ParentGuideType.Violence;
        case ParentGuideType.Nudity:
            return ParentGuideType.Nudity;
        case ParentGuideType.Profanity:
            return ParentGuideType.Profanity;
        default:
            return ParentGuideType.Violence;
    }
}




/***************************************************************
 ******************* ParentGuideRecord Class *******************
 ***************************************************************/

var ParentGuideRecord = function(from, to, age, type){
    from = from || "00:00:00";
    to = to || "00:00:00";
    age = age || ParentGuideAge.Age_12;
    type = type || ParentGuideType.Violence;

    this.From = from;
    this.To = to;
    this.Type = type;
    this.Age = age;
}
ParentGuideRecord.FromString = function(content){
    var v = new ParentGuideRecord("00:00:00", "00:00:00", ParentGuideAge.Age_12, ParentGuideType.Violence);
    v.fromString(content);
    return v;
}
ParentGuideRecord.FromHTML = function(content){
    var v = new ParentGuideRecord("00:00:00", "00:00:00", ParentGuideAge.Age_12, ParentGuideType.Violence);
    v.fromHTML(content);
    return v;
}
ParentGuideRecord.prototype.toString = function(){
    var str = "";
    str+= this.From + '\n' + this.To + '\n' + this.Type + '\n' + this.Age + '\n';
    return str;
}
ParentGuideRecord.prototype.fromString = function(lines) {
    for (var i = 0 ; i < Math.min(lines.length , 4) ; i++)
    {
        if( i == 0)
        this.From = lines[i];
        else if( i == 1)
        this.To = lines[i];
        else if( i == 2)
        {
            this.Type = ParentGuideType.FromString(lines[i]);
        }
        else if( i == 3)
        {
            this.Age = ParentGuideAge.FromString(lines[i]);
        }
    }
}

ParentGuideRecord.prototype.fromHTML = function(tr) {

    for (var i = 0 ; i < Math.min(tr.children.length , 4) ; i++)
    {
        var td = tr.children[i];
        if( i == 0)
        this.From = td.children[0].value + ":" + td.children[1].value + ":" +td.children[2].value;
        else if( i == 1)
        this.To = td.children[0].value + ":" + td.children[1].value + ":" +td.children[2].value;
        else if( i == 2)
        {
            this.Type = ParentGuideType.FromString(td.children[0].value);
        }
        else if( i == 3)
        {
            this.Age = ParentGuideAge.FromString(td.children[0].value);
        }
    }
}

ParentGuideRecord.prototype.containTime = function(time){
    var fromArray = this.From.split(":");
    var toArray = this.To.split(":");

    var fromTime = Number(fromArray[0])*60*60 + Number(fromArray[1])*60 + Number(fromArray[2]);
    var toTime = Number(toArray[0])*60*60 + Number(toArray[1])*60 + Number(toArray[2]);

    if (fromTime >= toTime)
        return false;

    if (time >= fromTime && time <= toTime)
        return true;
    return false;
}

ParentGuideRecord.prototype.toHTML = function(){
    var str = "";
    str += "<tr>";
    var fromDates = this.From.split(":");
    var toDates = this.To.split(":");
    str += "<td><input value=" + fromDates[0] + ">:<input value=" + fromDates[1] + "></input>:<input value=" + fromDates[2] + "></input></td>";
    str += "<td><input value=" + toDates[0] + ">:<input value=" + toDates[1] + "></input>:<input value=" + toDates[2] + "></input></td>";
    str += "<td>";
    str += "<select name='Type'>"
    for(var key in ParentGuideType) {
        var value = ParentGuideType[key];
        if(typeof(value) == "string"){
            str += "<option value='" + value +"'";
            if (value == this.Type)
            {
                str += " selected"
            }
            str += ">" + value + "</option>";
        }
    }
    str += "</select>";
    str += "</td>";
    str += "<td>";
    str += "<select name='Age'>";
    for(var key in ParentGuideAge) {
        var value = ParentGuideAge[key];
        if(typeof(value) == "string"){
            str += "<option value='" + value +"'";
            if (value == this.Age)
            {
                str += " selected"
            }
            str += ">" + value + "</option>";
        }
    }
    str += "</select>";
    str += "</td>";
    str += "</tr>";
    return str;
}









/**************************************************************
 ******************* ParentGuideClass Class *******************
 **************************************************************/

var ParentGuideClass = function()
{
    this.Records = [];
}

ParentGuideClass.prototype.fromString = function(content)
{
    var lines = content.split('\n');
    for (var i = 0 ; i < lines.length ; i+=5)
    {
        var array = lines.slice(i, i+4);
        if (array.length < 4) return;
        this.Records.push(ParentGuideRecord.FromString(lines.slice(i, i+4)));
    }
}

ParentGuideClass.prototype.toString = function(parentGuideClass)
{
    var str = "";
    for(var i = 0 ; i < this.Records.length; i++)
    {
        var record = this.Records[i];
        str += record.toString() + "\n";
    }
    return str;
}

ParentGuideClass.prototype.toHTML = function(parentGuideClass)
{
    var str = "";
    for(var i = 0 ; i < this.Records.length; i++)
    {
        var record = this.Records[i];
        str += record.toHTML();
    }
    return str;
}

ParentGuideClass.prototype.fromHTML = function(tb_body)
{
    var childrens = tb_body.children;
    for (var i = 1 ; i < childrens.length ; i+=1)
    {
        this.Records.push(ParentGuideRecord.FromHTML(childrens[i]));
    }
}

ParentGuideClass.prototype.getRecordAtTime = function(time){
    //FIXME save data in order, then binary search
    for(var i = 0 ; i < this.Records.length; i++)
    {
        var record = this.Records[i];
        if (record.containTime(time))
            return record;
    }
    return null;
}