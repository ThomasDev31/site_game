# app/routes.py
from . import game_flag
from flask import request, jsonify, session
import requests
from random import randint


@game_flag.route('/jeu/flag' , methods=["GET","POST"])
def jeu_flag():
    reponse = requests.get('https://restcountries.com/v3.1/all?fields=cca2,name')
    data = reponse.json()
    flags = []
    for name in data : 
        flags.append(name['cca2'].lower())
    return jsonify({"test": "ok", "flag" : flags})