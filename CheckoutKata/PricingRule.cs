namespace CheckoutKata.Tests
{
    public class PricingRule
    {
        private string matchingSkus;

        private int rulePrice;

        public PricingRule(string matchingSkus, int rulePrice)
        {
            this.matchingSkus = matchingSkus;
            this.rulePrice = rulePrice;
        }
    }
}