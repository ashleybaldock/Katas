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
            var dictionaryCopy = new Dictionary<string, int>(dictionary);
            var matchCount = 0;
            if (dictionaryCopy.ContainsKey(ruleSku))
            {
                matchCount = dictionaryCopy[ruleSku];
                dictionaryCopy[ruleSku] = 0;
            }
            return new RuleResult(dictionaryCopy, matchCount * RulePrice);
        }
    }
}