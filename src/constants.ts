import path from "node:path";
import os from "node:os";

export const HOME_DIR = path.join(os.homedir(), ".rack-cli");

export const CONFIG_FILE = path.join(HOME_DIR, "config.json");

export const CLAUDE_CONFIG = {
  DIR: path.join(os.homedir(), ".claude-code-router"),
  FILE_NAME: "config.json"
};

export const IFLOW_CONFIG = {
  DIR: path.join(os.homedir(), ".iflow"),
  FILE_NAME: "settings.json"
};

export const DEFAULT_CONFIG = {
  api_url: "https://openrouter.ai/api/v1",
  api_key: "sk-xxx",
  model: "claude-4-sonnet"
};
