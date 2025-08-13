import { ClaudeCodeCli } from './claude-code/ClaudeCode';
import { IflowCli } from './iflow-cli/IflowCli';
import { QwenCode } from './qwen-code/QwenCode';
import { EasyLLMCli } from './easy-llm-cli/EasyLLMcli';

// Re-export all classes
export { ClaudeCodeCli, IflowCli, QwenCode, EasyLLMCli};

// Unified CLI configuration
const CLI_CONFIG = {
  'claude': ClaudeCodeCli,
  'iflow': IflowCli,
  'qwen': QwenCode,
  'elc': EasyLLMCli,
} as const;

// Export class mapping
export const CLI_CLASSES = CLI_CONFIG;

// Lazily initialized instance mapping
const _cliInstances: Partial<Record<keyof typeof CLI_CONFIG, InstanceType<typeof CLI_CONFIG[keyof typeof CLI_CONFIG]>>> = {};

export const CLI_INSTANCES = new Proxy({} as Record<keyof typeof CLI_CONFIG, InstanceType<typeof CLI_CONFIG[keyof typeof CLI_CONFIG]>>, {
  get(target, prop: keyof typeof CLI_CONFIG) {
    if (!_cliInstances[prop]) {
      const CLIClass = CLI_CONFIG[prop];
      _cliInstances[prop] = new CLIClass();
    }
    return _cliInstances[prop]!;
  },
  ownKeys(target) {
    return Object.keys(CLI_CONFIG);
  },
  has(target, prop) {
    return prop in CLI_CONFIG;
  },
  getOwnPropertyDescriptor(target, prop) {
    if (prop in CLI_CONFIG) {
      return {
        enumerable: true,
        configurable: true
      };
    }
  }
});

// Type definitions
export type CLIName = keyof typeof CLI_CONFIG;
export type CLIInstance = InstanceType<typeof CLI_CONFIG[CLIName]>;