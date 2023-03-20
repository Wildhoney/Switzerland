import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  transform: {
    "\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: { "(.+)\\.js": "$1" },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  collectCoverageFrom: ["./src/**/*.{ts,tsx}"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};

export default config;
