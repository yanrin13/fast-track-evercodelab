import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
          },
          target: "esnext",
        },
        module: {
          type: "es6",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["**/tests/**/*.test.ts"],

  // важно
  clearMocks: true,
  restoreMocks: true,
  resetModules: true,

  // чтобы не было "worker process failed to exit"
  // (после того как уберёшь setInterval в тестах — можно убрать forceExit)
  // forceExit: true,

  // для отладки утечек:
  // detectOpenHandles: true,
};

export default config;
