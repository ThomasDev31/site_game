FROM python:3.13-slim

WORKDIR /back
COPY  requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY  . .

ENV FLASK_APP=run.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 80

CMD [ "python", "run.py" ]