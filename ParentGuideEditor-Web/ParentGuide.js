const ParentGuideAge = {
    Age_18 : "18",
    Age_12 : "12"
}
const ParentGuideType = {
    Violence    : "Violence",
    Nudity      : "Nudity",
    Profanity   : "Profanity"
}




/***************************************************************
 ******************* ParentGuideRecord Class *******************
 ***************************************************************/

var ParentGuideRecord = function(from, to, age, type){
    this.From = from;
    this.To = to;
    this.Type = type;
    this.Age = age;
}
ParentGuideRecord.prototype.toString = function(){
    var str = "";
    str+= this.From + ' ' + this.To + ' ' + this.Type + ' ' + this.Age;
}









/**************************************************************
 ******************* ParentGuideClass Class *******************
 **************************************************************/

var ParentGuideClass = function()
{
    this.Records = [];
}

ParentGuideClass.prototype.LoadFromFile = function(fileContent)
{
}

ParentGuideClass.prototype.SaveToFile = function(parentGuideClass)
{
    var str;
    for(var record in this.records)
    {
        str += record.toString() + "\n";
    }
    return str;
}