from flask import Flask, jsonify, request, session, redirect
from functools import wraps
import requests
from random import random
from mysql_wrapper import MySQL
from time import time

from config import db_config, api_id
# from datetime import datetime

from random import randint


app = Flask(__name__, static_folder='../build/static', template_folder='../build')
db_worker = MySQL(db_config)


def check_status(func):
    @wraps(func)
    def wrapper(*args, **kwargs):        
        if 'logged_in' in session:
            return func(*args, **kwargs)
        return redirect('/entry')
    return wrapper

app.secret_key = "\xf2\xb0\xad\x1bq\xcd(\xb0\xfb\x82{@b\x18\x00\xc8\x02\xa1\xf9\x98\xd7\x8b\xf3\xa9"


@app.route('/send-sms-login', methods=['POST'])
def send_sms():
    if 'sms_sent' not in session:
        session['sms_sent'] = 0

    if 'sms_attempts_time' in session and session['sms_attempts_time'] + 60 > time():
        return jsonify({ 'time': int( session['sms_attempts_time'] + 60 - time()) })
    elif 'sms_sent_time' in session and session['sms_sent_time'] + 60 > time():
        return jsonify({ 'time': int( session['sms_sent_time'] + 60 - time()) })

    url = 'https://sms.ru/sms/send'

    phone = request.json['phone'].replace(' ','').replace('-','').replace('+','')

    if 'phone_sms_key' not in session:
        key = str(random())[2:6]
        session['phone_sms_key'] = key
    else:
        key = session['phone_sms_key']

    # payload = {
    #     'api_id': api_id,
    #     'to': phone,
    #     'msg': 'Ваш код подтверждения: %s.Наберите его в поле ввода.' %key,
    #     'json': 0
    # }

    # requests.get(url, params=payload)

    session['phone'] = phone
    session['sms_sent'] += 1

    if session['sms_sent'] >= 2:
        session['sms_sent_time'] = time()

    if 'sms_attempts' not in session:
        session['sms_attempts'] = 0
        session['sms_attempts_time'] = 0        

    print(key)
    return jsonify(key)


@app.route('/receive-sms-login', methods=['POST'])
def receive_sms():
    received_key = request.json['sms']

    if session['sms_attempts_time'] + 60 > time():
        answer = {
            'key': 3,
            'time': int(session['sms_attempts_time'] + 60 - time())
        }
        return jsonify(answer) #'время еще не вышло'

    if received_key == session['phone_sms_key']:
        phone = session['phone']
        sms = session['phone_sms_key']

        _SQL = 'INSERT INTO test (phone, password) VALUES (%s, %s)'

        db_worker.create_connection()
        db_worker.query(_SQL, (phone, sms))

        items = ['sms_attempts', 'sms_attempts_time', 'sms_sent', 'sms_sent_time', 'phone_sms_key']
        for item in items:
            if item in session:
                session.pop(item)

        answer = {
            'key': 1,
            'phone': phone,
            'sms': sms
        }

        session['logged_in'] = True
        return jsonify(answer) #'правильно'

    session['sms_attempts'] += 1

    if session['sms_attempts'] >= 3:
        session['sms_attempts_time'] = time()
        return jsonify( {'key': 2} ) #'неверно, количество превышено'

    return jsonify( {'key': 0} ) #неверно



# ------------------------------------------------- Main App ------------------------------------------------------

phone = '79883814296'


@app.route('/get-main-data', methods=['GET'])
def get_main_data():
    session['phone'] = phone

    return jsonify(None)





# ---------------------- work with adresses ---------------------------
@app.route('/get-adresses', methods=['GET'])
def get_adresses():
    
    _SQL = 'SELECT name, adress, entrance, comment, idx FROM adresses WHERE phone=%s'

    # cursor = db.cursor(dictionary=True)
    db_worker.create_connection()
    res = db_worker.select(_SQL,(session['phone'],))

    return jsonify(res)


@app.route('/save-adress', methods=['POST'])
def save_adress():
    
    data = request.json
    # name, adress, entrance, comment, idx = data.values()

    _SQL = 'INSERT INTO adresses (phone, name, adress, entrance, comment, idx) VALUES (%s,%s,%s,%s,%s,%s)'

    db_worker.create_connection()
    db_worker.query(_SQL,(session['phone'], data['name'], data['adress'], data['entrance'], data['comment'], data['idx']))

    return jsonify('COOL')
    

@app.route('/change-adress', methods=['POST'])
def change_adress():

    data = request.json

    _SQL = 'UPDATE adresses SET name=%s, adress=%s, entrance=%s, comment=%s WHERE phone=%s and idx=%s'

    db_worker.create_connection()
    db_worker.query(_SQL,(data['name'], data['adress'], data['entrance'], data['comment'], session['phone'], data['idx']))

    return jsonify(None)


