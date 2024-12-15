using System.Security.Claims;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservasController : ControllerBase
    {
        private readonly IReservasRepository _reservaRepository;
        private readonly IUserRepository _userRepository;

        public ReservasController(IReservasRepository reservaRepository, IUserRepository userRepository)
        {
            _reservaRepository = reservaRepository;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpPost("reservar")]
        public async Task<ActionResult<Reserva>> CreateReserva([FromBody] Reserva reservaDto)
        {
            // Obtener el UserId desde el token JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No se encontró el usuario autenticado.");
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            var reserva = new Reserva
            {
                Fecha = reservaDto.Fecha,
                Hora = reservaDto.Hora,
                NumComensales = reservaDto.NumComensales,
                Usuario = user
            };

            try
            {
                await _reservaRepository.AddReservaAsync(reserva);
                return Ok(reserva);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear la reserva: {ex.Message}");
            }
        }

    }
}