using System;
using System.Collections.Generic;
using Xunit;

namespace CheckoutKata.Tests
{
    public class PricingRuleTests
    {
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
        public void PricingRule_Process_DoesNotModifyOriginalDictionary()
        {
            var pricingRule = new PricingRule("A", 40);

            var inputDictionary = new Dictionary<string, int> { { "A", 1 }, { "C", 2 } };

            var result = pricingRule.Process(inputDictionary);

            Assert.Equal(new Dictionary<string, int> { { "A", 0 }, { "C", 2 } }, result.RemainingItems);
            Assert.Equal(new Dictionary<string, int> { { "A", 1 }, { "C", 2 } }, inputDictionary);
        }

        // This test passes 'by accident'
        [Fact]
        public void MultiItemPricingRule_WithInSufficientItems_Process_RemovesNoItemsAndReturnsZero()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<string, int> { { "A", 1 }, { "C", 2 } });

            Assert.Equal(0, result.SubTotal);
            Assert.Equal(new Dictionary<string, int> { { "A", 1 }, { "C", 2 } }, result.RemainingItems);
        }

        [Fact]
        public void MultiItemPricingRule_WithExactNumberOfItems_Process_RemovesItemsAndReturnsCorrectSum()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<string, int> { { "A", 3 }, { "C", 2 } });

            Assert.Equal(130, result.SubTotal);
            Assert.Equal(new Dictionary<string, int> { { "A", 0 }, { "C", 2 } }, result.RemainingItems);
        }

        [Fact]
        public void MultiItemPricingRule_WithMoreThanEnoughItems_Process_RemovesMatchingItemsAndReturnsCorrectSum()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<string, int> { { "A", 4 }, { "C", 2 } });

            Assert.Equal(130, result.SubTotal);
            Assert.Equal(new Dictionary<string, int> { { "A", 1 }, { "C", 2 } }, result.RemainingItems);
        }

        [Fact]
        public void MultiItemPricingRule_WithMoreThanTwiceEnoughItems_Process_RemovesMatchingItemsAndReturnsCorrectSum()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<string, int> { { "A", 8 }, { "C", 2 } });

            Assert.Equal(260, result.SubTotal);
            Assert.Equal(new Dictionary<string, int> { { "A", 2 }, { "C", 2 } }, result.RemainingItems);
        }
    }
}