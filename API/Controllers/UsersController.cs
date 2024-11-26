using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            var users = _context.Usuarios.ToList();

            return users;
        }

        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUserById(int id)
        {
            var user = _context.Usuarios.Find(id);

            return user;
        }
    }
}