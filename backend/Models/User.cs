using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        public required string Email { get; set; }

        public required string HashPassword { get; set; }

        public required string Role { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiraryTime { get; set; }
    }
}