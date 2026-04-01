// Puzzle - Classic 15-tile sliding puzzle
let puzzleMoves = 0;

function shufflePuzzle() {
  const grid = document.querySelector(".puzzle-grid");
  if (!grid) return;

  // Do 200 random valid moves
  for (let i = 0; i < 200; i++) {
    const empty = grid.querySelector(".puzzle-empty");
    const eIdx = parseInt(empty.dataset.idx);
    const eRow = Math.floor(eIdx / 4), eCol = eIdx % 4;
    const neighbors = [];
    if (eRow > 0) neighbors.push(eIdx - 4);
    if (eRow < 3) neighbors.push(eIdx + 4);
    if (eCol > 0) neighbors.push(eIdx - 1);
    if (eCol < 3) neighbors.push(eIdx + 1);
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    const pickEl = grid.querySelector(`[data-idx="${pick}"]`);
    if (pickEl && !pickEl.classList.contains("puzzle-empty")) {
      swapTile(pickEl);
    }
  }
  puzzleMoves = 0;
  const movesEl = document.querySelector(".puzzle-moves");
  if (movesEl) movesEl.textContent = "Moves: 0";
}

function swapTile(tile) {
  const grid = tile.closest(".puzzle-grid");
  if (!grid) return;
  const emptyEl = grid.querySelector(".puzzle-empty");
  if (!emptyEl) return;

  const idx = parseInt(tile.dataset.idx);
  const emptyIdx = parseInt(emptyEl.dataset.idx);

  const row = Math.floor(idx / 4), col = idx % 4;
  const eRow = Math.floor(emptyIdx / 4), eCol = emptyIdx % 4;
  const adjacent = (Math.abs(row - eRow) + Math.abs(col - eCol)) === 1;

  if (!adjacent) return;

  const val = tile.dataset.val;
  tile.classList.add("puzzle-empty");
  tile.textContent = "";
  delete tile.dataset.val;

  emptyEl.classList.remove("puzzle-empty");
  emptyEl.textContent = val;
  emptyEl.dataset.val = val;
}

window.puzzleClick = function (idx) {
  const tile = document.querySelector(`.puzzle-tile[data-idx="${idx}"]`);
  if (!tile || tile.classList.contains("puzzle-empty")) return;

  const grid = tile.closest(".puzzle-grid");
  const emptyEl = grid.querySelector(".puzzle-empty");
  const emptyIdx = parseInt(emptyEl.dataset.idx);

  const row = Math.floor(idx / 4), col = idx % 4;
  const eRow = Math.floor(emptyIdx / 4), eCol = emptyIdx % 4;
  const adjacent = (Math.abs(row - eRow) + Math.abs(col - eCol)) === 1;

  if (!adjacent) return;

  swapTile(tile);
  puzzleMoves++;

  const movesEl = document.querySelector(".puzzle-moves");
  if (movesEl) movesEl.textContent = "Moves: " + puzzleMoves;

  // Check win
  const allTiles = grid.querySelectorAll(".puzzle-tile");
  let won = true;
  allTiles.forEach((t, i) => {
    if (i < 15 && t.dataset.val !== String(i + 1)) won = false;
  });
  if (won && movesEl) {
    movesEl.textContent = "Solved in " + puzzleMoves + " moves!";
  }
};

window.newPuzzle = function () {
  shufflePuzzle();
};

export const puzzleApp = {
  id: "puzzle",
  title: "Puzzle",
  icon: "🧩",
  defaultWidth: 280,
  defaultHeight: 360,
  render: () => {
    puzzleMoves = 0;

    // Create ordered tiles, then shuffle after render
    const tiles = [];
    for (let i = 0; i < 16; i++) {
      const val = i + 1;
      if (i === 15) {
        tiles.push(`<div class="puzzle-tile puzzle-empty" data-idx="${i}"></div>`);
      } else {
        tiles.push(`<div class="puzzle-tile" data-idx="${i}" data-val="${val}" onclick="puzzleClick(${i})">${val}</div>`);
      }
    }

    // Schedule shuffle after DOM insertion
    setTimeout(() => shufflePuzzle(), 50);

    return `
      <div class="app-puzzle">
        <div class="puzzle-header">
          <span class="puzzle-moves">Moves: 0</span>
          <button class="puzzle-new-btn" onclick="newPuzzle()">New Game</button>
        </div>
        <div class="puzzle-grid">
          ${tiles.join("")}
        </div>
      </div>
    `;
  },
};
