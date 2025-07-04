# app/routes.py
from . import jeu_te
from flask import request, jsonify, session
from random import randint
from .fetch import fetch



@jeu_te.route('/jeu/mot', methods=["GET", "POST"])
def jeu_2():
    
    if request.method == "POST":
        # Getting all session to using this in the conditions to checking the word
        mot = session.get("mot")
        mot_masque = session.get("mot_masque")
        longueur = session.get("longueur")
        mot_hashed = list(mot)
        print(mot)
        
        # Getting my lettre be coming of front-end
        data = request.get_json()
        lettre = data.get("text").lower()
        try:
            lettre_str = str(lettre)
        except ValueError:
            return ({"error" : "Lettre invalide"})
        if lettre_str is None:
            return({"error" : "Lettre non fourni"})
        # Checking the lettre if include in the word
        for i, l in enumerate(mot_hashed):
            if l == lettre:
                mot_masque[i] = lettre
        
        # Restocking word-behind in session for next round
        session["mot_masque"] = mot_masque
       
        print(mot_masque)
        return({"mot_masque" : mot_masque, "longueur": longueur})
       
        # return jsonify({"message": "ok"})

    elif request.method == "GET":
        # appelle du fetch pour récupérer le mot générer par trouve-mot.fr
        result = fetch()

        # je stocke les données que j'ai besoin dans session pour éviter que cela refasse le fetach à chaque fois. 
        # Le mot
        session['mot'] = result[0][0]["name"]
        # Le mot masqué ("-")
        session["mot_masque"] = result[3]
        # La longueur du mot
        session['longueur'] = result[2]
        return  jsonify({"longueur" : result[2], "mot_masque" :result[3]})