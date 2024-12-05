using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Contrasena : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContraseñaSalt",
                table: "Usuarios",
                newName: "ContrasenaSalt");

            migrationBuilder.RenameColumn(
                name: "ContraseñaHash",
                table: "Usuarios",
                newName: "ContrasenaHash");

            migrationBuilder.RenameColumn(
                name: "Contraseña",
                table: "Usuarios",
                newName: "Contrasena");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContrasenaSalt",
                table: "Usuarios",
                newName: "ContraseñaSalt");

            migrationBuilder.RenameColumn(
                name: "ContrasenaHash",
                table: "Usuarios",
                newName: "ContraseñaHash");

            migrationBuilder.RenameColumn(
                name: "Contrasena",
                table: "Usuarios",
                newName: "Contraseña");
        }
    }
}
