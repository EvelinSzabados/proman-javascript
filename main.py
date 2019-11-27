from flask import Flask, render_template, url_for, request, redirect,jsonify
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


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    All the statuses
    """
    return persistence.get_statuses()


@app.route("/new-board", methods=['GET','POST'])
@json_response
def new_board():

    new_title = request.get_json()
    new_board_data = persistence.write_board_to_csv(new_title, 'data/boards.csv')
    return new_board_data


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/create-new-status", methods=['GET','POST'])
@json_response
def create_new_status():

    new_statuses=request.get_json()
    persistence.write_board_to_csv(new_statuses,'data/statuses.csv')
    return new_statuses

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
