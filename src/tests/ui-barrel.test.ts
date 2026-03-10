import {
  Box,
  Column,
  Heading,
  Row,
  Screen,
  Spacer,
  Text,
} from '@/ui';

/**
 * Verifies that the shared UI barrel stays available through the standardized
 * alias import path.
 * Input parameters: none.
 * Output:
 * - Assertions proving the root `@/ui` entrypoint exposes each migrated
 *   layout primitive.
 * Logic summary:
 * - Imports the public barrel through the alias used by app screens.
 * - Checks each exported component remains defined for consumer code.
 */
describe('ui barrel', () => {
  it('exports all migrated layout primitives through the alias entrypoint', () => {
    expect(Box).toBeDefined();
    expect(Column).toBeDefined();
    expect(Heading).toBeDefined();
    expect(Row).toBeDefined();
    expect(Screen).toBeDefined();
    expect(Spacer).toBeDefined();
    expect(Text).toBeDefined();
  });
});
