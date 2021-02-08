import random 
import os
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

aiLines = open(os.path.basename(os.path.dirname(os.path.realpath(__file__))) + "/ai.txt", encoding="utf8").readlines() 
realLines = open(os.path.basename(os.path.dirname(os.path.realpath(__file__))) + "/real.txt", encoding="utf8").readlines() 

@app.route('/api/', methods=['GET'])
@cross_origin()
def result():
    rng = random.SystemRandom()
    if(rng.random() > 0.5):
        randomString = random.SystemRandom().choice(aiLines)
        if randomString.strip() != "====================" and randomString.strip() != " " and randomString.strip() != "\n" and randomString.strip() != "@Jerma985" and randomString.strip() != ":":
            print(randomString.strip())
            return jsonify({'string': randomString.strip(), 'result': 'ai'})
        else:
            result()
    else:
        randomString = random.SystemRandom().choice(realLines)
        return jsonify({'string': randomString.strip(), 'result': 'real'})
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)