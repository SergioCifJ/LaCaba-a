
namespace API.Entities
{
    public class Reserva
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public int NumComensales { get; set; }
        public required AppUser Usuario {get; set;}
    }
}