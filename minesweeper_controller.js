let MineSweeperController = function (model) {

    this.reveal = (x,y) => {
        alert(`Reveal ${x}, ${y}`);
    }

    this.toggleMark = (x,y) => {
        let cell = model.getCell(x,y);

        cell.toggleMark();
    }

    this.reset = () => {
        alert(`Reset game`);
    }
}