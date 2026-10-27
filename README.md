# lab2-tic —— 实验二任务1 井字棋（React）

跟着 React 官网教程（zh-hans.react.dev/learn/tutorial-tic-tac-toe）手写的井字棋，练习组件拆分、props、state、状态提升与不可变更新。

## 运行

```bash
pnpm install
pnpm dev            # http://localhost:5173
```

## 代码要点

- `Square`：单格按钮，无 state
- `Board`：九宫格，接收 squares 与点击回调
- `Game`：顶层 state（history 快照数组 + currentMove），实现胜负/平局判定与时间旅行
- 落子用 `[...squares]` 不可变更新，回到第 n 步用 `history[currentMove]`

## 部署

已部署：https://Archer11-q.github.io/lab2-tic/
