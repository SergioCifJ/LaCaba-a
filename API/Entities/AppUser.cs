namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Correo { get; set; }
        public byte[] ContraseñaHash { get; set; }
        public byte[] ContraseñaSalt { get; set; }
    }
}