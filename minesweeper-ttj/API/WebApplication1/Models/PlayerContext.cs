using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Models
{
    public class PlayerContext : DbContext
    {
        public PlayerContext(DbContextOptions<PlayerContext> options)
            : base(options)
        {
        }

        public DbSet<Player> Players { get; set; }

        public DbSet<API.Models.PlayerDTO> PlayerDTO { get; set; }
    }
}
