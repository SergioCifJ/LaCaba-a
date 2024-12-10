using API.Entities;
using API.Interfaces;
using API.DTOs;
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

        // Registro de usuario
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Verificar si el usuario ya existe
            if (await UserExist(registerDto.Correo)) return BadRequest("Correo ya está registrado.");

            // Crear el usuario a partir del DTO
            var user = new AppUser
            {
                Nombre = registerDto.Nombre,
                Correo = registerDto.Correo.ToLower()
            };

            // Crear el token para el nuevo usuario
            var token = await _tokenService.CreateToken(user);

            return new UserDto
            {
                Correo = user.Correo,
                Token = token,
                Nombre = user.Nombre,
            };
        }

        // Iniciar sesión
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // Obtener el usuario por correo
            var user = await _userRepository.GetUserByCorreoAsync(loginDto.Correo);

            if (user == null) return Unauthorized("Correo incorrecto.");

            // Verificar si la contraseña es correcta
            if (user.Contrasena != loginDto.Contrasena)
            {
                return Unauthorized("Contraseña incorrecta.");
            }

            // Crear el token para el usuario
            var token = await _tokenService.CreateToken(user);

            return new UserDto
            {
                Correo = user.Correo,
                Token = token,
                Nombre = user.Nombre,
            };
        }

        // Método privado para verificar si un usuario existe
        private async Task<bool> UserExist(string correo)
        {
            return await _userRepository.UserExist(correo.ToLower());
        }
    }
}