@app.route('/delete-adress', methods=['POST'])
def delete_adress():
    idx = request.json

    _SQL = 'DELETE FROM adresses WHERE phone=%s and idx=%s'

    db_worker.create_connection()
    db_worker.query(_SQL,(session['phone'],idx))

    return jsonify(None)


# ------------------ promocodes --------------------

@app.route('/activate-promocode', methods=['POST'])
def activate_promocode():
    
    promocode = request.json

    _SQL = 'UPDATE promocodes SET phone = %s WHERE promocode = %s'

    cursor = db_worker.create_connection()

    cursor.execute(_SQL, (session['phone'], promocode))
    res = cursor.rowcount

    db_worker.commit()
    db_worker.close()

    if res:
        return jsonify(True)

    return jsonify(False)




# ------------------ generate-promocodes --------------------

@app.route('/generate-promocodes')
def generate_promocodes():
    code_chars = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ'

    cursor = db_worker.create_connection()
    _SQL = 'insert into promocodes set promocode = %s'

    for i in range(100):
        code = ''
        for i in range(7):
            code += code_chars[randint(0, len(code_chars)-1)]
        
        cursor.execute(_SQL,(code.lower(),))

    db_worker.commit()
    db_worker.close()

    return 'hi'








if __name__ == '__main__':
    app.run(debug=True)







# db_worker.create_connection()
# _SQL = 'SELECT id FROM test WHERE phone=%s'
# res = db_worker.select(_SQL, (phone,))

# if res:
#     return jsonify(res)














# app = Flask(__name__)

# app.secret_key = '#$Aqk^&45$$2oPfgHnmKloU5i99fG%$#'
# # api_id = '756307C7-E7DB-656A-F9F0-E012F874D80A'

# db_config = {
#     'host': '127.0.0.1',
#     'user': 'tylorNixon',
#     'password': '9python9',
#     'database': 'taxiDB'
# }


# @app.route('/entry')
# def entry():
#     return render_template('entry.html')

# @app.route('/signin', methods=['POST'])
# def signin():
#     tel = request.form['tel'].replace('-', '').replace(' ', '').replace('+','')
#     name = request.form['name']
#     key = str(random())[2:6]
#     url = 'https://sms.ru/sms/send'
#     now = datetime.now().hour

#     if now < 4:
#         hellow = 'Доброй ночи '
#     elif 3 < now < 13:
#         hellow = 'Доброе утро '
#     elif 12 < now < 18:
#         hellow = 'Добрый день '
#     else:
#         hellow = 'Добрый вечер '

#     hellow += name


#     payload = {
#         'api_id': '756307C7-E7DB-656A-F9F0-E012F874D80A',
#         'to': tel,
#         'msg': hellow + '.Ваш код подтверждения: %s' %key,
#         # 'msg': 'Привет от Lite такси. Введите %s, чтобы подтвердить номер телефона.' %key,
#         # msg = 'Ваш код подтверждения:{0}.Наберите его в поле ввода.'.format(key)
#         'json': 1
#     }

#     r = requests.get(url, params=payload)
#     data = r.json()

#     print(r.url)
#     print(data)

#     # session['phone_key'] = r
#     return 'url'



# # @app.route('/signin', methods=['GET','POST'])
# # def signin():
# #     tel = request.form['tel']
# #     _SQL = 'INSERT INTO test SET phone=%s'

# #     conn = mysql.connector.connect(**db_config)
# #     cursor = conn.cursor()

# #     cursor.execute(_SQL, (tel,))
# #     id = cursor.lastrowid   #id = connection.insert_id()
# #     print(id)

# #     conn.commit()
# #     cursor.close()
# #     conn.close()
# #     return 'qwe'









# @app.route('/add-mail')
# def mail(id=7):
#     _SQL = 'SELECT email FROM test WHERE id=%s'

#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()
#     cursor.execute(_SQL, (id,))
#     result = cursor.fetchone()
#     conn.commit()
#     cursor.close()
#     conn.close()

#     if result:
#         return jsonify(result[0])

#     return jsonify(False)


# @app.route('/user/change_mail', methods=['POST'])
# def change_mail(id=1):
#     _SQL = 'UPDATE test SET email=%s WHERE id=%s'
#     email = request.form['email']

#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()

#     cursor.execute(_SQL, (email, id))
#     cursor.execute('select email from test where id=%s', (id,))

#     r = cursor.fetchall()

#     conn.commit()
#     cursor.close()
#     conn.close()
#     print(r)

#     return jsonify(r)


# @app.route('/user/add_mail', methods=['POST'])
# def add_mail():
#     _SQL = 'INSERT INTO test SET email=%s'
    
#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()
#     email = request.form['email']
#     print(email)
#     cursor.execute(_SQL, (email,))

#     conn.commit()
#     cursor.close()
#     conn.close()

#     return email






# if __name__ == '__main__':
#     app.run(debug=True)