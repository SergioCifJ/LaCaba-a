using System.Security.Cryptography;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUserById(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> AddUser(AppUser user)
        {
            var userByNombre = await _userRepository.GetUserByNombreAsync(user.Nombre);
            if (userByNombre != null)
            {
                return BadRequest("El nombre de usuario ya está en uso.");
            }

            var userByCorreo = await _userRepository.GetUserByCorreoAsync(user.Correo);
            if (userByCorreo != null)
            {
                return BadRequest("El correo electrónico ya está en uso.");
            }

            using var hmac = new HMACSHA512();
            user.ContrasenaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Contrasena));
            user.ContrasenaSalt = hmac.Key;
            user.Contrasena = null;

            var newUser = await _userRepository.AddUserAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }


    }
}
