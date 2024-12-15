using API.Entities;

namespace API.Interfaces
{
    public interface IReservasRepository
    {
        Task AddReservaAsync(Reserva reserva);
        Task<IEnumerable<Reserva>> GetAllReservasAsync();
        Task<IEnumerable<Reserva>> GetReservasByFechaAsync(DateTime fecha);
        Task<bool> ExisteReservaAsync(DateOnly fecha, string hora);
    }
}
