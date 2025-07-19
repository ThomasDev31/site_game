from flask import Blueprint
# initialisation de mon print jeu des drapeaux
game_flag = Blueprint('jeu_flag', __name__)

from . import routes