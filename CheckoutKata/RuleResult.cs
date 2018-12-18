using System.Collections.Generic;

namespace CheckoutKata.Tests
{
    public class RuleResult
    {
        public RuleResult(Dictionary<string, int> remainingItems, int subTotal)
        {
            RemainingItems = remainingItems;
            SubTotal = subTotal;
        }

        public Dictionary<string, int> RemainingItems { get; private set; }

        public int SubTotal { get; private set; }
    }
}