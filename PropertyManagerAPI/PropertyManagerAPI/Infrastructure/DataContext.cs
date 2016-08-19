using Microsoft.AspNet.Identity.EntityFramework;
using PropertyManagerAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PropertyManagerAPI.Infrastructure
{
    public class DataContext : IdentityDbContext<PropertyManagerUser>
    {
        public DataContext(): base ("PropertyManager")
        {

        }
        public IDbSet<Property> Properties { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            //configure one: many; relationship user to property

            modelBuilder.Entity<PropertyManagerUser>()

                .HasMany(u => u.Properties)
                .WithRequired(p => p.User)
                .HasForeignKey(p => p.UserId);


            base.OnModelCreating(modelBuilder);
        }

    }
}