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

        public RuleResult Process(Dictionary<string, int> dictionary)
        {
            var matchCount = 0;
            if (dictionary.ContainsKey(ruleSku))
            {
                matchCount = dictionary[ruleSku];
                dictionary[ruleSku] = 0;
            }
            return new RuleResult(dictionary, matchCount * RulePrice);
        }
    }
}