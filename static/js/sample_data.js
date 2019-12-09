// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        const create_btn = document.getElementById('add-board');
        create_btn.addEventListener('click', function () {
            dataHandler.createNewBoard("Sample", dom.showNewBoard)
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

    },
    showNewBoard: function (new_board_data) {
        // let outerHtml = '';
        // outerHtml += `
        //  <section class="board">
        //     <div class="board-header"><span class="board-title" id="board_${new_board_data.id}" contenteditable="true"> ${new_board_data.title}</span>
        //         <button class="board-add">Add Card</button>
        //         <button class="board-toggle" type="button" data-toggle="collapse" data-target="#collapseExample${new_board_data.id}" aria-expanded="true" aria-controls="collapseExample${new_board_data.id}"><i class="fas fa-chevron-down"></i></button>
        //     </div>
        //     <div class="collapse show" id="collapseExample${new_board_data.id}">
        //         <div class="card card-body">
        //             <div class="board-columns">
        //                 <div class="board-column">
        //                     <div class="board-column-title">New</div>
        //                     <div class="board-column-content">
        //
        //                     </div>
        //                 </div>
        //                 <div class="board-column">
        //                     <div class="board-column-title">In Progress</div>
        //                     <div class="board-column-content">
        //
        //                     </div>
        //                 </div>
        //                 <div class="board-column">
        //                     <div class="board-column-title">Testing</div>
        //                     <div class="board-column-content">
        //
        //                     </div>
        //                 </div>
        //                 <div class="board-column">
        //                     <div class="board-column-title">Done</div>
        //                     <div class="board-column-content">
        //
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //   </section>
        // `;

        //let boardsContainer = document.querySelector('#boards');
        //boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
        //const editable = document.getElementById(`board_${new_board_data.id}`);
        //editable.spellcheck = false;
        const template = document.querySelector('#board-template');
        const clone = document.importNode(template.content, true);
        clone.querySelector('.board-title').setAttribute('id', `board_${new_board_data.id}`);
        let editable = clone.querySelector('.board-title').setAttribute('contenteditable', 'true');
        editable.spellcheck = false;
        const toggle = clone.querySelector('.board-toggle').setAttribute('data-target',`#collapseExample${new_board_data.id}`)
        toggle.setAttribute('aria-controls',`collapseExample${new_board_data.id}`);
        clone.querySelector('.collapse show').setAttribute('id', `collapseExample${new_board_data.id}`);

        document.querySelector('#boards').appendChild(clone);


        //dom.loadCards(new_board_data.id);

        editable.addEventListener('keypress', function (e) {
            if (e.code === "Enter") {
                editable.contentEditable = "false";
                let new_title = editable.innerText;
                dataHandler.renameBoard(new_title, new_board_data.id, console.log);
                editable.contentEditable = "true";
            }
        })

    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also


        let outerHtml = '';

        for (let board of boards) {

            outerHtml += `
          <section class="board">
            <div class="board-header"><span class="board-title" id="board_${board.id}" contenteditable="true"> ${board.title}</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle" role="button" data-toggle="collapse" data-target="#collapseExample${board.id}" aria-expanded="true" aria-controls="collapseExample${board.id}"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="collapse show" id="collapseExample${board.id}">
                <div class="card card-body">
                 <div class="board-columns">
                        <div class="board-column id="column-${board.id}">
                            <div class="board-column-title">New</div>
                            <div class="board-column-content" id="column-new-${board.id}">
                            
                            </div>
                        </div>
                        <div class="board-column" id="column-${board.id}">
                            <div class="board-column-title">In Progress</div>
                            <div class="board-column-content" id="column-in-progress-${board.id}">
                            </div>
                        </div>
                        <div class="board-column" id="column-${board.id}">
                            <div class="board-column-title">Testing</div>
                            <div class="board-column-content" id="column-testing-${board.id}">
                            </div>
                        </div>
                        <div class="board-column" id="column-${board.id}">
                            <div class="board-column-title">Done</div>
                            <div class="board-column-content" id="column-done-${board.id}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          
        `;

        }

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);

        for (let board of boards) {
            //dom.loadCards(board.id);
            const editable = document.getElementById(`board_${board.id}`);
            editable.spellcheck = false;
            editable.addEventListener('keypress', function (e) {
                if (e.code === "Enter") {
                    editable.contentEditable = "false";
                    let new_title = editable.innerText;
                    dataHandler.renameBoard(new_title, board.id, console.log);
                    editable.contentEditable = "true";
                }
            })
        }

    },
    showStatuses: function (statuses) {

    },
    loadCards: function (board_id) {

        dataHandler.getCardsByBoardId(board_id, function (cards) {
            dom.showCards(board_id, cards);
        });
        // retrieves cards and makes showCards called
    },
    showCards: function (board_id, cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        // let columnNew = document.getElementById(`column-new-${board_id}`);
        // let columnInProgress = document.getElementById(`column-in-progress-${board_id}`);
        // let columnTesting = document.getElementById(`column-testing-${board_id}`);
        // let columnDone = document.getElementById(`column-done-${board_id}`);
        const template = document.querySelector('#card-template');
        const clone = document.importNode(template.content, true);
        const columnNew = clone.querySelector('#column-new');
        const columnProgress = clone.querySelector('#column-in-progress');
        const columnTest = clone.querySelector('#column-testing');
        const columnDone = clone.querySelector('#column-done');


        for (let card of cards) {
            if (card.board_id === board_id) {
                // let new_content = `
                // <div class="Card">
                //       <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                //       <div class="card-title">${card.title}</div>
                // </div>`;
                clone.querySelector('.card-title').textContent = card.title;

                if (card.status_id == 0) {
                    columnNew.setAttribute('id', `column-new-${board_id}`)
                }
                if (card.status_id == 1) {
                    columnProgress.setAttribute('id', `column-in-progress-${board_id}`)
                }
                if (card.status_id == 2) {
                    columnTest.setAttribute('id', `column-testing-${board_id}`)
                }
                if (card.status_id == 3) {
                    columnDone.setAttribute('id', `column-done-${board_id}`)
                }
                document.querySelector('#container').appendChild(cardElement);

            }
        }
    },
    // here comes more features
};
