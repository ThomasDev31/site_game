from flask import Blueprint
# initialisation de mon print jeu des mots
jeu_te = Blueprint('jeu_2', __name__)

from .routes import jeu_2