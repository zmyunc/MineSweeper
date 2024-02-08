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

MineSweeperModel.prototype.getCell = function (x, y) {
    return this.field.cells[x][y];
}

let MineSweeperField = function(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];
    for (let x = 0; x < width; x++) {
        this.cells[x] = [];
        for (let y = 0; y < height; y++) {
            this.cells[x][y] = new MineSweeperCell(x,y, this);
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

let MineSweeperCell = function(x, y, field) {
    this.state = MineSweeperCell.states.UNMARKED;
    this.has_bomb = false;
    this.x = x;
    this.y = y;
    this.field = field;
    this.change_callbacks = [];
}

MineSweeperCell.prototype.isRevealed = function () {
    return (this.state == MineSweeperCell.states.REVEALED);
}

MineSweeperCell.prototype.isMarked = function () {
    return (this.state == MineSweeperCell.states.MARKED);
}

MineSweeperCell.prototype.isUnmarked = function () {
    return (this.state == MineSweeperCell.states.UNMARKED);
}

MineSweeperCell.prototype.toggleMark = function () {
    // Can't mark/unmark if already revealed.
    if (this.isRevealed()) {
        return;
    }
    if (this.isMarked()) {
        this.state = MineSweeperCell.states.UNMARKED;
    } else {
        this.state = MineSweeperCell.states.MARKED;
    }

    this.dispatchChangeCallbacks();
}

MineSweeperCell.prototype.reveal = function () {
    if (this.isMarked() || this.isRevealed()) {
        return;
    }

    this.state = MineSweeperCell.states.REVEALED;
    this.dispatchChangeCallbacks();
}

MineSweeperCell.prototype.addChangeCallback = function (cb) {
    this.change_callbacks.push(cb);
}

MineSweeperCell.prototype.dispatchChangeCallbacks = function () {
    this.change_callbacks.forEach(cb => cb());
}

MineSweeperCell.prototype.hasBomb = function () {
    return this.has_bomb;
}

MineSweeperCell.prototype.getNeighbors = function () {
    neighbors = [];
    for (let dx=-1; dx<=1; dx++) {
        for (let dy=-1; dy<=1; dy++) {
            if (dx != 0 || dy != 0) {
                let nx = this.x + dx;
                let ny = this.y + dy;
                if ((nx >=0) && (nx < this.field.width) && (ny >= 0) && ny < (this.field.height)) {
                    neighbors.push(this.field.cells[nx][ny]);
                }
            }
        }
    }
    return neighbors;
}

MineSweeperCell.prototype.getNeighborBombCount = function () {
    return this.getNeighbors().reduce((bc, n) => bc += (n.hasBomb() ? 1 : 0), 0);
}

MineSweeperCell.states = {
    UNMARKED: 0,
    MARKED: 1,
    REVEALED: 2
}

