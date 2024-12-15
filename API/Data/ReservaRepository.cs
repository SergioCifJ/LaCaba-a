using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<Reserva>> GetAllReservasAsync()
        {
            return await _context.Reservas.ToListAsync();
        }

        public async Task<IEnumerable<Reserva>> GetReservasByFechaAsync(DateTime fecha)
        {
            return await _context.Reservas
                .Include(r => r.Usuario)
                .Where(r => r.Fecha == DateOnly.FromDateTime(fecha))
                .ToListAsync();
        }
    }
}

