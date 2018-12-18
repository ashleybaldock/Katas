using System;
using Xunit;

namespace CheckoutKata.Tests
{
    public class PricingRuleTests
    {
        [Fact]
        public void CanCreatePricingRule_WithRuleAndPrice()
        {
            var pricingRule = new PricingRule("A", 50);
        }
    }
}