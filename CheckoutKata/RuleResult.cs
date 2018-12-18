using System.Collections.Generic;

namespace CheckoutKata.Tests
{
    public class RuleResult
    {
        public RuleResult(Dictionary<Item, int> remainingItems, int subTotal)
        {
            RemainingItems = remainingItems;
            SubTotal = subTotal;
        }

        public Dictionary<Item, int> RemainingItems { get; private set; }

        public int SubTotal { get; private set; }
    }
}