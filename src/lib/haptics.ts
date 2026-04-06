/**
 * Haptic feedback utilities for mobile devices.
 * Uses the Vibration API (supported on Android Chrome, some iOS Safari).
 */

export function hapticLight() {
  if ("vibrate" in navigator) {
    navigator.vibrate(10);
  }
}

export function hapticMedium() {
  if ("vibrate" in navigator) {
    navigator.vibrate(25);
  }
}

export function hapticHeavy() {
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
  }
}

export function hapticSuccess() {
  if ("vibrate" in navigator) {
    navigator.vibrate([15, 50, 15]);
  }
}

export function hapticWarning() {
  if ("vibrate" in navigator) {
    navigator.vibrate([30, 30, 30]);
  }
}
