## Checkout kata

Implementation of this kata: http://codekata.com/kata/kata09-back-to-the-checkout/ in C#.

```
dotnet test
```

To run the test suite (uses xunit).

Checkout class implements ICheckout (from kata).

Prices for individual items/combinations of items are implemented by passing Checkout ctor a list of PricingRule objects. These define a Process method which processes all the items to find those that match the rule (returning a result containing non-matching items for the next rule to process). Checkout's GetTotalPrice method takes care of running all the rules in sequence. The order the rules are applied in affects the output.

This solution is easy to extend to permit pricing rules making up combinations of different items. It'd also be fairly easy to use non-single-digit SKUs. 