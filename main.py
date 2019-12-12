from flask import Flask, render_template, url_for, request, redirect, jsonify, json, session
from util import json_response
import bcrypt

import data_handler, persistence, queries

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

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

    return queries.get_boards()


@app.route("/get-statuses", methods=['GET', 'POST'])
@json_response
def get_statuses():
    """
    All the statuses
    """
    board_id = request.get_json()
    caught_board_id = persistence.get_statuses(force=True)

    return caught_board_id


@app.route("/new-board", methods=['GET', 'POST'])
@json_response
def new_board():
    new_title = request.get_json()
    new_id = queries.new_board(new_title)
    new_board_data = queries.return_new_board_data(new_id[0]['id'])

    return new_board_data


@app.route("/new-board-title", methods=['POST'])
@json_response
def new_board_title():
    new_data = request.get_json()
    new_title = new_data['title']
    board_id = new_data['id']
    queries.update_title(new_title, board_id)
    new_board_data = queries.return_new_board_data(board_id)
    return new_board_data


@app.route("/get-cards/<board_id>", methods=['GET', 'POST'])
@json_response
def get_cards_for_board(board_id: int):
    return queries.get_cards_by_board_id(board_id)


@app.route("/create-new-status", methods=['GET', 'POST'])
@json_response
def create_new_status():
    new_statuses = request.get_json()
    persistence.write_board_to_csv(new_statuses, 'data/statuses.csv')
    return new_statuses

@app.route('/register', methods=['GET', 'POST'])
def register():
    message = "false"
    if request.method == 'POST':
        username = request.form.get('username')
        existing_user_names = queries.check_username()

        for user in existing_user_names:
            if user['username'] == username:
                return render_template('register.html', message="false")
            else:
                message = "true"
        hashed_bytes = bcrypt.hashpw(request.form.get('password').encode('utf-8'), bcrypt.gensalt())
        register_data = {
            'username': username,
            'password': hashed_bytes.decode('utf-8')
        }

        queries.create_user(register_data)
        return render_template('register.html', message=message)

    return render_template('register.html', message="none")


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':

        login_username = request.form.get('username')
        login_password = request.form.get('password')
        existing_data = queries.login()
        for user in existing_data:
            hash_to_check = user['password']
            hashed_bytes_password = hash_to_check.encode('utf-8')
            is_match = bcrypt.checkpw(login_password.encode('utf-8'), hashed_bytes_password)
            if user['username'] == login_username and is_match is True:
                session['username'] = login_username
                return redirect(url_for('index', is_match=is_match))

        return render_template('login.html', is_match=False)
    return render_template('login.html', is_match="none")


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
