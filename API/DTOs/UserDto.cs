namespace API.DTOs
{
    public class UserDto
    {
        public string Correo { get; set; }
        public string Nombre { get; set; }
        public string Token { get; set; }
        public int Id { get; set; }
        public bool IsAdmin { get; set; }
    }
}