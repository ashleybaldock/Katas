using System;

namespace CheckoutKata.Tests
{
    public class Item
    {
        public string Sku { get; private set; }

        public Item(string sku)
        {
            if (sku.Length == 0 || sku.Length > 1) { throw new ArgumentException("Item SKU must be a single character string"); }
            this.Sku = sku;
        }
    }
}