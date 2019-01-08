using System;
using System.Collections.Generic;
using System.Linq;
using CheckoutKata.Tests;

namespace CheckoutKata
{
    public class Checkout : ICheckout
    {
        private List<PricingRule> pricingRules;

        private Dictionary<Item, int> scannedItems = new Dictionary<Item, int>();

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
            var newItem = new Item(item);
            if (!scannedItems.ContainsKey(newItem))
            {
                scannedItems.Add(newItem, 0);
            }
            scannedItems[newItem] += 1;
        }
    }
}
