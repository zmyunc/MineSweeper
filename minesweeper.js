
let model = new MineSweeperModel(12, 12, 35);
let controller = new MineSweeperController(model);
let view = new MineSweeperView(model, controller, document.querySelector('#ms'));