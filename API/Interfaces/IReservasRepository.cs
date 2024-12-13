using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Interfaces
{
    public interface IReservasRepository
    {
        Task AddReservaAsync(Reserva reserva);
    }
}

namespace API.Data
{
    public class ReservaRepository : IReservasRepository
    {
        private readonly DataContext _context;

        public ReservaRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddReservaAsync(Reserva reserva)
        {
            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();
        }
    }
}
