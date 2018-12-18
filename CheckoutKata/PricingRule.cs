using System;
using System.Collections.Generic;

namespace CheckoutKata.Tests
{
    public class PricingRule
    {
        private string ruleSku;

        private int ruleCount;

        private int rulePrice;

        public PricingRule(string ruleSkus, int rulePrice)
        {
            // Assume that ruleSkus contains the same sku repeated
            this.ruleSku = ruleSkus[0].ToString();
            this.ruleCount = ruleSkus.Length;
            this.rulePrice = rulePrice;
        }

        public RuleResult Process(Dictionary<string, int> dictionary)
        {
            var dictionaryCopy = new Dictionary<string, int>(dictionary);
            var matchCount = 0;
            if (dictionaryCopy.ContainsKey(ruleSku) && dictionaryCopy[ruleSku] >= ruleCount)
            {
                matchCount = dictionaryCopy[ruleSku] / ruleCount;
                dictionaryCopy[ruleSku] = dictionaryCopy[ruleSku] % ruleCount;
            }
            return new RuleResult(dictionaryCopy, matchCount * rulePrice);
        }
    }
}