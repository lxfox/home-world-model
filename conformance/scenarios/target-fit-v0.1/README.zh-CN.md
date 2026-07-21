# Target Fit v0.1 一致性情景

本 oracle 测试 [Target Fit Profile](../../../spec/profiles/target-fit/v0.1/README.zh-CN.md)，包含 23 个语义案例、9 个聚合案例与 13 个禁止推断。它覆盖阈值不确定性、错误房间／属性／单位／过程、陈旧或不可访问观测、空间平均值误用、模拟与当前状态混淆，以及测量 fit 与个人体验不一致。

运行：

```sh
node conformance/scenarios/target-fit-v0.1/validate.mjs
```

通过只证明 fixture 声明的语义；不验证真实传感器、舒适模型、法规测试程序、校准链或家庭决策。
