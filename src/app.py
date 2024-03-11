from flask import Flask, jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345678@database-1.cp60ciogc0zw.ap-southeast-2.rds.amazonaws.com:5432/postgres'
db = SQLAlchemy(app)

class PostcodeGeo(db.Model):
    __tablename__ = 'postcodes_geo'
    id = db.Column(db.Integer, primary_key=True)
    postcode = db.Column(db.String(5))
    suburb = db.Column(db.String(100))
    state = db.Column(db.String(4))
    latitude = db.Column(db.Numeric(6, 3))
    longitude = db.Column(db.Numeric(6, 3))
    
CORS(app)
# CORS(app, resources={r"/get_*": {"origins": "http://192.168.56.1:3000"}})

@app.route('/get_all_data', methods=['GET'])
def get_all_data():
    data = PostcodeGeo.query.all()
    data_list = []
    for item in data:
        data_list.append({
            'id': item.id,
            'postcode': item.postcode,
            'suburb': item.suburb,
            'state': item.state,
            'latitude': float(item.latitude),
            'longitude': float(item.longitude)
        })
    return jsonify(data_list)

@app.route('/get_data_by_suburb', methods=['GET'])
# def get_data_by_postcode():
#     postcode = request.args.get('postcode')
#     data = PostcodeGeo.query.filter_by(postcode=postcode).all() 
#     results = []
#     for item in data:
#         results.append({
#             'id': item.id,
#             'postcode': item.postcode,
#             'suburb': item.suburb,
#             'state': item.state,
#             'latitude': float(item.latitude),
#             'longitude': float(item.longitude)
#         })
#     return jsonify(results)

def get_data_by_suburb():
    suburb = request.args.get('suburb')
    data = PostcodeGeo.query.filter(PostcodeGeo.suburb.ilike(f"%{suburb}%")).all()  # Case-insensitive matching
    results = [{'id': item.id, 'suburb': item.suburb, 'latitude': float(item.latitude), 'longitude': float(item.longitude)} for item in data]
    return jsonify(results)



if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)


