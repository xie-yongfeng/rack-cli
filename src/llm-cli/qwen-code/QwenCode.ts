import { BaseLLMCli } from '../BaseLLMCli';

/**
 * Qwen Code CLI wrapper
 */
export class QwenCode extends BaseLLMCli {
  private qwenConfig: any = {};

  constructor() {
    super('qwen-code', 'qwen', '@qwen-code/qwen-code@latest');
  }

  config(config:any = {}): void {
    const { api_url, api_key, model } = config
    this.qwenConfig = { api_url, api_key, model };
  }

  start(args: string[] = []): void {
    const env = {
      ...process.env,
      OPENAI_API_KEY: this.qwenConfig.api_key,
      OPENAI_BASE_URL: this.qwenConfig.api_url,
      OPENAI_MODEL: this.qwenConfig.model
    };
    this.start_spawn(args, env, this.start_node)
  }
  
}