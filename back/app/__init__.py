
from flask import Flask
from .config import Config
from flask_cors import CORS
from .jeu import jeu_bp
from .jeu_2 import jeu_te
def create_app():
    # Créer l'application Flask
    app = Flask(__name__)
    
    # Configurations de l'application
    app.config.from_object(Config)
    
    # Mise en place de CORS pour le front React
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
    
    # Enregistrer les routes
    app.register_blueprint(jeu_bp)
    app.register_blueprint(jeu_te)
    
    return app