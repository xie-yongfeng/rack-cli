import { BaseLLMCli } from '../BaseLLMCli';

/**
 * Easy LLM CLI wrapper
 */
export class EasyLLMCli extends BaseLLMCli {
  private easyConfig: any = {};

  constructor() {
    super('easy-llm-cli', 'elc', 'easy-llm-cli');
  }

  config(config:any = {}): void {
    const { api_url, api_key, model } = config
    this.easyConfig = { api_url, api_key, model };
  }

  start(args: string[] = []): void {
    const env = {
      ...process.env,
      USE_CUSTOM_LLM: true, 
      CUSTOM_LLM_PROVIDER: "openai",
      CUSTOM_LLM_API_KEY: this.easyConfig.api_key,
      CUSTOM_LLM_ENDPOINT: this.easyConfig.api_url,
      CUSTOM_LLM_MODEL_NAME: this.easyConfig.model
    };
    this.start_spawn(args, env, this.start_node)
  }
  
}