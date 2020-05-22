using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Player
    {
        public int ID { get; set; }
        public string name { get; set; }
        public int score { get; set; }
        public DateTime time { get; set; }
        public string Secret { get; set; }

    }
}
