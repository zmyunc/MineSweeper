
let model = new MineSweeperModel();
let controller = new MineSweeperController(model);
let view = new MineSweeperView(model, controller, document.querySelector('#ms'));