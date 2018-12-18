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

        public override bool Equals(object obj)
        {
            return obj != null && Equals(obj as Item);
        }

        public bool Equals(Item other)
        {
            return other != null && other.Sku == Sku;
        }

        public override int GetHashCode()
        {
            return Sku.GetHashCode();
        }
    }
}