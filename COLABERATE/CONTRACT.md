# 比赛时AI更新，接口契约

## 项目结构
```
index.html          - Canvas 入口，加载 src/main.js
src/
  main.js           - 入口组装：engine + game + render（不写业务逻辑）
  engine.js         - 核心引擎：画布、主循环、键鼠输入
  game.js           - 游戏逻辑：state、update、实体、碰撞
  render.js         - 渲染：读取 state 绘制到 canvas
```

## 模块分工（3人）
| 负责人 | 文件 | 职责 |
|--------|------|------|
| 引擎 | `src/engine.js` | 画布、`requestAnimationFrame` 循环、键鼠输入 |
| 玩法 | `src/game.js` | `state` 结构、`update`、实体生成、碰撞、计分 |
| 渲染 | `src/render.js` | 背景、实体绘制、HUD、特效 |
| — | `src/main.js` | 仅组装，不写业务 |

## 接口定义（不得改名、不得加参数）

### engine.js
```js
new Engine(canvas)              // 创建引擎，绑定输入
engine.start(updateFn, renderFn) // 启动主循环
  // updateFn(dt, engine)   dt: 秒（最大 0.05）
  // renderFn(ctx, engine)  ctx: 2D 上下文
engine.stop()                   // 停止循环
engine.isKeyDown(code)          // 返回布尔，code 用 e.code（如 'KeyA'）
engine.canvas                   // HTMLCanvasElement
engine.ctx                      // CanvasRenderingContext2D
engine.mouse                    // { x, y, down } 坐标已按画布缩放
```

### game.js
```js
createGame()                              // → state 对象（初始状态）
updateGame(state, dt, engine)             // 原地修改 state
```
`state` 是 game 与 render 之间唯一的数据通道。约定字段：
```js
{
  score: number,
  time: number,
  player: { x, y, vx, vy, r },
  entities: [ { x, y, r, color, ... } ],
  // 可按需扩展字段，但不要删除以上字段
}
```

### render.js
```js
renderGame(ctx, state, engine)   // 读取 state 并绘制
```

## 协作规则
- 每人只编辑自己负责的文件，不碰他人文件。
- `main.js` 仅做组装，业务逻辑一律进 `game.js` / `render.js`。
- 接口以本文件为准：**不得改名、不得加参数**。
- 确需改接口，先在群里同步，再更新本文件，再改代码。
- 不引入第三方库，不写构建配置，不写测试框架。
- 不确定时选更简单的实现。

## 本地运行
原生 ES Modules，需通过 HTTP 服务器打开（不能直接双击 html）：
```
npx serve .      # 或 python -m http.server 8080
```
