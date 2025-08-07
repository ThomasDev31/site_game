# app/routes.py
from . import game_pendu
from flask import request, jsonify, session
from .fetch import fetch


@game_pendu.route("/jeu/mot", methods=["GET", "POST"])
def pendu():

    if request.method == "POST":
        # Getting all session to using this in the conditions to checking the word
        mot = session.get("mot")
        mot_masque = session.get("mot_masque")
        longueur = session.get("longueur")
        life = int(session.get("life"))
        mot_hashed = list(mot)

        # Getting my lettre be coming of front-end
        data = request.get_json()
        lettre = data.get("lettre").lower()
        win = None

        try:
            lettre_str = str(lettre)
        except ValueError:
            return {"error": "Lettre invalide"}
        if lettre_str is None:
            return {"error": "Lettre non fourni"}

        # Checking the lettre if include in the word
        lettre_find = False
        for i, l in enumerate(mot_hashed):
            if l in ["é", "è", "ê", "ë"]:
                    l = "e"
            elif l in  ["ä", "â"]:
                    l = "a"
            elif l in ["ï", "î"]:
                    l = "i"
            elif l in ["ü","û"]:
                    l = "u"
            if l == lettre:
                mot_masque[i] = mot_hashed[i]
                lettre_find = True
                
        if not lettre_find and life > 0:
            life -= 1
        if mot_masque == mot_hashed:
            win = True
        if life  == 0:
            mot_masque = mot_hashed
            life = 0
            win = False

        # Restocking word-behind in session for next round
        session["mot_masque"] = mot_masque
        session["life"] = life

        return {
            "mot_masque": mot_masque,
            "longueur": longueur,
            "life": life,
            "win": win,
        }

        # return jsonify({"message": "ok"})

    # elif request.method == "GET":
    #     # appelle du fetch pour récupérer le mot générer par trouve-mot.fr
    #     result = fetch()
    #     life = 5
    #     # je stocke les données que j'ai besoin dans session pour éviter que cela refasse le fetach à chaque fois.
    #     # Le mot
    #     session["mot"] = result[0]

    #     # Le mot masqué ("-")
    #     session["mot_masque"] = result[3]
    #     # La longueur du mot
    #     session["longueur"] = result[2]

    #     session["life"] = life

    #     return jsonify({"longueur": result[2], "mot_masque": result[3], "life": life})

@game_pendu.route("/jeu/mot/param", methods=["GET", "POST"])
def paramPendu():
     if request.method == "POST":

        data = request.get_json()
        life = data.get("life")
        difficulty = data.get("difficulty")

        print(data)

        # appelle du fetch pour récupérer le mot générer par trouve-mot.fr
        result = fetch(difficulty)
        
        # je stocke les données que j'ai besoin dans session pour éviter que cela refasse le fetach à chaque fois.
        # Le mot
        session["mot"] = result[0]

        # Le mot masqué ("-")
        session["mot_masque"] = result[3]
        # La longueur du mot
        session["longueur"] = result[2]

        session["life"] = life

        return jsonify({"longueur": result[2], "mot_masque": result[3], "life": life})