import { BaseLLMCli } from '../BaseLLMCli';
import { CLAUDE_CONFIG } from "../../constants";
import { writeConfigFile } from "../../utils/config";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Claude Code CLI wrapper
 */
export class ClaudeCodeCli extends BaseLLMCli {

  constructor() {
    super('claude-code', 'ccr code', '@musistudio/claude-code-router');
  }

  config(config:any = {}): void {
    const { api_url, api_key, model } = config
    let claude_config = {
      "Providers": [
        {
          "name": "default",
          "api_base_url": api_url + "/chat/completions",
          "api_key": api_key,
          "models": [
            model
          ]
        }
      ],
      "Router": {
        "default": "default," + model
      }
    }
    writeConfigFile(CLAUDE_CONFIG.DIR, CLAUDE_CONFIG.FILE_NAME, claude_config)
  }

  async start(args: string[] = []): Promise<void> {
    const env = {
      ...process.env
    };
    
    // Check if Claude command exists, install if not found using npm install -g @anthropic-ai/claude-code
    await this.ensureCliExists("claude", "@anthropic-ai/claude-code");
    this.start_spawn(args, env, this.start_node);
  }

  /**
   * Check if CLI command exists
   */
  private async checkCliExists(command: string): Promise<boolean> {
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
  private createSpinner(message: string) {
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
  private async installNpmPackage(packageName: string): Promise<void> {
    const spinner = this.createSpinner(`Installing ${packageName}...`);
    
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
  private async ensureCliExists(commandToCheck:string, npmPackage:string): Promise<void> {
    const exists = await this.checkCliExists(commandToCheck);
    if (!exists) {
      await this.installNpmPackage(npmPackage);
      
      // Verify installation was successful
      const nowExists = await this.checkCliExists(commandToCheck);
      if (!nowExists) {
        throw new Error(`Command '${commandToCheck}' is still not available after installing ${npmPackage}`);
      }
    }
  }

}