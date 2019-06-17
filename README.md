# sixmq-web

SixMQ 的图形化 Web 管理工具。

SixMQ 是一款 PHP 消息队列系统，基于 [imi](https://www.imiphp.com/) 框架开发的，运行在 PHP + Swoole 环境下。

SixMQ 消息存储及队列完全依赖 Redis 实现，支持消息处理超时处理、协程挂起等待数据返回等特性。

## 配置方式

`.env` 为所有环境默认

`.env.development` 为开发模式下配置

## 命令

打包：`npm run build`

运行调试：`npm run serve`
