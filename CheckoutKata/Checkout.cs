using System;
using CheckoutKata.Tests;

namespace CheckoutKata
{
    public class Checkout : ICheckout
    {
        private PricingRule pricingRule;

        public Checkout(PricingRule pricingRule)
        {
            this.pricingRule = pricingRule;
        }

        public int GetTotalPrice()
        {
            // Now we have to actually implement something
            if (this.pricingRule != null)
            {
                return pricingRule.RulePrice;
            }
            return 0;
        }

        public void Scan(string item)
        {
            
        }
    }
}
