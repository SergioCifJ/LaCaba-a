using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<AppUser?> GetUserByIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<AppUser?> GetUserByNombreAsync(string nombre)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Nombre == nombre);
        }

        public async Task<AppUser?> GetUserByCorreoAsync(string correo)
        {
            try
            {
                return await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.Correo.ToLower() == correo.ToLower());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching user by correo: {ex.Message}");
                throw;
            }
        }

        public async Task<AppUser> AddUserAsync(AppUser user)
        {
            _context.Usuarios.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UserExist(string correo)
        {
            try
            {
                return await _context.Usuarios.AnyAsync(u => u.Correo.ToLower() == correo.ToLower());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking user existence: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }

}
