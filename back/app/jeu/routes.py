# app/routes.py
from . import jeu_bp
from flask import request, jsonify, session
from random import randint
from .logic_game import check_game_result

@jeu_bp.route('/jeu/number' , methods=["GET","POST"])
def jeu():

    # Recupération des données du front en method post (récupération du nombre)

    if request.method == "POST":
        data = request.get_json()
        number_str = data.get('number')

        # Vérification de la valeur reçu (savoir si c'est int)
        try:
            number = int(number_str)  
        except ValueError:
            return jsonify({"error": "Nombre invalide"}), 400
        if number is None:
            return jsonify({"error": "Nombre non fourni"}), 400
        
        # Récupération de la session où le nombre de départ qui a été générer quand la page est chargé 
        nb_mystere = session.get('nb')
        
        # Vérification de si la session existe sinon le jeu ne démarre pas 
        if nb_mystere is None:
            return jsonify({"error": "Le jeu n'a pas démarré"}), 400
        
        result = check_game_result (number, nb_mystere)
        return jsonify(result)
    # Initialisation du nombre qui est a deviné + envoie en json de result true pour lancer le jeu
    elif request.method=="GET":
        nb_mystere = randint(0, 100)
        session['nb'] = nb_mystere
        return jsonify({
            "result": True,
        }) 