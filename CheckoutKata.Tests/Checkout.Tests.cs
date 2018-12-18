using System;
using Xunit;

namespace CheckoutKata.Tests
{
    public class CheckoutTests
    {
        [Fact]
        public void GivenACheckoutWithNoItems_GetTotalPrice_ReturnsZero()
        {
            var checkout = new Checkout(null);

            Assert.Equal(0, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithSomeItemsAndNoPricingRules_GetTotalPrice_ReturnsZero()
        {
            var checkout = new Checkout(null);

            checkout.Scan("A");
            checkout.Scan("B");
            checkout.Scan("C");
            checkout.Scan("D");

            Assert.Equal(0, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithSomeItemsAndAPricingRule_GetTotalPrice_ReturnsCorrectValue()
        {
            var checkout = new Checkout(new PricingRule("A", 50));

            checkout.Scan("A");
            checkout.Scan("B");
            checkout.Scan("C");
            checkout.Scan("D");

            Assert.Equal(50, checkout.GetTotalPrice());
        }
        
        [Fact]
        public void GivenACheckoutWithSomeItemsAndADifferentPricingRule_GetTotalPrice_ReturnsCorrectValue()
        {
            var checkout = new Checkout(new PricingRule("B", 40));

            checkout.Scan("A");
            checkout.Scan("B");
            checkout.Scan("C");
            checkout.Scan("D");

            Assert.Equal(40, checkout.GetTotalPrice());
        }

        [Fact]
        public void GivenACheckoutWithNoItemsAndAPricingRule_GetTotalPrice_ReturnsZero()
        {
            var checkout = new Checkout(new PricingRule("B", 40));

            Assert.Equal(0, checkout.GetTotalPrice());
        }
    }
}
