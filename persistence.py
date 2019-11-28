import csv, data_handler

STATUSES_FILE = './data/statuses.csv'
BOARDS_FILE = './data/boards.csv'
CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def _read_csv(file_name):
    """
    Reads content of a .csv file
    :param file_name: relative path to data file
    :return: OrderedDict
    """
    with open(file_name) as boards:
        rows = csv.DictReader(boards, delimiter=',', quotechar='"')
        formatted_data = []
        for row in rows:
            formatted_data.append(dict(row))
        return formatted_data


def add_id_to_new_board(file_name):
    existing_boards = _read_csv(file_name)
    new_id = 0
    length_of_boards_list = len(existing_boards)
    i = 0
    while i < length_of_boards_list:
        for key, value in existing_boards[i].items():
            if key == "id":
                if int(value) > new_id:
                    new_id = int(value)
        i += 1
    new_id += 1
    return new_id


def modify_board_title(new_data, file_name):

    all_data = get_boards(force=True)

    with open(file_name, 'w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, delimiter=',', quotechar='"', fieldnames=['id', 'title'])
        writer.writeheader()

        for line in all_data:

            if int(line['id']) == int(new_data['id']):

                line['title'] = new_data['title']

            writer.writerow(line)



def write_board_to_csv(title, file_name):
    with open(file_name, 'a', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, delimiter=',', quotechar='"', fieldnames=['id', 'title'])
        new_id = add_id_to_new_board(file_name)
        new_data_row = {'id': new_id, 'title': title}
        writer.writerow(new_data_row)
    return new_data_row


def write_statuses_to_csv(title, file_name):
    with open(file_name, 'a', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, delimiter=',', quotechar='"', fieldnames=['id', 'title'])
        new_id = add_id_to_new_board(file_name)
        writer.writerow({'id': new_id, 'title': title})


def _get_data(data_type, file, force):
    """
    Reads defined type of data from file or cache
    :param data_type: key where the data is stored in cache
    :param file: relative path to data file
    :param force: if set to True, cache will be ignored
    :return: OrderedDict
    """
    if force or data_type not in _cache:
        _cache[data_type] = _read_csv(file)
    return _cache[data_type]


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


def get_statuses(force=False):
    return _get_data('statuses', STATUSES_FILE, force)


def get_boards(force=False):
    return _get_data('boards', BOARDS_FILE, force)


def get_cards(force=False):
    return _get_data('cards', CARDS_FILE, force)
