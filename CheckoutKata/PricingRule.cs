using System;
using System.Collections.Generic;

namespace CheckoutKata.Tests
{
    public class PricingRule
    {
        private string ruleSku;

        private int rulePrice;

        public PricingRule(string ruleSku, int rulePrice)
        {
            this.ruleSku = ruleSku;
            this.rulePrice = rulePrice;
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
            return new RuleResult(dictionaryCopy, matchCount * rulePrice);
        }
    }
}