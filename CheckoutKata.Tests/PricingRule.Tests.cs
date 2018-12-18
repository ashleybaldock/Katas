using System;
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
    }
}