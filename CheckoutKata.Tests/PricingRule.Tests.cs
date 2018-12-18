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
    }
}