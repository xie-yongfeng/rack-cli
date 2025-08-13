# Rack CLI

> 集成目前主流的LLM CLI工具，统一配置，支持LLM CLI工具的快速安装、配置和启动。

## ✨ 功能特性

-   **统一入口**: 通过单一命令`rack`管理和启动多个LLM CLI工具
-   **自动安装**: 自动检测并安装缺失的CLI工具，无需手动安装
-   **统一配置**: 提供一致的配置接口，支持多种LLM服务提供商
-   **多工具支持**: 支持Claude Code Router、iFlow CLI、Qwen Code、Easy LLM CLI等主流工具
-   **环境变量管理**: 为不同CLI工具自动设置合适的环境变量

## 🚀 快速开始

### 1. 安装

```shell
npm install -g @xieyongfeng/rack-cli
```

### 2. 配置

创建配置文件`~/.rack-cli/config.json`：

> **使用 OpenAI 或其他兼容提供商的 API 密钥：**

```json
{
  "api_url": "https://openrouter.ai/api/v1",
  "api_key": "sk-xxx",
  "model": "claude-sonnet-4"
}
```

配置说明：
- `api_url`: LLM API服务的基础URL
- `api_key`: API密钥
- `model`: 要使用的模型名称

### 3. 使用

查看所有可用的CLI工具：
```shell
rack list
```

启动特定的CLI工具：
```shell
rack claude    # 启动 Claude Code Router
rack iflow     # 启动 iFlow CLI  
rack qwen      # 启动 Qwen Code
rack elc       # 启动 Easy LLM CLI
```

## 📦 支持的CLI工具

| CLI工具 | 命令 | NPM包 | 描述 |
|---------|------|-------|------|
| Claude Code Router | `rack claude` | @musistudio/claude-code-router | 通过强大的Claude Code请求路由器代理 |
| iFlow CLI | `rack iflow` | @iflow-ai/iflow-cli | iFlow AI的命令行工具 |
| Qwen Code | `rack qwen` | @qwen-code/qwen-code@latest | 通义千问代码助手 |
| Easy LLM CLI | `rack elc` | easy-llm-cli | 简易LLM命令行工具 |

## 项目结构

```
src/
├── cli.ts                 # 主CLI入口
├── constants.ts           # 常量定义
├── llm-cli/              # LLM CLI工具实现
│   ├── BaseLLMCli.ts     # 基础类
│   ├── index.ts          # 工具注册
│   ├── claude-code/      # Claude Code Router
│   ├── iflow-cli/        # iFlow CLI
│   ├── qwen-code/        # Qwen Code
│   └── easy-llm-cli/     # Easy LLM CLI
└── utils/
    └── config.ts         # 配置管理
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果您遇到任何问题或有建议，请在 GitHub 上提交 Issue。
