import type { CheckoutLineFragment } from "@core/api";
import { checkout } from "@core/checkout/lib/fixtures";
import {
  getSummaryLineAttributesText,
  isCheckoutLine,
} from "@core/checkout/components/sections/Summary/utils";

describe("getSummaryLineAttributesText", () => {
  it("should return properly formatted string for line with attributes", () => {
    const line = checkout.lines[0];

    expect(getSummaryLineAttributesText(line as CheckoutLineFragment)).toEqual(
      "White, 45cm x 45cm, aaaa, 1, 700ml, XS"
    );
  });

  it("should return empty string for line without attributes", () => {
    const line = {
      ...checkout.lines[0],
      variant: { ...checkout.lines[0]?.variant, attributes: [] },
    };

    expect(getSummaryLineAttributesText(line as CheckoutLineFragment)).toEqual(
      ""
    );
  });
});

describe("isCheckoutLine", () => {
  it("should return true for checkout line", () => {
    const line = checkout.lines[0];
    expect(isCheckoutLine(line as CheckoutLineFragment)).toEqual(true);
  });
});
