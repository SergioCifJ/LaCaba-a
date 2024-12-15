using API.Entities;
using API.Interfaces;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AccountController(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            try
            {
                var user = await _userRepository.GetUserByCorreoAsync(loginDto.Correo);
                if (user == null) return Unauthorized("Correo incorrecto.");

                using var hmac = new HMACSHA512(user.ContrasenaSalt);
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Contrasena));


                if (!computedHash.SequenceEqual(user.ContrasenaHash))
                    return Unauthorized("Contraseña incorrecta.");

                var token = await _tokenService.CreateToken(user);

                return new UserDto
                {
                    Id = user.Id,
                    Correo = user.Correo,
                    Token = token,
                    Nombre = user.Nombre,
                    IsAdmin = user.IsAdmin,
                };

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        private async Task<bool> UserExist(string correo)
        {
            return await _userRepository.UserExist(correo.ToLower());
        }
    }
}
