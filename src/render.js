// render.js — 渲染
// 负责：读取 state 并绘制到 canvas（HUD、实体、特效）
// 接口以 COLABERATE/CONTRACT.md 为准，不得改名、不得加参数

export function renderGame(ctx, state, engine) {
  const W = engine.canvas.width;
  const H = engine.canvas.height;

  // 背景
  ctx.fillStyle = '#101820';
  ctx.fillRect(0, 0, W, H);

  // 玩家
  const p = state.player;
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fill();

  // 实体
  for (const e of state.entities) {
    ctx.fillStyle = e.color || '#ffeb3b';
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r || 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // HUD
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.fillText('Score: ' + state.score, 16, 28);
  ctx.fillText('Time:  ' + state.time.toFixed(1), 16, 50);
}
