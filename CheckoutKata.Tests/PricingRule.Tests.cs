using System;
using System.Collections.Generic;
using Xunit;

namespace CheckoutKata.Tests
{
    public class PricingRuleTests
    {
        [Fact]
        public void GivenAPricingRule_RulePricePropertyIsSetCorrectlyFromCtor()
        {
            var pricingRule = new PricingRule("B", 40);

            Assert.Equal(40, pricingRule.RulePrice);

            var pricingRule2 = new PricingRule("B", 100);

            Assert.Equal(100, pricingRule2.RulePrice);
        }

        [Fact]
        public void GivenAPricingRule_WhenMatchesCalledWithMatchingItem_ReturnsPrice()
        {
            var pricingRule = new PricingRule("B", 40);

            Assert.Equal(40, pricingRule.Matches("B"));
        }

        [Fact]
        public void GivenAPricingRule_WhenMatchesCalledWithNonMatchingItem_ReturnsZero()
        {
            var pricingRule = new PricingRule("C", 40);

            Assert.Equal(0, pricingRule.Matches("B"));
        }

        [Fact]
        public void PricingRule_ProcessWithEmptyDictionary_ReturnsEmptyRuleResult()
        {
            var pricingRule = new PricingRule("A", 40);

            var result = pricingRule.Process(new Dictionary<string, int> ());

            Assert.Equal(0, result.SubTotal);
            Assert.Equal(new Dictionary<string, int>(), result.RemainingItems);
        }
    }
}