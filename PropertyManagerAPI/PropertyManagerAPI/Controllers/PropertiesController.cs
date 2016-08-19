using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using PropertyManagerAPI.Infrastructure;
using PropertyManagerAPI.Models;
using System;

namespace PropertyManagerAPI.Controllers
{  
    public class PropertiesController : ApiController
    {
        private DataContext db = new DataContext();

        // GET: api/Properties
        
        public IQueryable<Property> GetProperties()
        {
            return db.Properties;
        }

        // GET: api/Properties/5
        [ResponseType(typeof(Property))]
        public IHttpActionResult GetProperty(int id)
        {
            Property property = db.Properties.Find(id);
            if (property == null)
            {
                return NotFound();
            }

            return Ok(property);
        }

        //POST: api/Properties/City
        [Route("api/properties/search")]
        public IQueryable<Property> SearchProperties(SearchQuery search)
        {
            IQueryable<Property> properties = db.Properties;
            if (!String.IsNullOrEmpty(search.City))
            {
                properties = properties.Where(p => p.City == search.City);
            }

            if (search.MinRent > 0 && search.MinRent != null)
            {
                properties = properties.Where(p => p.Rent >= search.MinRent);
            }

            if (search.MaxRent > 0 && search.MaxRent != null)
            {
                properties = properties.Where(p => p.Rent <= search.MaxRent);
            }

            if (search.Bedrooms > 0 && search.Bedrooms != null)
            {
                properties = properties.Where(p => p.Bedrooms >= search.Bedrooms);
            }

            if (search.Bathrooms > 0 && search.Bathrooms != null)
            {
                properties = properties.Where(p => p.Bathrooms >= search.Bathrooms);
            }


            return properties;
        }

        //POST: api/Properties/search/username
        [Route("api/properties/search/username")]
        public IQueryable<Property> SearchPropertiesByUser(SearchQuery search)
        {
            string username = search.UserName;
            var user = db.Users.FirstOrDefault(u => u.UserName == username);
            
            IQueryable<Property> properties = db.Properties.Where(p => p.UserId == user.Id);
            return properties;
        }

        // PUT: api/Properties/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProperty(int id, Property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != property.PropertyId)
            {
                return BadRequest();
            }

            db.Entry(property).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Properties
        [ResponseType(typeof(Property))]
        public IHttpActionResult PostProperty(Property property)
        {
            string username = User.Identity.Name;
            var user = db.Users.FirstOrDefault(u => u.UserName == username);

            //Add userId if username is found
            if (user.Id == null)
            {
                Unauthorized();
            }
            else
            {
                property.UserId = user.Id;
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Properties.Add(property);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = property.PropertyId }, property);
        }

        // DELETE: api/Properties/5
        [ResponseType(typeof(Property))]
        public IHttpActionResult DeleteProperty(int id)
        {
            Property property = db.Properties.Find(id);
            if (property == null)
            {
                return NotFound();
            }

            db.Properties.Remove(property);
            db.SaveChanges();

            return Ok(property);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PropertyExists(int id)
        {
            return db.Properties.Count(e => e.PropertyId == id) > 0;
        }
    }
}