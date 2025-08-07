import requests
difficulty = "difficile"


def fetch(difficulty):
    while True:
        response = requests.get(' https://trouve-mot.fr/api/random')
        data = response.json()
        mot = data[0]["name"]
        if difficulty == "facile" and len(mot) <= 5:
            break
        elif difficulty == "moyen" and 6 <= len(mot) <= 8:
            break
        elif difficulty == "difficile" and len(mot) > 8:
            break 
    lettre = list(mot)
    longueur = len(lettre)
    tab_longueur = ['-' for _ in range(longueur)]

    return [mot ,lettre, longueur, tab_longueur]
        