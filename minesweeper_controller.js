let MineSweeperController = function (model) {

    this.reveal = (x,y) => {
        let cell = model.getCell(x,y);

        cell.reveal();
    }

    this.toggleMark = (x,y) => {
        let cell = model.getCell(x,y);

        cell.toggleMark();
    }

    this.clearNeighborhood = (x,y) => {
        let cell = model.getCell(x,y);

        if (!cell.isRevealed() || cell.hasBomb()) {
            // Can only clear neighborhood of revealed cells without bombs
            return;
        }

        let neighborhood = cell.getNeighbors();
        let mark_count = neighborhood.reduce((mc, n) => mc += (n.isMarked() ? 1 : 0), 0);
        if (mark_count == cell.getNeighborBombCount()) {
            neighborhood.forEach(n => {
                if (n.isUnmarked()) {
                    // Want to use the controller's reveal rather than cell model reveal
                    // because want to make sure controller's reveal logic is applied.
                    this.reveal(n.x, n.y);
                }
            });
        }
    }

    this.reset = () => {
        alert(`Reset game`);
    }
}