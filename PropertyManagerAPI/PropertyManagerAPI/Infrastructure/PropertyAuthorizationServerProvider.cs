using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace PropertyManagerAPI.Infrastructure
{
    // inherits from oauthserverprovider 
    public class PropertyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        // 2 override methods 
        //check login context
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();

        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)

        {
            //allow CORS specfically for OAuth and Authenticate
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });



            //Find User Base on Username and Password in Auth Repository 
            using (var authorizationRepository = new AuthorizationRepository())

            {
                var user = await authorizationRepository.FindUser(context.UserName, context.Password);
                //throw error if no user found
                if (user == null )
                {
                    context.SetError("invalid_grant", "username or password is incorrect");
                }
                else
                {
                    // creat a token and add some claims
                    var token = new ClaimsIdentity(context.Options.AuthenticationType);
                    token.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                    token.AddClaim(new Claim(ClaimTypes.Role, "user"));
                    context.Validated(token);
                }
            }
    

        }

    }
}