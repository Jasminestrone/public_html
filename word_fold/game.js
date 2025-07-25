const BOARDS = [
  {
    cells: [
      ["E", "L", "W", "Y", "C"],
      ["Y", "L", "O", "A", "N"],
      ["U", "B", "L", "E", "E"],
      ["E", "L", "P", "M", "V"],
      ["P", "U", "R", "A", "U"],
    ],
    words: ["CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE"],
  },
  {
    cells: [
      ["E", "K", "O", "A", "P"],
      ["A", "W", "L", "I", "R"],
      ["N", "S", "F", "A", "T"],
      ["L", "E", "E", "R", "A"],
      ["A", "G", "G", "U", "J"],
    ],
    words: ["TAPIR", "EAGLE", "JAGUAR", "SNAKE", "WOLF"],
  },
  {
    cells: [
      ["H", "C", "N", "A", "N"],
      ["Y", "R", "A", "A", "A"],
      ["R", "E", "A", "Y", "B"],
      ["F", "P", "P", "E", "R"],
      ["I", "G", "A", "P", "A"],
    ],
    words: ["CHERRY", "PAPAYA", "BANANA", "PEAR", "FIG"],
  },
];

function make_cell_list() {
  let cells = Array.from(document.getElementById("cell-holder").children);
  let cell_board = [];
  for (let index = 0; index < 5; index++) {
    cell_board.push(cells.slice(index * 5, index * 5 + 5));
  }
  return cell_board;
}

const CELLS = make_cell_list();

console.log(CELLS);

function setup_game(board) {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      CELLS[y][x].innerHTML = board[y][x];
    }
  }
}

setup_game(BOARDS[0].cells);
document.getElementById("words").innerHTML =
  "Words to spell: " + BOARDS[0].words.join(", ");
let selected_x = -1;
let selected_y = -1;

let currentBoard = 0;

function select(x, y) {
  let cell = CELLS[y][x];
  if (cell.innerHTML.length > 0) {
    if (selected_x >= 0 && selected_y >= 0) {
      CELLS[selected_y][selected_x].classList.remove("selected");
    }
    selected_x = x;
    selected_y = y;
    cell.classList.add("selected");
  }
}
function move(x, y) {
  CELLS[y][x].innerHTML =
    CELLS[selected_y][selected_x].innerHTML + CELLS[y][x].innerHTML;
  CELLS[selected_y][selected_x].innerHTML = "";
  select(x, y);
}
function unselect(x, y) {
  CELLS[y][x].classList.remove("selected");
  selected_x = -1;
  selected_y = -1;
}

function can_move(x, y) {
  let is_next_to = Math.abs(selected_x - x) + Math.abs(selected_y - y) == 1;
  return (
    selected_x >= 0 &&
    selected_y >= 0 &&
    is_next_to &&
    CELLS[y][x].innerHTML.length > 0
  );
}

function on_click(x, y) {
  if (selected_x == x && selected_y == y) {
    unselect(x, y);
  } else if (can_move(x, y)) {
    move(x, y);
  } else {
    select(x, y);
  }
}

function reset_click() {
    
  setup_game(BOARDS[currentBoard].cells);
  if (selected_x != -1 && selected_y != -1){
        unselect(selected_x, selected_y)
    }
}

function newgame_click() {
  let v = Math.random();

  if (v <= 0.33) {
    currentBoard = 0;
  } else if (v <= 0.67) {
    currentBoard = 1;
  } else {
    currentBoard = 2;
  }

  setup_game(BOARDS[currentBoard].cells);

  if (selected_x != -1 && selected_y != -1){
    unselect(selected_x, selected_y)
}

  document.getElementById("words").innerHTML =
  "Words to spell: " + BOARDS[currentBoard].words.join(", ");
}
// theres like a little delay in between when you actually click them together and when the font scales cause they hate me i guess idk man
function scaleFont() {
    const cells = Array.from(document.getElementById("cell-holder").children);

    for (let cell of cells) {
        const text = cell.textContent.trim();

        // Skip empty cells or cells with no text content
        if (!text) continue;

        const width = cell.clientWidth;
        const height = cell.clientHeight;

        // Calculate the maximum font size that fits in the cell
        const maxFontSize = Math.min(
            width / (text.length + .75), // Horizontal fit, make the font size smaller
            height // Vertical fit based on cell height
        );

        // Apply the calculated font size to the cell (slightly smaller by multiplying by 0.8)
        const fontSize = Math.round(maxFontSize * 1);  // The 0.8 factor makes the font even smaller

        // Ensure the font size is large enough but also doesn't overflow
        cell.style.fontSize = `${fontSize}px`;

        setTimeout(scaleFont, .01); // dont work without this bad boy for some goddamn reason :(
    }
}

scaleFont();  