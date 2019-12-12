import connection


def get_boards():
    return connection.execute_select('SELECT * FROM boards ORDER BY id;')


def new_board(new_title):
    return connection.execute_select('INSERT INTO boards VALUES(DEFAULT, %(new_title)s) RETURNING id',
                                     {'new_title': new_title})


def return_new_board_data(new_id):
    return connection.execute_select('SELECT * FROM boards WHERE id = %(new_id)s', {'new_id': new_id})


def update_title(new_title, board_id):
    return connection.execute_select('UPDATE boards SET title = %(new_title)s'
                                     'WHERE id= %(board_id)s', {'new_title': new_title, 'board_id': board_id})


def create_user(new_data):
    return connection.execute_select('INSERT INTO registration VALUES (DEFAULT, %(username)s,%(password)s) RETURNING id', {'username': new_data["username"],'password': new_data["password"]})


def check_username():
    return connection.execute_select(''' SELECT username FROM registration''')


def get_cards_by_board_id(board_id):
    return connection.execute_select(''' SELECT * FROM cards WHERE board_id = %(board_id)s''', {'board_id': board_id})
