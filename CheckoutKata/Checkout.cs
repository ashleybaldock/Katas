using System;
using System.Collections.Generic;
using System.Linq;
using CheckoutKata.Tests;

namespace CheckoutKata
{
    public class Checkout : ICheckout
    {
        private int totalPrice = 0;

        private List<PricingRule> pricingRules;

        private Dictionary<string, int> scannedItems = new Dictionary<string, int>();

        public Checkout(List<PricingRule> pricingRules)
        {
            this.pricingRules = pricingRules;
        }

        public int GetTotalPrice()
        {
            var runningTotal = 0;

            pricingRules.Aggregate(scannedItems, (remainingScannedItems, nextRule) => {
                var result = nextRule.Process(remainingScannedItems);
                runningTotal += result.SubTotal;
                return result.RemainingItems;
            });
            
            return runningTotal;
        }

        public void Scan(string item)
        {
            if (!scannedItems.ContainsKey(item))
            {
                scannedItems.Add(item, 0);
            }
            scannedItems[item] += 1;
        }
    }
}
