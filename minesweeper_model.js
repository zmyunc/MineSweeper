let MineSweeperModel = function (width, height, bomb_count) {
    // Should check that bomb_count <= width * height but will assume that.

    this.width = width;
    this.height = height;
    this.bomb_count = bomb_count;
    this.field = new MineSweeperField(this.width, this.height);

    // Randomly pick bomb_count cells within the field to have bombs.

    let all_cells = [];
    this.field.forAllCells(c => {
            all_cells.push([c, Math.random()]);
    });

    all_cells.sort((a,b) => a[1]-b[1])
         .slice(0,this.bomb_count)
         .forEach(c => c[0].has_bomb = true);
}

let MineSweeperField = function(width, height) {
    this.cells = [];
    for (let x = 0; x < width; x++) {
        this.cells[x] = [];
        for (let y = 0; y < height; y++) {
            this.cells[x][y] = new MineSweeperCell();
        }
    }
}

MineSweeperField.prototype.forAllCells = function(fn) {
    this.cells.forEach(column => {
        column.forEach(cell => {
            fn(cell);
        });
    });
}

let MineSweeperCell = function() {
    this.state = MineSweeperCell.states.UNMARKED;
    this.has_bomb = false;
}

MineSweeperCell.states = {
    UNMARKED: 0,
    MARKED: 1,
    REVEALED: 2
}

