using System;
using CheckoutKata.Tests;

namespace CheckoutKata
{
    public class Checkout : ICheckout
    {
        private PricingRule pricingRule;

        private int totalPrice = 0;

        public Checkout(PricingRule pricingRule)
        {
            this.pricingRule = pricingRule;
        }

        public int GetTotalPrice()
        {
            return totalPrice;
        }

        public void Scan(string item)
        {
            if (pricingRule != null)
            {
                totalPrice += pricingRule.Matches(item);
            }
        }
    }
}
