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
    }
}