import test from 'node:test';
import assert from 'node:assert/strict';
import { legPose, trouserPaths, wheelAngle } from '../dist/brand-mowing.js';

const length = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

test('both legs stay connected and retain their bone lengths through the stride', () => {
  for (let distance = 0; distance < 2040; distance += 2) {
    const bob = -2 * (1 - Math.cos(distance / 340 * Math.PI * 4));
    const poses = [0, .5].map(offset => legPose(distance, offset, true, bob));
    assert.ok(poses.some(pose => pose.phase < .58), 'at least one foot supports the body');
    for (const pose of poses) {
      assert.ok(Math.abs(length(pose.hip, pose.knee) - 114) < .01);
      assert.ok(Math.abs(length(pose.knee, pose.ankle) - 116) < .01);
      assert.ok(!Object.values(trouserPaths(pose)).some(path => /NaN|Infinity/.test(path)));
    }
  }
});

test('a planted boot stays fixed on the ground as the mascot moves forwards', () => {
  const poses = [408, 425, 442, 459, 476].map(distance => ({ distance, ...legPose(distance, 0) }));
  const worldX = poses[0].ankle.x + poses[0].distance;
  for (const pose of poses) {
    assert.ok(Math.abs(pose.ankle.x + pose.distance - worldX) < 1e-6);
    assert.ok(Math.abs(pose.ankle.y + 35 - 626) < 1e-6);
  }
});

test('heel lift, swing and landing join continuously without pose jumps', () => {
  for (const boundary of [340, 537.2, 680]) {
    const before = legPose(boundary - .0001, 0);
    const after = legPose(boundary + .0001, 0);
    assert.ok(length(before.ankle, after.ankle) < .001);
    assert.ok(length(before.knee, after.knee) < .001);
    assert.ok(Math.abs(before.angle - after.angle) < .001);
  }
  const swing = legPose(612, 0), supporting = legPose(612, .5);
  assert.ok(swing.ankle.y < supporting.ankle.y - 10);
});

test('wheel rotation follows rolling distance and stops in the resting pose', () => {
  for (const radius of [57, 48]) {
    assert.equal(wheelAngle(0, radius), 0);
    assert.ok(Math.abs(wheelAngle(2 * Math.PI * radius, radius) - 360) < 1e-8);
  }
  assert.ok(wheelAngle(100, 48) > wheelAngle(100, 57));
  assert.deepEqual(legPose(0, 0), legPose(0, 0, false));
});
