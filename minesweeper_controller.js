let MineSweeperController = function (model) {

    this.reveal = (x,y) => {
        alert(`Reveal ${x}, ${y}`);
    }

    this.toggleMark = (x,y) => {
        alert(`Toggle mark at ${x}, ${y}`);
    }

    this.reset = () => {
        alert(`Reset game`);
    }
}