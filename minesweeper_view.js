let MineSweeperView = function (model, controller, render_div) {

    // Make a div to render into if we weren't given one.

    if (render_div == undefined) {
        render_div = document.createElement('div');
    }

    // Render the interface
    render_div.innerHTML = `
    <div>
      <div>Unmarked Bombs Left: <span id="bomb_count">Unmarked bomb count goes here.</span></div>
      <div>Time Elapsed: <span id="elapsed_time">Elapsed time goes here</span></div>
      <div><button id="reset">Reset</button></div>
    </div>
    <div id="field">Minefield Goes Here</div>
    `;

    let field_view = new MSFieldView(model, controller, render_div.querySelector('#field'));

    // Connect reset button to controller
    render_div.querySelector('#reset').addEventListener('click', () => {
        controller.reset();
    });

    // Set up a getter for the div
    this.getRenderedDiv = () => render_div;
}

let MSFieldView = function(model, controller, render_div) {
    if (render_div == undefined) {
        render_div = document.createElement('div');
    }

    render_div.innerHTML = `
    <table>
      <tbody>
      </tbody>
    </table>
    `;

    let field_table_body = render_div.querySelector('tbody');
    for (let row=0; row < model.height; row++) {
        let row_tr = document.createElement('tr');
        for (let col=0; col<model.width; col++) {
            let cell_td = document.createElement('td');
            cell_td.classList.add('cell');

            let cell_view = new MSCellView(col, row, model, controller);
            cell_td.append(cell_view.getRenderedDiv());

            row_tr.append(cell_td);
        }
        field_table_body.append(row_tr);
    }

    // Set up a getter for the div
    this.getRenderedDiv = () => render_div;

}

let MSCellView = function(x, y, model, controller, render_div) {
    if (render_div == undefined) {
        render_div = document.createElement('div');
    }

    let cell = model.getCell(x,y);

    let render = () => {
        render_div.innerHTML = '';
        if (cell.isRevealed()) {
            if (cell.hasBomb()) {
                render_div.innerHTML = 'X';
            } else {
                render_div.innerHTML = cell.getNeighborBombCount();
                render_div.addEventListener('click', (e) => {
                    controller.clearNeighborhood(x,y);
                });
            }
        } else {
            let cell_button = document.createElement('button');
            cell_button.addEventListener('click', (e) => {
                if (e.shiftKey) {
                    controller.toggleMark(x,y);
                } else {
                    controller.reveal(x,y);
                }
            });

            cell_button.classList.add('cell');

            if (cell.isMarked()) {
                cell_button.innerHTML = "M";
            }
            render_div.append(cell_button);
        }
    }
    render();

    this.getRenderedDiv = () => render_div;

    cell.addChangeCallback(render);
}