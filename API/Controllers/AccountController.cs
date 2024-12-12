using API.Entities;
using API.Interfaces;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AccountController(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExist(registerDto.Correo)) return BadRequest("Correo ya está registrado.");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Nombre = registerDto.Nombre,
                Correo = registerDto.Correo.ToLower(),
                ContrasenaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Contrasena)),
                ContrasenaSalt = hmac.Key
            };

            await _userRepository.AddUserAsync(user);

            var token = await _tokenService.CreateToken(user);

            return new UserDto
            {
                Correo = user.Correo,
                Token = token,
                Nombre = user.Nombre,
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
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
                Correo = user.Correo,
                Token = token,
                Nombre = user.Nombre,
            };
        }

        private async Task<bool> UserExist(string correo)
        {
            return await _userRepository.UserExist(correo.ToLower());
        }
    }
}