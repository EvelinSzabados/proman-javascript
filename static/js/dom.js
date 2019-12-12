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
        const section = clone.querySelector('.board');
        section.setAttribute('id', `section_board_${board_data.id}`);

        const new_card_btn = clone.querySelector('.board-add');
        new_card_btn.addEventListener('click', function () {
            dataHandler.createNewCard(board_data.id, dom.load_new_card)
        });

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

        dom.templateBoards(board[0]);
        dom.loadCards(board[0].id)

    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        for (let board of boards) {

            dom.templateBoards(board);
            dom.loadCards(board.id);


        }


    },
    getStatuses: function () {
        // const columnNew = document.querySelector('#column-new');
        // const columnProgress = document.querySelector('#column-in-progress');
        // const columnTest = document.querySelector('#column-testing');
        // const columnDone = document.querySelector('#column-done');
        // dragula([columnNew, columnProgress, columnTest, columnDone])
        //     .on('drop', function (el) {
        //         console.log('hello');
        //     })

    },

    loadCards: function (board_id) {

        dataHandler.getCardsByBoardId(board_id, function (cards) {
            dom.showCards(board_id, cards);
        });
        // retrieves cards and makes showCards called
    },
    showCards: function (board_id, cards) {

        const templateCard = document.querySelector('#card-template');
        const templateColumn = document.querySelector('#column-template');
        const cloneColumn = document.importNode(templateColumn.content, true);

        const columnNew = cloneColumn.querySelector('#column-new');
        const columnProgress = cloneColumn.querySelector('#column-in-progress');
        const columnTest = cloneColumn.querySelector('#column-testing');
        const columnDone = cloneColumn.querySelector('#column-done');
        dragula([columnNew, columnProgress, columnTest, columnDone]).on('drop', function (el, container) {
            let draggedId = el.id;
            let column_id = container.id;
            dataHandler.changeStatuses(column_id, draggedId, console.log)
        });


        const boardColumns = document.querySelector(`#section_board_${board_id} .board-columns`);
        for (let card of cards) {
            const cloneCard = document.importNode(templateCard.content, true);
            const cardTitle = cloneCard.querySelector('.card-title');
            const cardContainer = cloneCard.querySelector('.Card');
            cardContainer.setAttribute('id', `${card.id}`);
            cardTitle.textContent = card.title;
            cardTitle.setAttribute('id', `board_${card.id}`);
            cardTitle.setAttribute('contenteditable', 'true');
            cardTitle.spellcheck = false;


            const delete_card =cloneCard.querySelector('.card-remove')
            delete_card.addEventListener('click', function(){
                cardContainer.remove()
                dataHandler.deleteCard(card.id, console.log)
            })


            if (parseInt(card.status_id) === 0) {
                columnNew.appendChild(cloneCard);
            }
            if (parseInt(card.status_id) === 1) {
                columnProgress.appendChild(cloneCard)
            }
            if (parseInt(card.status_id) === 2) {
                columnTest.appendChild(cloneCard)
            }
            if (parseInt(card.status_id) === 3) {
                columnDone.appendChild(cloneCard)
            }
            cardTitle.addEventListener('keypress', function (event) {
                if (event.code === "Enter") {
                    cardTitle.contentEditable = "false"; // if you hit enter, the title are wont be editable
                    let new_title = cardTitle.innerText;
                    dataHandler.renameCard(new_title, card.id, console.log);
                    cardTitle.contentEditable = "true"; // after saving new title the are will be editable again
                }
            })
        }

        boardColumns.appendChild(cloneColumn);
        dom.getStatuses();

    },
    load_new_card: function (data) {
        dataHandler.getCardsByBoardId(data.boardId, function (cards) {
            dom.showNewCard(data, cards);
        });
    },
    showNewCard: function (data, cards) {

        const boardColumns = document.querySelector(`#section_board_${data.boardId} .board-columns`);
        const columnNew = boardColumns.querySelector('#column-new');
        const columnProgress = boardColumns.querySelector('#column-in-progress');
        const columnTest = boardColumns.querySelector('#column-testing');
        const columnDone = boardColumns.querySelector('#column-done');
        const templateCard = document.querySelector('#card-template');


        for (let card of cards) {
            const cloneCard = document.importNode(templateCard.content, true);
            const cardTitle = cloneCard.querySelector('.card-title');
            cardTitle.setAttribute('id', `board_${card.id}`);
            cardTitle.setAttribute('contenteditable', 'true');
            cardTitle.spellcheck = false;
            const cardContainer = cloneCard.querySelector('.Card');
            cardContainer.setAttribute('id', `${card.id}`);

            const delete_card =cloneCard.querySelector('.card-remove')
            delete_card.addEventListener('click', function(){
                cardContainer.remove()
                dataHandler.deleteCard(card.id, console.log)
            })

            if (card.board_id === data.boardId && card.id === data.cardId) {
                cardTitle.textContent = card.title;
                cardContainer.setAttribute('id', `${card.id}`);

                if (parseInt(card.status_id) === 0) {
                    columnNew.appendChild(cloneCard);
                }
                if (parseInt(card.status_id) === 1) {
                    columnProgress.appendChild(cloneCard)
                }
                if (parseInt(card.status_id) === 2) {
                    columnTest.appendChild(cloneCard)
                }
                if (parseInt(card.status_id) === 3) {
                    columnDone.appendChild(cloneCard)
                }
            }
            cardTitle.addEventListener('keypress', function (event) {
                if (event.code === "Enter") {
                    cardTitle.contentEditable = "false"; // if you hit enter, the title are wont be editable
                    let new_title = cardTitle.innerText;
                    dataHandler.renameCard(new_title, card.id, console.log);
                    cardTitle.contentEditable = "true"; // after saving new title the are will be editable again
                }
            })
        }
    },

};
