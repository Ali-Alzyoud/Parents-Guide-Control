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
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public ParentGuideType type { get; set; }
        public ParentGuideAge age { get; set; }
    }
    class ParentGuideClass
    {
        public List<ParentGuideRecord> Records = new List<ParentGuideRecord>();
        public void LoadFromFile(string path) { }
        public void SaveToFile(string path) { }
    }
}
