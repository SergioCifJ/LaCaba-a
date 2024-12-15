namespace API.Entities
{
    public class Reserva
    {
        public int Id { get; set; }
        public DateOnly Fecha { get; set; }
        public string Hora { get; set; }
        public int NumComensales { get; set; }
        public required AppUser Usuario { get; set; }
    }
}
