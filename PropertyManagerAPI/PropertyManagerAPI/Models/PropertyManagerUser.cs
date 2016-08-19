using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManagerAPI.Models
{
    public class PropertyManagerUser : IdentityUser
    {
        //fields
        public string FirstName { get; set; }
        public string LastName { get; set; }

        //defining entity relationships
        public virtual ICollection<Property> Properties { get; set; }
        
    }
}