let MineSweeperController = function (model) {

    this.reveal = (x,y) => {
        alert(`Reveal ${x}, ${y}`);
    }

    this.toggleMark = (x,y) => {
        alert(`Toggle mark at ${x}, ${y}`);
    }

    this.clearNeighborhood = (x,y) => {
        alert(`Clear neighborhood at ${x}, ${y}`);
    }

    this.reset = () => {
        alert(`Reset game`);
    }
}