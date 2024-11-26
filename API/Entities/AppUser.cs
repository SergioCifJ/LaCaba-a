namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Correo { get; set; }
    }
}