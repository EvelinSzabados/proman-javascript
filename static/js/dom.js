// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        const create_btn = document.getElementById('add-board');
        create_btn.addEventListener('click', function () {
            dataHandler.createNewBoard('Rename me', dom.showNewBoard)
        })
        const create_status_btn = document.getElementById('add-status');
        create_status_btn.addEventListener('click',function(){
            dataHandler.createNewStatus('New Status',dom.loadStatuses) //reload tables
        })
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    loadStatuses: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getStatuses(function (statuses) {
            dom.showStauses(statuses);
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
