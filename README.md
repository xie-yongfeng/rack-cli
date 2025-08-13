# Rack-CLI

[中文版](README_zh.md)

> An integrated mainstream LLM CLI tool manager with unified configuration, supporting quick installation, configuration, and launching of LLM CLI tools.

## 📦 Supported CLI Tools

| CLI Tool | Command | NPM Package | Description |
|----------|---------|-------------|-------------|
| Claude Code Router | `rack claude` | @musistudio/claude-code-router | Powerful Claude Code request router proxy |
| iFlow CLI | `rack iflow` | @iflow-ai/iflow-cli | Command-line tool for iFlow AI |
| Qwen Code | `rack qwen` | @qwen-code/qwen-code@latest | Qwen code assistant |
| Easy LLM CLI | `rack elc` | easy-llm-cli | Simple LLM command-line tool |

## ✨ Features

-   **Unified Entry**: Manage and launch multiple LLM CLI tools through a single `rack` command
-   **Auto Installation**: Automatically detect and install missing CLI tools without manual installation
-   **Unified Configuration**: Provide consistent configuration interface supporting various LLM service providers
-   **Multi-tool Support**: Support mainstream tools like Claude Code Router, iFlow CLI, Qwen Code, Easy LLM CLI, etc.
-   **Environment Management**: Automatically set appropriate environment variables for different CLI tools

## 🚀 Getting Started

### 1. Installation

```shell
npm install -g @xieyongfeng/rack-cli
```

### 2. Configuration

Create a configuration file `~/.rack-cli/config.json`:

> **Using API keys from OpenAI or other compatible providers:**

```json
{
  "api_url": "https://openrouter.ai/api/v1",
  "api_key": "sk-xxx",
  "model": "claude-sonnet-4"
}
```

Configuration parameters:
- `api_url`: Base URL of the LLM API service
- `api_key`: API key
- `model`: Model name to use

### 3. Usage

List all available CLI tools:
```shell
rack list
```

Launch specific CLI tools:
```shell
rack claude    # Launch Claude Code Router
rack iflow     # Launch iFlow CLI  
rack qwen      # Launch Qwen Code
rack elc       # Launch Easy LLM CLI
```

## Project Structure

```
src/
├── cli.ts                 # Main CLI entry
├── constants.ts           # Constants definition
├── llm-cli/              # LLM CLI tool implementations
│   ├── BaseLLMCli.ts     # Base class
│   ├── index.ts          # Tool registration
│   ├── claude-code/      # Claude Code Router
│   ├── iflow-cli/        # iFlow CLI
│   ├── qwen-code/        # Qwen Code
│   └── easy-llm-cli/     # Easy LLM CLI
└── utils/
    └── config.ts         # Configuration management
```

## 📄 License

MIT License

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📞 Support

If you encounter any issues or have suggestions, please submit an Issue on GitHub.
