using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> db) : base(db) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Worker> Workers { get; set; }

        public DbSet<Company> Companies { get; set; }
    }
}