// engine.js — 核心引擎
// 负责：画布初始化、游戏主循环、键鼠输入
// 接口以 COLABERATE/CONTRACT.md 为准，不得改名、不得加参数

export class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.lastTime = 0;
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, down: false };
    this._bindInput();
  }

  _bindInput() {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));

    const updateMouse = (e) => {
      const r = this.canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - r.left) * (this.canvas.width / r.width);
      this.mouse.y = (e.clientY - r.top) * (this.canvas.height / r.height);
    };
    this.canvas.addEventListener('mousemove', updateMouse);
    this.canvas.addEventListener('mousedown', () => { this.mouse.down = true; });
    this.canvas.addEventListener('mouseup', () => { this.mouse.down = false; });
    this.canvas.addEventListener('mouseleave', () => { this.mouse.down = false; });
  }

  isKeyDown(code) {
    return this.keys.has(code);
  }

  start(updateFn, renderFn) {
    this.running = true;
    this.updateFn = updateFn;
    this.renderFn = renderFn;
    this.lastTime = performance.now();
    requestAnimationFrame(this._loop);
  }

  stop() {
    this.running = false;
  }

  _loop = (t) => {
    if (!this.running) return;
    const dt = Math.min((t - this.lastTime) / 1000, 0.05);
    this.lastTime = t;
    this.updateFn(dt, this);
    this.renderFn(this.ctx, this);
    requestAnimationFrame(this._loop);
  };
}
