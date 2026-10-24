// main.js — 入口组装
// 仅负责把 engine / game / render 串起来，不写业务逻辑
// 接口以 COLABERATE/CONTRACT.md 为准，不得改名、不得加参数

import { Engine } from './engine.js';
import { createGame, updateGame } from './game.js';
import { renderGame } from './render.js';

const canvas = document.getElementById('game');
const engine = new Engine(canvas);
const state = createGame();

engine.start(
  (dt, eng) => updateGame(state, dt, eng),
  (ctx, eng) => renderGame(ctx, state, eng)
);
