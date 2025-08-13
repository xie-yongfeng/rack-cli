import fs from "node:fs/promises";
import readline from "node:readline";
import JSON5 from "json5";
import path from "node:path";
import {
  CONFIG_FILE,
  DEFAULT_CONFIG,
  HOME_DIR
} from "../constants";

const ensureDir = async (dir_path: string) => {
  try {
    await fs.access(dir_path);
  } catch {
    await fs.mkdir(dir_path, { recursive: true });
  }
};

export const initDir = async () => {
  await ensureDir(HOME_DIR);
};

export const readConfigFile = async () => {
  try {
    const config = await fs.readFile(CONFIG_FILE, "utf-8");
    try {
      // Try to parse with JSON5 first (which also supports standard JSON)
      return JSON5.parse(config);
    } catch (parseError) {
      console.error(`Failed to parse config file at ${CONFIG_FILE}`);
      console.error("Please check your config file syntax.");
      process.exit(1);
    }
  } catch (readError: any) {
      //console.error(`Failed to read config file at ${CONFIG_FILE}`);
      console.error("Error details:", readError.message);
      process.exit(1);
  }
};

export const writeConfigFile = async (dir: string, file_name: string ,config: any) => {
  await ensureDir(dir);
  const configWithComment = `${JSON.stringify(config, null, 2)}`;
  const filePath = path.join(dir, file_name);
  await fs.writeFile(filePath, configWithComment);
};

export const initConfig = async () => {
  const config = await readConfigFile();
  Object.assign(process.env, config);
  return config;
};
