using Microsoft.AspNet.Identity;
using PropertyManagerAPI.Infrastructure;
using PropertyManagerAPI.Models;
using System.Threading.Tasks;
using System.Web.Http;

namespace PropertyManagerAPI.Controllers
{
    public class AccountsController : ApiController
    {
        private AuthorizationRepository _repo = new AuthorizationRepository();

        //Post
        [Route("api/accounts/register")]
        public async Task<IHttpActionResult> Register(RegistrationModel userModel)
        {
            // Validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _repo.RegisterUser(userModel);

            IHttpActionResult errorResult = GetErrorResult(result);
            if (errorResult != null)
            {
                return errorResult;
            }
            return Ok();
        }

        //rolling up error message to return error result
        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if(!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }

                }
                if (ModelState.IsValid)
                {
                    //no model state errors available to send, just send bad request
                    return BadRequest();
                }
                return BadRequest(ModelState);
            }
            return null;
        }
        //clean up
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repo.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
   
