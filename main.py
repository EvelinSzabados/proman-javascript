from flask import Flask, render_template, url_for, request, redirect, jsonify
from util import json_response

import data_handler, persistence

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-statuses", methods=['GET', 'POST'])
@json_response
def get_statuses():
    """
    All the statuses
    """
    board_id = request.get_json()
    caught_board_id = persistence.get_statuses(force=True)
    print(board_id)
    print(caught_board_id)
    return caught_board_id


@app.route("/new-board", methods=['GET','POST'])
@json_response
def new_board():
    new_title = request.get_json()
    new_board_data = persistence.write_board_to_csv(new_title, 'data/boards.csv')
    return new_board_data


@app.route("/new-board-title", methods=['POST'])
@json_response
def new_board_title():
    new_data = request.get_json()
    new_board_data = persistence.modify_board_title(new_data, 'data/boards.csv',)
    return new_board_data


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/new-status-title", methods=['GET', 'POST'])
@json_response
def new_status_title():
    new_data = request.get_json()
    new_status_data = persistence.modify_status_title(new_data, 'data/statuses.csv', )
    return new_status_data


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
