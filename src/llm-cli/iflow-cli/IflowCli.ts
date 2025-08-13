import { BaseLLMCli } from '../BaseLLMCli';
import { IFLOW_CONFIG } from "../../constants";
import { writeConfigFile } from "../../utils/config";

/**
 * IFlow CLI wrapper
 */
export class IflowCli extends BaseLLMCli {

  constructor() {
    super('iflow-cli', 'iflow', '@iflow-ai/iflow-cli');
  }

  config(config:any = {}): void {
    const { api_url, api_key, model } = config
    let iflow_config = {
      "theme": "Default",
      "selectedAuthType": "iflow",
      "apiKey": api_key,
      "baseUrl": api_url,
      "modelName": model
    }
    writeConfigFile(IFLOW_CONFIG.DIR, IFLOW_CONFIG.FILE_NAME, iflow_config)
  }

  start(args: string[] = []): void {
    const env = {
      ...process.env
    };
    this.start_spawn(args, env, this.start_node)
  }
  
}