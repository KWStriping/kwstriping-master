import fc from 'fast-check';
import { getIntegerAmountFromTempo, getTempoAmountFromInteger } from './utils';

describe('payments/utils', () => {
  it('getIntegerAmountFromTempo should convert dollars to cents', () => {
    expect(getIntegerAmountFromTempo(123.42)).toEqual(12342);
    expect(getIntegerAmountFromTempo(19.22)).toBe(1922);
    expect(getIntegerAmountFromTempo(10)).toBe(1000);
    expect(getIntegerAmountFromTempo(8.37)).toBe(837);
  });

  it('getTempoAmountFromInteger should convert cents to dollars', () => {
    expect(getTempoAmountFromInteger(934512)).toEqual(9345.12);
    expect(getTempoAmountFromInteger(1922)).toBe(19.22);
    expect(getTempoAmountFromInteger(1000)).toBe(10);
    expect(getTempoAmountFromInteger(837)).toBe(8.37);
  });

  it('should be idempotent when calling getIntegerAmountFromTempo on getTempoAmountFromInteger', () => {
    return fc.assert(
      fc.property(
        fc.integer(),
        (value) => value === getIntegerAmountFromTempo(getTempoAmountFromInteger(value))
      )
    );
  });

  it('should be idempotent when calling getTempoAmountFromInteger on getIntegerAmountFromTempo', () => {
    return fc.assert(
      fc.property(
        fc.integer().map((cents) => cents / 100),
        (value) => value === getTempoAmountFromInteger(getIntegerAmountFromTempo(value))
      )
    );
  });
});
