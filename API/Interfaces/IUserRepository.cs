using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByNombreAsync(string nombre);
        Task<AppUser> GetUserByCorreoAsync(string correo);
        Task<AppUser> AddUserAsync(AppUser user);
        Task<bool> SaveAllAsync();
        Task<bool> UserExist(string correo);

    }
}
