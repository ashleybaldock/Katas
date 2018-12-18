namespace CheckoutKata.Tests
{
    public class Item
    {
        public string Sku { get; private set; }

        public Item(string sku)
        {
            this.Sku = sku;
        }
    }
}