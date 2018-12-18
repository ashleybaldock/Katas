namespace CheckoutKata.Tests
{
    public class PricingRule
    {
        private string matchingSkus;

        public int RulePrice { get; private set; }

        public PricingRule(string matchingSkus, int rulePrice)
        {
            this.matchingSkus = matchingSkus;
            this.RulePrice = rulePrice;
        }
    }
}