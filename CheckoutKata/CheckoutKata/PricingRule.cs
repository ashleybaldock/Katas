using System;
using System.Collections.Generic;
using System.Linq;

namespace CheckoutKata.Tests
{
    /*
        PricingRule specified as a group of matching items (e.g. "AAA" matches three A items)
        and a price for that rule
        Currently PricingRule must match only a single kind of item
    */
    public class PricingRule
    {
        private Item ruleSku;

        private int ruleCount;

        private int rulePrice;

        private bool RuleValid(string rule)
        {
            return rule.Distinct().Count() == 1;
        }

        public PricingRule(string ruleSkus, int rulePrice)
        {
            if (string.IsNullOrEmpty(ruleSkus)) { throw new ArgumentException("PricingRule must match at least one item"); }
            if (!RuleValid(ruleSkus)) { throw new ArgumentException("PricingRule must match only one type of item"); }
            
            this.ruleSku = new Item(ruleSkus[0].ToString());
            this.ruleCount = ruleSkus.Length;
            this.rulePrice = rulePrice;
        }

        /*
            Process a set of items to find total price of all that match this rule
            Returns a result containing non-matching items, and a price
         */
        public RuleResult Process(Dictionary<Item, int> dictionary)
        {
            var dictionaryCopy = new Dictionary<Item, int>(dictionary);
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