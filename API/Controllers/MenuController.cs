using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MenuController
    {
        private readonly DataContext _context;
        public MenuController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Menu>> GetMenu()
        {
            var menu = _context.Menus.ToList();

            return menu;
        }

        [HttpGet("{id}")]
        public ActionResult<Menu> GetPlatoById(int id)
        {
            var menu = _context.Menus.Find(id);

            return menu;
        }
    }
}