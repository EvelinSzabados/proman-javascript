// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        const create_btn = document.getElementById('add-board');
        create_btn.addEventListener('click', function () {
            dataHandler.createNewBoard('Rename me', dom.showNewBoard)
        })
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showNewBoard: function (new_board_data) {
        let outerHtml = '';

            outerHtml += `
         <section class="board">
            <div class="board-header"><span class="board-title" id="board_${new_board_data.id}"> ${new_board_data.title}</span>
                <button class="board-add">Add Column</button>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
          </section>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);

        // let boardsContainer = document.getElementById('board-container');
        //
        // let board_section = document.createElement('section');
        // board_section.setAttribute('class', 'board');
        // boardsContainer.appendChild(board_section);
        //
        //
        // let board_header = document.createElement('div');
        // board_header.setAttribute('class', 'board-header');
        // board_section.appendChild(board_header);
        // let title_input = document.createElement('input');
        // title_input.setAttribute('class', 'board_title_input');
        // title_input.setAttribute('id', `board_${board_data.id}`);
        // title_input.setAttribute('value', `${board.title}`);
        // board_header.appendChild(title_input);
        // let add_btn_column = document.createElement('button');
        // add_btn_column.setAttribute('class', 'board-add');
        // add_btn_column.innerText = "Add column";
        // let add_btn_card = document.createElement('button');
        // add_btn_card.setAttribute('class', 'board-add');
        // add_btn_card.innerText = "Add column";
        // let toggle = document.createElement('button');
        // toggle.setAttribute('class', 'board-toggle');
        // toggle.innerHTML = "<i class=\"fas fa-chevron-down\"></i>";
        // board_header.appendChild(add_btn_column);
        // board_header.appendChild(add_btn_card);
        // board_header.appendChild(toggle)

    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also


        let outerHtml = '';
        for (let board of boards) {
            outerHtml += `
          <section class="board">
            <div class="board-header"><span class="board-title" id="board_${board.id}"> ${board.title}</span>
                <button class="board-add">Add Column</button>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
          </section>
        `;
        }


        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};
