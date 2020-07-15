using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ParentGuideEditor
{
    enum ParentGuideAge
    {
        Age_18,
        Age_12
    }
    enum ParentGuideType
    {
        Violence,
        Nudity,
        Profanity
    }
    class ParentGuideRecord
    {
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
        public ParentGuideType Type { get; set; }
        public ParentGuideAge Age { get; set; }

        public ParentGuideRecord(TimeSpan from, TimeSpan to, ParentGuideAge age, ParentGuideType type)
        {
            this.From = from;
            this.To = to;
            this.Age = age;
            this.Type = type;
        }
    }
    class ParentGuideClass
    {
        public List<ParentGuideRecord> Records = new List<ParentGuideRecord>();
        public void LoadFromFile(string path) { }
        public void SaveToFile(string path) { }
    }
}
