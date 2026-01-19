using Microsoft.EntityFrameworkCore;
using PurchaseOrderApi.Models;

namespace PurchaseOrderApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Add DbSet for PurchaseOrders
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PurchaseOrder>()
                .HasIndex(p => p.PoNumber)
                .IsUnique();
        }


    }
}
