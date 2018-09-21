using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCore.Model
{
    public class InvoiceItem
    {
        public int Id { get; set; }
        public int ProductCategory { get; set; }
        public int ProductId { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public decimal ItemTotal
        {
            get
            {
                return (Price * Qty);
            }
        }
    }
}
