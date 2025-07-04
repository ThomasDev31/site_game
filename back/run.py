
from app import create_app

# Crée l'application Flask
app = create_app()

# Lance le serveur Flask
if __name__ == "__main__":
    app.run(debug=True)