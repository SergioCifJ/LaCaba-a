using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeedMenu
    {
        public static async Task SeedMenuDB(DataContext context)
        {
            if (await context.Menus.AnyAsync()) return;

            var menuData = await File.ReadAllTextAsync("Data/MenuSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var menus = JsonSerializer.Deserialize<List<Menu>>(menuData);
            if (menus == null || !menus.Any())
            {
                throw new Exception("No se pudo deserializar el archivo JSON o no hay datos.");
            }

            foreach (var menu in menus)
            {
                Console.WriteLine($"Cargando menú: {menu.Nombre}");
                menu.Nombre = menu.Nombre.ToLower();
                menu.Descripcion = menu.Descripcion.ToLower();
                context.Menus.Add(menu);
            }


            await context.SaveChangesAsync();
        }
    }
}