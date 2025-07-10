from flask import Flask
from .config import Config
from flask_cors import CORS
from .number import game_number
from .pendu import game_pendu
from .flag import game_flag

# from .flag import jeu_flag
def create_app():
    # Créer l'application Flask
    app = Flask(__name__)

    # Configurations de l'application
    app.config.from_object(Config)

    # Mise en place de CORS pour le front React
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    # Enregistrer les routes
    app.register_blueprint(game_number)
    app.register_blueprint(game_pendu)
    app.register_blueprint(game_flag)

    return app
