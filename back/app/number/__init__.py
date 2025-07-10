from flask import Blueprint
# initialisation de mon print jeu de numbre
game_number = Blueprint('jeu_nombre', __name__)

from .routes import jeu_nombre