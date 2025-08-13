import { spawn } from "child_process";

/**
 * Base service class - Provides common service management functionality
 */
export abstract class BaseLLMCli {
  protected cli_name: string;
  protected start_node: string;
  protected npm_path: string;
  
  constructor(cli_name: string, start_node: string, npm_path: string) {
    this.cli_name = cli_name;
    this.start_node = start_node;
    this.npm_path = npm_path;
  }

  /**
   * Get CLI name
   */
  public getCliName(): string {
    return this.cli_name;
  }

  /**
   * Get start command
   */
  public getStartNode(): string {
    return this.start_node;
  }

  /**
   * Get npm package path
   */
  public getNpmPath(): string {
    return this.npm_path;
  }

  /**
   * llm config
   */
  abstract config(config:any): void;

  /**
   * Service startup logic
   */
  abstract start(args:string[]): void;

  protected start_spawn(args:string[], env:any, start_node:string) {
    const nodeProcess = spawn(start_node, args, {
      env,
      stdio: "inherit",
      shell: true,
    });
  
    nodeProcess.on("error", (error) => {
      process.exit(1);
    });
  
    nodeProcess.on("close", (code) => {
      process.exit(code || 0);
    });
  }
}