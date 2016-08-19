using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PropertyManagerAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PropertyManagerAPI.Infrastructure
{
    public class AuthorizationRepository : IDisposable
    {
        //Adding private variables
        private UserManager<PropertyManagerUser> _userManager;
        private DataContext _dataContext;

        public AuthorizationRepository()
        {
            _dataContext = new DataContext();
            var userStore = new UserStore<PropertyManagerUser>(_dataContext);
            _userManager = new UserManager<PropertyManagerUser>(userStore);

        }


        //Adding Method to register user
        public async Task<IdentityResult> RegisterUser(RegistrationModel userModel)
        {
            //Instantiate new PropertyManagerUser
            PropertyManagerUser user = new PropertyManagerUser
            {
                UserName = userModel.EmailAddress,
                Email = userModel.EmailAddress,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                PhoneNumber = userModel.PhoneNumber
            };

            //Creates user and stores password in encrypted format
            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        //Pass registration field to userManager to perform search and return null if no result is found

        public async Task<PropertyManagerUser> FindUser (string userName, string password)
        {
            return await _userManager.FindAsync(userName, password);
        }
        public void Dispose()
        {
            _dataContext.Dispose();
            _userManager.Dispose();
        }
    }

}