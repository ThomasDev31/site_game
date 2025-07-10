# Vérification du nombre reçu avec le nombre stocker en session pour le jeu
# renvoie de message sous forme de json et de value true pour désactiver le jeu s'il à gagner


def check_game_result(number, nb_mystere, timeOut):
    if timeOut == True:
        return {"message": "Vous avez perdu", "number": nb_mystere, "value": True}
    else:
        if number == nb_mystere:
            return {"message": "Vous avez gagné", "number": nb_mystere, "value": True}
        elif number < nb_mystere:
            return {"message": "Non, c'est plus", "number": nb_mystere, "value": False}
        else:
            return {"message": "Non, c'est moins", "number": nb_mystere, "value": False}
