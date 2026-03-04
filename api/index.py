from flask import Flask, render_template, jsonify, request
import json
import os
from math import radians, cos, sin, asin, sqrt

# Get the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__,
            template_folder=os.path.join(PROJECT_ROOT, 'templates'),
            static_folder=os.path.join(PROJECT_ROOT, 'static'),
            static_url_path='/static')

def load_buildings():
    data_path = os.path.join(PROJECT_ROOT, 'data', 'buildings.json')
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"buildings": []}

def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    return c * 6371 * 1000  # meters

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/buildings')
def get_buildings():
    return jsonify(load_buildings())

@app.route('/api/buildings/<building_id>')
def get_building(building_id):
    data = load_buildings()
    for b in data.get('buildings', []):
        if b['id'] == building_id:
            return jsonify(b)
    return jsonify({"error": "Not found"}), 404

@app.route('/api/search')
def search_buildings():
    query = request.args.get('q', '').lower()
    data = load_buildings()
    results = [
        b for b in data.get('buildings', [])
        if query in b['name'].lower()
        or query in b.get('description', '').lower()
        or query in b.get('code', '').lower()
    ]
    return jsonify({"results": results})

@app.route('/api/nearby')
def nearby_buildings():
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        radius = float(request.args.get('radius', 600))
        data = load_buildings()
        nearby = []
        for b in data.get('buildings', []):
            dist = haversine(lon, lat,
                             b['coordinates']['longitude'],
                             b['coordinates']['latitude'])
            if dist <= radius:
                bc = b.copy()
                bc['distance'] = round(dist)
                nearby.append(bc)
        nearby.sort(key=lambda x: x['distance'])
        return jsonify({"nearby": nearby})
    except Exception:
        return jsonify({"error": "Invalid parameters"}), 400


app = app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
