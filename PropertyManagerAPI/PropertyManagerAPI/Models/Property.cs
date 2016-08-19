using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManagerAPI.Models
{
    public class Property
    {
       
            //Primary key
            public int PropertyId { get; set; }

            //Foreign Key
            public string UserId { get; set; }

            //Property fields
            public string City { get; set; }
            public string Zip { get; set; }
            public string Street { get; set; }
            public int Squareft { get; set; }
            public int Bedrooms { get; set; }
            public int Bathrooms { get; set; }
            public double Rent { get; set; }
            public string Description { get; set; }
            


            //Entity relationships
            public virtual PropertyManagerUser User { get; set; }
            

        }
    }