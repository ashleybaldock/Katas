using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace CheckoutKata.Tests
{
    public class CheckoutTests
    {
        [Fact]
        public void GivenACheckoutWithNoItems_GetTotalPrice_ReturnsZero()
        {
            var checkout = new Checkout(new List<PricingRule>());

            Assert.Equal(0, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithSomeItemsAndNoPricingRules_GetTotalPrice_ReturnsZero()
        {
            var checkout = new Checkout(new List<PricingRule>());

            checkout.Scan("A");
            checkout.Scan("B");
            checkout.Scan("C");
            checkout.Scan("D");

            Assert.Equal(0, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithSomeItemsAndAPricingRule_GetTotalPrice_ReturnsCorrectValue()
        {
            var checkout = new Checkout(new List<PricingRule> { new PricingRule("A", 50) });

            checkout.Scan("A");
            checkout.Scan("B");
            checkout.Scan("C");
            checkout.Scan("D");

            Assert.Equal(50, checkout.GetTotalPrice());
        }
        
        [Fact]
        public void GivenACheckoutWithSomeItemsAndADifferentPricingRule_GetTotalPrice_ReturnsCorrectValue()
        {
            var checkout = new Checkout(new List<PricingRule> { new PricingRule("B", 40) });

            checkout.Scan("A");
            checkout.Scan("B");
            checkout.Scan("C");
            checkout.Scan("D");

            Assert.Equal(40, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithNoItemsAndAPricingRule_GetTotalPrice_ReturnsZero()
        {
            var checkout = new Checkout(new List<PricingRule> { new PricingRule("B", 40) });

            Assert.Equal(0, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithAPricingRuleAndMismatchedItems_GetTotalPrice_ReturnsZero()
        {
            var checkout = new Checkout(new List<PricingRule> { new PricingRule("B", 40) });

            checkout.Scan("C");
            checkout.Scan("D");

            Assert.Equal(0, checkout.GetTotalPrice());
        }
        
        [Fact]
        public void GivenACheckoutWithTwoIdenticalPricingRulesAndMatchingItems_GetTotalPrice_DoesNotCountItemsTwice()
        {
            var checkout = new Checkout(new List<PricingRule> {
                new PricingRule("A", 50),
                new PricingRule("A", 50)
                });
            
            checkout.Scan("A");
            checkout.Scan("A");
            
            Assert.Equal(100, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithPricingRuleAndMatchingItem_CallingGetTotalPriceTwice_ReturnsSame()
        {
            var checkout = new Checkout(new List<PricingRule> { new PricingRule("A", 50) });
            
            checkout.Scan("A");
            checkout.Scan("A");
            
            Assert.Equal(100, checkout.GetTotalPrice());
            Assert.Equal(100, checkout.GetTotalPrice());
        }

        [Theory]
        [InlineData("", 0)]
        [InlineData("A", 50)]
        [InlineData("BB", 80)]
        [InlineData("AABB", 180)]
        [InlineData("ABCD", 125)]
        [InlineData("AAAA", 200)]
        [InlineData("DDCC", 70)]
        [InlineData("CCCCC", 100)]
        public void GivenACheckoutWithPricingRules_AndItems_CallingGetTotalPrice_ReturnsCorrectPrice(string items, int expectedTotalPrice)
        {
            var checkout = new Checkout(new List<PricingRule> {
                new PricingRule("A", 50),
                new PricingRule("B", 40),
                new PricingRule("C", 20),
                new PricingRule("D", 15),
                });
            
            foreach (var item in items)
            {
                checkout.Scan(item.ToString());

            }
            
            Assert.Equal(expectedTotalPrice, checkout.GetTotalPrice());
        }
    }
}
