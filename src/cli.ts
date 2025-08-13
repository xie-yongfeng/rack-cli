#!/usr/bin/env node
import { version } from "../package.json";
import { CLI_INSTANCES, CLIName } from "./llm-cli";
import { readConfigFile, initDir } from "./utils/config";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const command = process.argv[2];

/**
 * Check if CLI command exists
 */
async function checkCliExists(command: string): Promise<boolean> {
  try {
    const platform = process.platform;
    const checkCommand = platform === 'win32'
      ? `where ${command}`
      : `which ${command}`;
    
    await execAsync(checkCommand);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Create a spinner animation for loading feedback
 */
function createSpinner(message: string) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let currentFrame = 0;
  
  const interval = setInterval(() => {
    process.stdout.write(`\r${frames[currentFrame]} ${message}`);
    currentFrame = (currentFrame + 1) % frames.length;
  }, 100);
  
  return {
    stop: (finalMessage?: string) => {
      clearInterval(interval);
      if (finalMessage) {
        process.stdout.write(`\r${finalMessage}\n`);
      } else {
        process.stdout.write('\r');
      }
    }
  };
}

/**
 * Install npm package with loading feedback
 */
async function installNpmPackage(packageName: string): Promise<void> {
  const spinner = createSpinner(`Installing ${packageName}...`);
  
  try {
    await execAsync(`npm install -g ${packageName}`);
    spinner.stop(`✅ ${packageName} installed successfully!`);
  } catch (error) {
    spinner.stop(`❌ ${packageName} installation failed`);
    console.error(`Error installing ${packageName}:`, error);
    throw error;
  }
}

/**
 * Ensure CLI exists, install if it doesn't exist
 */
async function ensureCliExists(cliName: string, startNode: string, npmPath: string): Promise<void> {
  // For compound commands (e.g. 'ccr code'), only check the first command
  const commandToCheck = startNode.split(' ')[0];
  const exists = await checkCliExists(commandToCheck);
  if (!exists) {
    await installNpmPackage(npmPath);
  }
}

// Function to dynamically generate help text
function getHelpText(): string {
  const availableCLIs = Object.keys(CLI_INSTANCES);
  
  // Calculate the maximum CLI name length for alignment
  const maxCliLength = Math.max(...availableCLIs.map(cli => cli.length));
  const maxCommandLength = Math.max(maxCliLength, 'list'.length, '-v, version'.length);
  
  return `
Usage: rack [command | CLI] [args...]

Available CLI Tools:
${availableCLIs.map(cli => `  rack ${cli.padEnd(maxCommandLength)}  Start ${cli} CLI`).join('\n')}

System Commands:
  ${'list'.padEnd(maxCommandLength)}  List all available CLI tools
  ${'-v, version'.padEnd(maxCommandLength)}  Show version information
  ${'-h, help'.padEnd(maxCommandLength)}  Show help information

Examples:
${availableCLIs.map(cli => `  rack ${cli} "Your task description"`).join('\n')}
`;
}

// Keep HELP_TEXT constant for backward compatibility
const HELP_TEXT = getHelpText();

async function main() {
  if (!command) {
    console.log(getHelpText());
    process.exit(1);
  }

  switch (command) {
    case "-v":
    case "version":
      console.log(`rack-cli version: ${version}`);
      break;
    case "-h":
    case "help":
      console.log(getHelpText());
      break;
    case "list":
      // List all available CLIs
      console.log("Available CLI tools:");
      Object.keys(CLI_INSTANCES).forEach(name => {
        console.log(`  - ${name}`);
      });
      break;
    default:
      // Check if it's a registered CLI command
      if (command in CLI_INSTANCES) {
        const cliInstance = CLI_INSTANCES[command as CLIName];
        
        // Ensure CLI exists, install if it doesn't exist
        await ensureCliExists(
          cliInstance.getCliName(),
          cliInstance.getStartNode(),
          cliInstance.getNpmPath()
        );
        
        // read config
        await initDir()
        let config = await readConfigFile();
        // set cli config
        cliInstance.config(config);
        const args = process.argv.slice(3);
        console.log(`Starting ${command} CLI`);
        // start
        cliInstance.start(args);
      } else {
        console.log(`Unknown command: ${command}`);
        console.log(getHelpText());
        process.exit(1);
      }
      break;
  }
}

main().catch(console.error);
