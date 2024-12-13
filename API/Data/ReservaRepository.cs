using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Data
{
    public class ReservasRepository : IReservasRepository
    {
        private readonly DataContext _context;

        public ReservasRepository(DataContext context)
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
