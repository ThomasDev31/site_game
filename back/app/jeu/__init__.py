from flask import Blueprint
# initialisation de mon print jeu de numbre
jeu_bp = Blueprint('jeu', __name__)

from .routes import jeu