// game.js — 游戏逻辑
// 负责：状态对象、update 逻辑、实体与碰撞
// 接口以 COLABERATE/CONTRACT.md 为准，不得改名、不得加参数

export function createGame() {
  return {
    score: 0,
    time: 0,
    player: { x: 480, y: 300, vx: 0, vy: 0, r: 14 },
    entities: [],
  };
}

export function updateGame(state, dt, engine) {
  state.time += dt;

  const p = state.player;
  const speed = 260;
  p.vx = 0;
  p.vy = 0;
  if (engine.isKeyDown('ArrowLeft') || engine.isKeyDown('KeyA')) p.vx -= speed;
  if (engine.isKeyDown('ArrowRight') || engine.isKeyDown('KeyD')) p.vx += speed;
  if (engine.isKeyDown('ArrowUp') || engine.isKeyDown('KeyW')) p.vy -= speed;
  if (engine.isKeyDown('ArrowDown') || engine.isKeyDown('KeyS')) p.vy += speed;

  p.x += p.vx * dt;
  p.y += p.vy * dt;

  // 边界限制
  p.x = Math.max(p.r, Math.min(engine.canvas.width - p.r, p.x));
  p.y = Math.max(p.r, Math.min(engine.canvas.height - p.r, p.y));
}
