using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeedUsers
    {
        public static async Task SeedUsersDB(DataContext context)
        {
            if (await context.Usuarios.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.Nombre = user.Nombre.ToLower();
                user.Correo = user.Correo.ToLower();
                user.ContraseñaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                user.ContraseñaSalt = hmac.Key;

                context.Usuarios.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}