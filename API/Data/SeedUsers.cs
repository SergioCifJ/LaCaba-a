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

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            if (users == null) throw new InvalidOperationException("No se pudieron deserializar los datos de los usuarios.");

            string defaultPassword = "password";

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.Nombre = user.Nombre.ToLower();
                user.Correo = user.Correo.ToLower();

                user.ContrasenaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(defaultPassword));
                user.ContrasenaSalt = hmac.Key;

                user.Contrasena = null;

                context.Usuarios.Add(user);
            }

            // Guardar los usuarios en la base de datos
            await context.SaveChangesAsync();

            // Asegurarse de que el usuario con Id = 1 sea administrador
            var adminUser = await context.Usuarios.FirstOrDefaultAsync(u => u.Id == 1);
            if (adminUser != null)
            {
                adminUser.IsAdmin = true;
                await context.SaveChangesAsync();
            }
        }
    }
}
