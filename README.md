# Repro: `expo-intent-launcher` cannot be imported under `jest-expo/android`

`expo-intent-launcher` ships no `mocks/ExpoIntentLauncher` file, and `ExpoIntentLauncher` is
absent from `jest-expo`'s native module registry. Importing the package therefore throws in Jest
on Android.

Created with `npx create-expo-app@latest --template blank` (SDK 57).

```sh
npm install && npm test
```

The suite runs a single test under two Jest projects, `jest-expo/ios` and `jest-expo/android`:

- `jest-expo/ios` passes.
- `jest-expo/android` fails with `Cannot find native module 'ExpoIntentLauncher'`.

The test body is a bare `require`. No call is needed, because
`src/ExpoIntentLauncher.android.ts` calls `requireNativeModule('ExpoIntentLauncher')` at module
scope.

## Unrelated setup

`babel.config.js` and the `babel-preset-expo` dev dependency are there only to work around a
separate problem. With `jest-expo` 57, the per-platform presets do not resolve
`babel-preset-expo` on their own. Without these two, both projects fail earlier, on Flow syntax in
`@react-native/jest-preset/jest/setup.js`. `jest-expo` 58.0.0 fixes this. It has nothing to do
with the bug reported here.
