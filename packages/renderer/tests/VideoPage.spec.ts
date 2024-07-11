import {expect, test, vi} from 'vitest';
import DataTableBasic from '../src/components/DataTableBasic.vue';

vi.mock('#preload', () => {
  return {
    versions: {lib1: 1, lib2: 2},
  };
});

test('DataTableBasic component', async () => {
  expect(DataTableBasic).toBeTruthy();
});
