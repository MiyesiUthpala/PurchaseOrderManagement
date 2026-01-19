using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PurchaseOrderApi.Models
{
    public class PurchaseOrder
    { public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string PoNumber { get; set; } = string.Empty;

        public string PoDescription { get; set; } = string.Empty;

        [Required]
        public string SupplierName { get; set; } = string.Empty;

        public DateTime OrderDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Required]
        public string Status { get; set; } = "Draft";
    }
}
