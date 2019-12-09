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
    templateBoards: function (board_data) {
        // get templates and create clone
        const template = document.querySelector('#board-template');
        const clone = document.importNode(template.content, true);

        //get elements of template and set attributes
        let editable = clone.querySelector('.board-title');
        editable.textContent = board_data.title;
        editable.setAttribute('id', `board_${board_data.id}`);
        editable.setAttribute('contenteditable', 'true');
        editable.spellcheck = false;
        const toggle = clone.querySelector('.board-toggle');
        toggle.setAttribute('data-target', `#collapseExample${board_data.id}`);
        toggle.setAttribute('aria-controls', `collapseExample${board_data.id}`);
        const collapse = clone.querySelector('.collapse');
        collapse.setAttribute('id', `collapseExample${board_data.id}`);
        const columnTitle = clone.querySelector('.board-column-title');
        columnTitle.setAttribute('id', `column-${board_data.id}`);

        //add new template elements to html (main board section in index.html)

        document.querySelector('#boards').appendChild(clone);
        // editing title function that saves new title
        editable.addEventListener('keypress', function (event) {
            if (event.code === "Enter") {
                editable.contentEditable = "false"; // if you hit enter, the title are wont be editable
                let new_title = editable.innerText;
                dataHandler.renameBoard(new_title, board_data.id, console.log);
                editable.contentEditable = "true"; // after saving new title the are will be editable again
            }
        });



    },
    showNewBoard: function (board) {

        dom.templateBoards(board);

    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        for (let board of boards) {

            dom.templateBoards(board);

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
