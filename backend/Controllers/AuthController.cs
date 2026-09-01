using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Controller]
    [Route("[controller]")]
    public class AuthController:ControllerBase
    {
        private DatabaseContext cont;
        private IConfiguration conf;

        public AuthController(DatabaseContext context, IConfiguration configuration)
        {
            conf = configuration;
            cont = context;
        }

        private string CreateToken(User u)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, u.UserID.ToString()),
                new Claim(ClaimTypes.Role, u.Role)
            };

            var key = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8
                .GetBytes(conf.GetSection("AppSettings:Token").Value!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                issuer: conf.GetSection("AppSettings:MyIssuer").Value,
                audience: conf.GetSection("AppSettings:MyAudince").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<string> CreateRefreshToken(User  u)
        {
            var random = new byte[32];

            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(random);

            string refresh = Convert.ToBase64String(random);

            u.RefreshToken = refresh;
            u.RefreshTokenExpiraryTime = DateTime.Now.AddDays(7);

            cont.Users.Update(u);
            await cont.SaveChangesAsync();

            return refresh;
        }

        [HttpPost("RefreshTokens")]
        public async Task<IActionResult> RefreshTokens()
        {
            try
            {
                var refresh = Request.Cookies["refreshToken"];

                if(string.IsNullOrEmpty(refresh))
                {
                    return Unauthorized();
                }

                var user = await cont.Users
                .FirstOrDefaultAsync(u => u.RefreshToken == refresh);

                if(user == null || user.RefreshTokenExpiraryTime <= DateTime.UtcNow)
                {
                    return Unauthorized();
                }

                var newAccessToken = CreateToken(user);
                var newRefreshToken = await CreateRefreshToken(user);

                Response.Cookies.Delete("refreshToken");
                Response.Cookies.Append("refreshToken", newRefreshToken, 
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7)                
                });

                return Ok( new { Token = newAccessToken } );
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            try
            {
                User newUser;

                if(dto.Password == string.Empty)
                {
                    return BadRequest("Password cannot be empty");
                }

                if(dto.Role != string.Empty && dto.Role == "Worker")
                {
                    if(await cont.Workers.AnyAsync(w => w.Username == dto.Username))
                    {
                        return BadRequest("Account with this username allready exists");
                    }

                    newUser = new Worker
                    {
                        Email = dto.Email,
                        FullName = dto.FullName!,
                        Role = dto.Role,
                        Username = dto.Username!,
                        JobTitle = dto.JobTitle!,
                        HashPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password)
                    };
                }
                else if(dto.Role == "Company")
                {
                    if(await cont.Companies.AnyAsync(c => c.PIB == dto.PIB))
                    {
                        return BadRequest("Company with this PIB allready have account");
                    }

                    newUser = new Company 
                    {
                        Email = dto.Email,
                        Role = dto.Role,
                        HashPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                        PIB = dto.PIB!,
                        CompanyName = dto.CompanyName!
                    };
                }
                else
                {
                    return BadRequest("Not valid user");
                }

                await cont.Users.AddAsync(newUser);
                await cont.SaveChangesAsync();

                return Ok("Account successfully created, please login to proced to our site");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                int userID = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
                var user = await cont.Users.FindAsync(userID);

                if(user == null)
                {
                    return BadRequest("User doesn't exist");
                }

                if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.HashPassword))
                {
                    return BadRequest("Passwords aren't matching");
                }

                string role = User.FindFirst(c => c.Type == ClaimTypes.Role)!.Value;

                if(role == "Worker")
                {
                    if(await cont.Workers.AnyAsync(w => w.Username != dto.Username))
                    {
                        return BadRequest("Work with that username doesn't exist");
                    }
                }
                else if(role == "Company")
                {
                    if(await cont.Companies.AnyAsync(c => c.PIB != dto.PIB))
                    {
                        return BadRequest("Company with this PIB doesn't exist");
                    }
                }
                else
                {
                    return BadRequest("You are not valid user");
                }

                var access = CreateToken(user);
                var refresh = await CreateRefreshToken(user);

                Response.Cookies.Append("refreshToken", refresh, 
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7)                
                });          

                return Ok(
                    new { Token = access, Message = "Successfully login" }
                );
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                int userID = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
                var user = await cont.Users.FindAsync(userID);

                if(user == null)
                {
                    return BadRequest("User doesn't exist");
                }

                user.RefreshToken = null;
                user.RefreshTokenExpiraryTime = null;
                Response.Cookies.Delete("refreshToken");

                cont.Users.Update(user);
                await cont.SaveChangesAsync();

                return Ok("You are successfully loged out");               
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteProfile")]
        public async Task<IActionResult> DeleteProfile()
        {
            try
            {
                int userID = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
                var user = await cont.Users.FindAsync(userID);

                if(user == null)
                {
                    return BadRequest("User doesn't exist");
                }

                cont.Users.Remove(user);
                await cont.SaveChangesAsync();

                return Ok("Profile successfully deleted");              
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}