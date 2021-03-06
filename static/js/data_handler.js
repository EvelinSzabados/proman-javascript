// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',

        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _get_api_card: function (url, data, callback) {
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)

        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object

    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    changeStatuses: function (columnId, card_id, callback) {
        let status_data = {'column_id': columnId, 'card_id': card_id};
        this._api_post('/change_status', status_data, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (board_id, callback) {

        this._api_get(`get-cards/${board_id}`, (response) => {
            this._data = response;
            callback(response);
        });
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        this._api_post('/new-board', boardTitle, (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewStatus: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        this._api_post('/create-new-status', boardTitle, (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewCard: function (boardId, callback) {
        // creates new card, saves it and calls the callback function with its data
        this._api_post('/new-card', boardId, (response) => {
            this._data = response;
            callback(response);
        })
    },
    renameBoard: function (newTitle, boardId, callback) {
        let new_header = {"id": boardId, "title": newTitle};
        this._api_post('/new-board-title', new_header, (response) => {
            this._data = response;
            callback(response);
        });
    },
    deleteCard: function (card_id, callback) {
        this._api_post('/delete-card', card_id, (response) => {
            this._data = response;
            callback(response);
        })
    }
    ,
    renameCard: function(newTitle,cardId,callback){
        let new_header = {"id": cardId, "title": newTitle};
        this._api_post('/new-card-title', new_header, (response) => {
            this._data = response;
            callback(response);
        });
    },
    deleteBoard: function (board_id, callback) {
        this._api_post('/delete-board', board_id, (response) => {
            this._data = response;
            callback(response);
        })
    }

    // here comes more features
};

