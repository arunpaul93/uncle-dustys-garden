import test from 'node:test';
import assert from 'node:assert/strict';
import { wheelAngle } from '../dist/brand-mowing.js';

test('wheel rotation follows rolling distance and stops in the resting pose', () => {
  for (const radius of [57, 48]) {
    assert.equal(wheelAngle(0, radius), 0);
    assert.ok(Math.abs(wheelAngle(2 * Math.PI * radius, radius) - 360) < 1e-8);
  }
  assert.ok(wheelAngle(100, 48) > wheelAngle(100, 57));
});
