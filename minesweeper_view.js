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
    <div class="field">Minefield Goes Here</div>
    `;

    // Set up a getter for the div
    this.getRenderedDiv = () => render_div;
}