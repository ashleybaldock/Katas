using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace CheckoutKata.Tests
{
    public class ItemTests
    {
        [Fact]
        public void GivenANewItem_CtorWithEmptyString_ThrowsException()
        {
            Exception ex = Assert.Throws<ArgumentException>(() => new Item(""));
            Assert.Equal("Item SKU must be a single character string", ex.Message);
        }

        [Fact]
        public void GivenANewItem_CtorWithMultiCharacterString_ThrowsException()
        {
            Exception ex = Assert.Throws<ArgumentException>(() => new Item("AA"));
            Assert.Equal("Item SKU must be a single character string", ex.Message);
        }

        [Fact]
        public void GivenANewItem_SetsSkuToValueFromCtor()
        {
            Assert.Equal("A", new Item("A").Sku);
        }

        [Fact]
        public void TwoItemsWithSameSkuAreEqual()
        {
            Assert.Equal(new Item("A"), new Item("A"));
            Assert.Equal(new Item("B"), new Item("B"));
            Assert.Equal(new Item("C"), new Item("C"));
            Assert.Equal(new Item("D"), new Item("D"));
        }

        [Fact]
        public void TwoItemsDifferentSkusAreNotEqual()
        {
            Assert.NotEqual(new Item("A"), new Item("B"));
        }
    }
}