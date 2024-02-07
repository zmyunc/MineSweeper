let MineSweeperController = function (model) {

    this.reveal = (x,y) => {
        let cell = model.getCell(x,y);

        cell.reveal();
    }

    this.toggleMark = (x,y) => {
        let cell = model.getCell(x,y);

        cell.toggleMark();
    }

    this.reset = () => {
        alert(`Reset game`);
    }
}