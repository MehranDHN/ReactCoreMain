using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactCore.Model;

namespace ReactCore.DataAccess
{
    public class Repository
    {
        public static List<InvoiceItem> Items
        {
            get
            {
                List<InvoiceItem> items = new List<InvoiceItem>();
                int counter = 1;
                items.Add(new InvoiceItem {
                    Description = String.Format("Description {0}", counter) ,
                    Id = counter++,
                    Price = 215,
                    ProductCategory = 1,
                    ProductId = 1,
                    Qty = 3
                });
                items.Add(new InvoiceItem
                {
                    Description = String.Format("Description {0}", counter),
                    Id = counter++,
                    Price = 150,
                    ProductCategory = 3,
                    ProductId = 2,
                    Qty = 1
                });
                items.Add(new InvoiceItem
                {
                    Description = String.Format("Description {0}", counter),
                    Id = counter++,
                    Price = 215,
                    ProductCategory = 1,
                    ProductId = 3,
                    Qty = 2
                });
                items.Add(new InvoiceItem
                {
                    Description = String.Format("Description {0}", counter),
                    Id = counter++,
                    Price = 310,
                    ProductCategory = 2,
                    ProductId = 4,
                    Qty = 3
                });
                items.Add(new InvoiceItem
                {
                    Description = String.Format("Description {0}", counter),
                    Id = counter++,
                    Price = 420,
                    ProductCategory = 3,
                    ProductId = 5,
                    Qty = 1
                });
                items.Add(new InvoiceItem
                {
                    Description = String.Format("Description {0}", counter),
                    Id = counter++,
                    Price = 710,
                    ProductCategory = 2,
                    ProductId = 6,
                    Qty = 2
                });
                return items;
            }
        }
    }
}
