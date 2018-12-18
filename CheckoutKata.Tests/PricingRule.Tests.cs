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

        [Fact]
        public void PricingRule_ProcessWithDictionaryContainingNonMatchingItems_ReturnsZeroResultWithInputDictionary()
        {
            var pricingRule = new PricingRule("A", 40);

            var result = pricingRule.Process(new Dictionary<string, int> { { "B", 1 }, { "C", 2 } });

            Assert.Equal(0, result.SubTotal);
            Assert.Equal(new Dictionary<string, int> { { "B", 1 }, { "C", 2 } }, result.RemainingItems);
        }

        [Fact]
        public void PricingRule_ProcessWithDictionaryContainingOneMatchingItem_ReturnsZeroResultAndDictionaryWithItemRemoved()
        {
            var pricingRule = new PricingRule("A", 40);

            var result = pricingRule.Process(new Dictionary<string, int> { { "A", 1 }, { "C", 2 } });

            Assert.Equal(40, result.SubTotal);
            Assert.Equal(new Dictionary<string, int> { { "A", 0 }, { "C", 2 } }, result.RemainingItems);
        }

        [Fact]
        public void PricineRule_Process_DoesNotModifyOriginalDictionary()
        {
            var pricingRule = new PricingRule("A", 40);

            var inputDictionary = new Dictionary<string, int> { { "A", 1 }, { "C", 2 } };

            var result = pricingRule.Process(inputDictionary);

            Assert.Equal(new Dictionary<string, int> { { "A", 0 }, { "C", 2 } }, result.RemainingItems);
            Assert.Equal(new Dictionary<string, int> { { "A", 1 }, { "C", 2 } }, inputDictionary);
        }
    }
}