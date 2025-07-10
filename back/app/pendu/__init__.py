from flask import Blueprint
# initialisation de mon print jeu des mots
game_pendu = Blueprint('pendu', __name__)

from .routes import pendu