let MineSweeperController = function (model) {

    this.reveal = (x,y) => {
        // Do nothing if the game is over.
        if (model.gameFinished()) {
            return;
        }

        // Start the game in case it wasn't already
        model.startGame();

        let cell = model.getCell(x,y);

        if (cell.isRevealed()) {
            // Already revealed. Do nothing and return.
            return;
        }

        cell.reveal();

        // If this is a bomb, game is over. 
        if (cell.hasBomb()) {
            model.field.forAllCells(c => {
                if (c.hasBomb()) {
                    c.reveal();
                }
            });
            model.endGame();
            alert('You lose!');
            return;
        }

        // If revealing a cell with no bombs in neighborhood, reveal the neighborhood.
        if (cell.getNeighborBombCount() == 0) {
            cell.getNeighbors().forEach(n => this.reveal(n.x, n.y));
        };
    }

    this.toggleMark = (x,y) => {
        // Do nothing if the game is over.
        if (model.gameFinished()) {
            return;
        }

        // Start the game in case it wasn't already
        model.startGame();

        let cell = model.getCell(x,y);

        cell.toggleMark();
    }

    this.clearNeighborhood = (x,y) => {
        // Do nothing if the game is over.
        if (model.gameFinished()) {
            return;
        }

        // Start the game in case it wasn't already
        model.startGame();

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