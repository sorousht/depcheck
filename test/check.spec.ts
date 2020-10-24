import { satisfies } from '../src/check';

describe('isLessThan', () => {
  test('the given version is less than the exact requirement', () => {
    const version = '1.0.0';
    const requirement = '2.0.0';

    const result = satisfies(version, requirement);

    expect(result).toBe(false);
  });

  test('the given version is exactly the same as requirement', () => {
    const version = '1.0.0';
    const requirement = '1.0.0';

    const result = satisfies(version, requirement);

    expect(result).toBe(true);
  });

  test('the given version is grater than the requirement', () => {
    const version = '3.5.0';
    const requirement = '3.0.0';

    const result = satisfies(version, requirement);

    expect(result).toBe(true);
  });
});
