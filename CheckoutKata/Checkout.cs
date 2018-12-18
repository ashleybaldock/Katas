using System;
using System.Collections.Generic;
using CheckoutKata.Tests;

namespace CheckoutKata
{
    public class Checkout : ICheckout
    {
        private int totalPrice = 0;

        private List<PricingRule> pricingRules;

        public Checkout(List<PricingRule> pricingRules)
        {
            this.pricingRules = pricingRules;
        }

        public int GetTotalPrice()
        {
            return totalPrice;
        }

        public void Scan(string item)
        {
            foreach (var pricingRule in pricingRules)
            {
                totalPrice += pricingRule.Matches(item);
            }
        }
    }
}
