using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PurchaseOrderApi.Data;
using PurchaseOrderApi.Models;

namespace PurchaseOrderApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseOrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PurchaseOrdersController(AppDbContext context)
        {
            _context = context;
        }

        // LIST + FILTER + SORT + PAGINATION
        [HttpGet]
        public async Task<IActionResult> Get(string? supplier, string? status)
        {
            var query = _context.PurchaseOrders.AsQueryable();

            if (!string.IsNullOrEmpty(supplier))
                query = query.Where(p => p.SupplierName.Contains(supplier));

            if (!string.IsNullOrEmpty(status))
                query = query.Where(p => p.Status == status);

            var result = await query
                .OrderByDescending(p => p.OrderDate)
                .ToListAsync();

            return Ok(result);
        }

     [HttpGet("{id}")]
            public async Task<IActionResult> GetById(int id)
            {
                var po = await _context.PurchaseOrders.FindAsync(id);
                if (po == null) return NotFound();
                return Ok(po);
            }

      [HttpPost]
        public async Task<IActionResult> Create(PurchaseOrder po)
        {
        bool exists = await _context.PurchaseOrders
                            .AnyAsync(p => p.PoNumber == po.PoNumber);

        if (exists)
            return BadRequest("Purchase order number already exists.");

        _context.PurchaseOrders.Add(po);
        await _context.SaveChangesAsync();
        return Ok(po);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PurchaseOrder po)
        {
            if (id != po.Id) return BadRequest();
            _context.Update(po);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var po = await _context.PurchaseOrders.FindAsync(id);
            if (po == null) return NotFound();

            _context.PurchaseOrders.Remove(po);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
