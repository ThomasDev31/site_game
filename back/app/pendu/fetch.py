import requests

def fetch():
    response = requests.get(' https://trouve-mot.fr/api/random')
    data = response.json()
    mot = data[0]["name"]
    lettre = list(mot)
    longueur = len(lettre)
    tab_longueur = ['-' for _ in range(longueur)]
        
    return [data, lettre, longueur, tab_longueur]