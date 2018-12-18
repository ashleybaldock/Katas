using System;
using System.Collections.Generic;

namespace CheckoutKata.Tests
{
    public class PricingRule
    {
        private string ruleSku;

        public int RulePrice { get; private set; }

        public PricingRule(string ruleSku, int rulePrice)
        {
            this.ruleSku = ruleSku;
            this.RulePrice = rulePrice;
        }

        public int Matches(string itemSku)
        {
            return itemSku == ruleSku ? RulePrice : 0;
        }
    }
}