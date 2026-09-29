// Unrelated to this repro: jest-expo 57's per-platform presets do not resolve babel-preset-expo on their own (fixed in jest-expo 58.0.0).
module.exports = { presets: ['babel-preset-expo'] };
