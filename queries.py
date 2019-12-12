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


def get_cards_by_board_id(board_id):
    return connection.execute_select(''' SELECT * FROM cards WHERE board_id = %(board_id)s''', {'board_id': board_id})


def modify_card_status_by_card_title(card_id, status_id):
    return connection.execute_select('''UPDATE cards SET status_id = %(status_id)s WHERE id = %(card_id)s''',
                                     {'status_id': status_id, 'card_id': card_id})


def create_new_card(board_id):
    return connection.execute_select('''INSERT INTO cards VALUES (DEFAULT, %(board_id)s,'Sample card',0, 0)
                                    RETURNING id''',
                                     {'board_id': board_id})


def update_card_title(new_title, card_id):
    return connection.execute_select('UPDATE cards SET title = %(new_title)s'
                                     'WHERE id= %(card_id)s', {'new_title': new_title, 'card_id': card_id})


def delete_card(card_id):
    return connection.execute_select('''DELETE FROM cards 
                                        WHERE cards.id = %(card_id)s''',
                                     {'card_id': card_id})


def delete_card_by_board_id(board_id):
    return connection.execute_select('''DELETE FROM cards 
                                        WHERE board_id = %(board_id)s''',
                                     {'board_id': board_id})


def delete_board(board_id):
    return connection.execute_select('''DELETE FROM boards 
                                        WHERE id = %(board_id)s''',
                                     {'board_id': board_id})
