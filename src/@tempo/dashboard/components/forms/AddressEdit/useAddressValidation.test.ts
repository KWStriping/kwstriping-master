import { useAddressValidationRulesQuery } from "@tempo/graphql";
import { renderHook } from "@testing-library/react-hooks";

import { useAddressValidation } from "./useAddressValidation";

jest.mock("@tempo/graphql", () => ({
  CountryCode: jest.requireActual("@tempo/graphql").CountryCode,
  useAddressValidationRulesQuery: jest.fn(),
}));

describe("useAddressValidation", () => {
  it("skips loading validation rules when country is not provided", () => {
    // Arrange
    (useAddressValidationRulesQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
    });
    // Act
    const {
      result: { current },
    } = renderHook(() => useAddressValidation());

    // Assert
    expect(current.areas).toEqual([]);
    expect(current.loading).toBeFalsy();
    expect(useAddressValidationRulesQuery).toBeCalledWith({
      pause: true,
      variables: { countryCode: undefined },
    });
    expect(current.isFieldAllowed("country")).toBeFalsy();
  });

  it("loads validation rules when country is provided", () => {
    // Arrange
    (useAddressValidationRulesQuery as jest.Mock).mockReturnValue({
      data: {
        addressValidationRules: {
          countryAreaChoices: [
            { raw: "AL", verbose: "Alabama" },
            { raw: "AN", verbose: "Ancona" },
          ],
          allowedFields: ["country"],
        },
      },
      loading: false,
    });
    // Act
    const {
      result: { current },
    } = renderHook(() => useAddressValidation("US"));

    // Assert
    expect(current.areas).toEqual([
      { label: "Alabama", value: "Alabama", raw: "AL" },
      { label: "Ancona", value: "Ancona", raw: "AN" },
    ]);
    expect(current.loading).toBeFalsy();
    expect(useAddressValidationRulesQuery).toBeCalledWith({
      pause: false,
      variables: { countryCode: "US" },
    });
    expect(current.isFieldAllowed("country")).toBeTruthy();
    expect(current.isFieldAllowed("countryArea")).toBeFalsy();
  });
});
