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

            var result = pricingRule.Process(new Dictionary<Item, int> ());

            Assert.Equal(0, result.SubTotal);
            Assert.Equal(new Dictionary<Item, int>(), result.RemainingItems);
        }

        [Fact]
        public void PricingRule_ProcessWithDictionaryContainingNonMatchingItems_ReturnsZeroResultWithInputDictionary()
        {
            var pricingRule = new PricingRule("A", 40);

            var result = pricingRule.Process(new Dictionary<Item, int> { { new Item("B"), 1 }, { new Item("C"), 2 } });

            Assert.Equal(0, result.SubTotal);
            Assert.Equal(new Dictionary<Item, int> { { new Item("B"), 1 }, { new Item("C"), 2 } }, result.RemainingItems);
        }

        [Fact]
        public void PricingRule_ProcessWithDictionaryContainingOneMatchingItem_ReturnsZeroResultAndDictionaryWithItemRemoved()
        {
            var pricingRule = new PricingRule("A", 40);

            var result = pricingRule.Process(new Dictionary<Item, int> { { new Item("A"), 1 }, { new Item("C"), 2 } });

            Assert.Equal(40, result.SubTotal);
            Assert.Equal(new Dictionary<Item, int> { { new Item("A"), 0 }, { new Item("C"), 2 } }, result.RemainingItems);
        }

        [Fact]
        public void PricingRule_Process_DoesNotModifyOriginalDictionary()
        {
            var pricingRule = new PricingRule("A", 40);

            var inputDictionary = new Dictionary<Item, int> { { new Item("A"), 1 }, { new Item("C"), 2 } };

            var result = pricingRule.Process(inputDictionary);

            Assert.Equal(new Dictionary<Item, int> { { new Item("A"), 0 }, { new Item("C"), 2 } }, result.RemainingItems);
            Assert.Equal(new Dictionary<Item, int> { { new Item("A"), 1 }, { new Item("C"), 2 } }, inputDictionary);
        }

        // This test passes 'by accident'
        [Fact]
        public void MultiItemPricingRule_WithInSufficientItems_Process_RemovesNoItemsAndReturnsZero()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<Item, int> { { new Item("A"), 1 }, { new Item("C"), 2 } });

            Assert.Equal(0, result.SubTotal);
            Assert.Equal(new Dictionary<Item, int> { { new Item("A"), 1 }, { new Item("C"), 2 } }, result.RemainingItems);
        }

        [Fact]
        public void MultiItemPricingRule_WithExactNumberOfItems_Process_RemovesItemsAndReturnsCorrectSum()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<Item, int> { { new Item("A"), 3 }, { new Item("C"), 2 } });

            Assert.Equal(130, result.SubTotal);
            Assert.Equal(new Dictionary<Item, int> { { new Item("A"), 0 }, { new Item("C"), 2 } }, result.RemainingItems);
        }

        [Fact]
        public void MultiItemPricingRule_WithMoreThanEnoughItems_Process_RemovesMatchingItemsAndReturnsCorrectSum()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<Item, int> { { new Item("A"), 4 }, { new Item("C"), 2 } });

            Assert.Equal(130, result.SubTotal);
            Assert.Equal(new Dictionary<Item, int> { { new Item("A"), 1 }, { new Item("C"), 2 } }, result.RemainingItems);
        }

        [Fact]
        public void MultiItemPricingRule_WithMoreThanTwiceEnoughItems_Process_RemovesMatchingItemsAndReturnsCorrectSum()
        {
            var pricingRule = new PricingRule("AAA", 130);

            var result = pricingRule.Process(new Dictionary<Item, int> { { new Item("A"), 8 }, { new Item("C"), 2 } });

            Assert.Equal(260, result.SubTotal);
            Assert.Equal(new Dictionary<Item, int> { { new Item("A"), 2 }, { new Item("C"), 2 } }, result.RemainingItems);
        }

        [Fact]
        public void PricingRuleCtor_WithEmptyString_ThrowsException()
        {
            Exception ex = Assert.Throws<ArgumentException>(() => new PricingRule("", 0));
            Assert.Equal("PricingRule must match at least one item", ex.Message);
        }

        [Fact]
        public void PricingRuleCtor_WithNullskus_ThrowsException()
        {
            Exception ex = Assert.Throws<ArgumentException>(() => new PricingRule(null, 0));
            Assert.Equal("PricingRule must match at least one item", ex.Message);
        }

        [Fact]
        public void PricingRuleCtor_WithMixedItems_ThrowsException()
        {
            Exception ex = Assert.Throws<ArgumentException>(() => new PricingRule("AB", 0));
            Assert.Equal("PricingRule must match only one type of item", ex.Message);
        }
    }
}