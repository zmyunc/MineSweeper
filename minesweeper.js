
let model = new MineSweeperModel(30, 16, 99);
let controller = new MineSweeperController(model);
let view = new MineSweeperView(model, controller, document.querySelector('#ms'));