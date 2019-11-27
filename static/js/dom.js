// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        const create_btn = document.getElementById('add-board');
        create_btn.addEventListener('click', function () {
            dataHandler.createNewBoard('Sample board',dom.showNewBoard)
        })
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showNewBoard: function(new_board_data){
           let outerHtml = '';

            outerHtml += `
         <section class="board">
            <div class="board-header"><span class="board-title" id="board_${new_board_data.id}"> ${new_board_data.title}</span>
                <button class="board-add">Add Column</button>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns">
            <div class="board-column">
                <div class="board-column-title">New</div>
                <div class="board-column-content">
                    
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">In Progress</div>
                <div class="board-column-content">
                    
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">Testing</div>
                <div class="board-column-content">
                    
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">Done</div>
                <div class="board-column-content">
                   
                </div>
            </div>
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
            <div class="board-header"><input class="board_title_input" value="${board.title}"></input>
                <button class="board-add">Add Column</button>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns">
            <div class="board-column">
                <div class="board-column-title">New</div>
                <div class="board-column-content">
    
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">In Progress</div>
                <div class="board-column-content">
                    
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">Testing</div>
                <div class="board-column-content">
                    
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">Done</div>
                <div class="board-column-content">
                   
                </div>
            </div>
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
