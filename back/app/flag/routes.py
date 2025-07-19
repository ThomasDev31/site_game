# app/routes.py
from . import game_flag
from flask import request, jsonify, session
import requests
import random


@game_flag.route('/jeu/flag' , methods=["GET","POST"])
def jeu_flag():
    if request.method == "POST":
        region = request.get_json()
        region = region['e']
        url = ""

        if region == "all": 
            url = "https://restcountries.com/v3.1/all?fields=cca2,translations"
        else : 
            url = f"https://restcountries.com/v3.1/region/{region}"

        reponse = requests.get(url)
        data = reponse.json()

        flags = []
        if region == "all": 
            for name in data : 
                flags.append({"id" : name['cca2'].lower(), "name" : name["translations"]["fra"]["common"]})
        else :
            for name in data : 
                flags.append({"id" : name['cca2'].lower(),"name" : name["translations"]["fra"]["common"]})
        random.shuffle(flags)
        print("Les datas",flags)
        print("Les regions", region)
        print(url)

        return jsonify({"test": "test","flag" :flags})
    return jsonify({"message" : "Bienvenu sur le jeu de drapeaux"})
    


@game_flag.route('/jeu/flag/check', methods=["POST"])
def check_flag_answer():
    data = request.get_json()
    flag_id = data.get("flag")
    guess = data.get("guess", "").strip().lower()

    url = "https://restcountries.com/v3.1/all?fields=cca2,translations"
    reponse = requests.get(url)
    countries = reponse.json()  

    flags = {}
    for item in countries: 
        flags[item['cca2'].lower()] = item["translations"]["fra"]["common"].strip().lower()


    correct_name = flags.get(flag_id)

    if not correct_name:
        return jsonify({
            "success" : False, "error" : "Le code du drapeau n'est pas bon"
        }), 400
    is_correct = guess == correct_name

    return jsonify({"success" : True, "correct" : is_correct, })
