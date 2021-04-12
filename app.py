import requests
import json
from requests.auth import HTTPDigestAuth
from flask_cors import CORS
#from gevent.pywsgi import WSGIServer
from flask import jsonify, Flask, request, render_template, send_from_directory
import os

url = 'http://192.168.1.108/cgi-bin/videoStatServer.cgi?action=getSummary&channel=1'
exampleData = """summary.Channel=0
summary.EnteredSubtotal.Hour=22
summary.EnteredSubtotal.Today=12
summary.EnteredSubtotal.Total=1
summary.EnteredSubtotal.TotalInTimeSection=33
summary.ExitedSubtotal.Hour=11
summary.ExitedSubtotal.Today=12
summary.ExitedSubtotal.Total=10
summary.ExitedSubtotal.TotalInTimeSection=22
summary.InsideSubtotal.Total=12
summary.RuleName=NumberStat
summary.UTC=1615580510"""


# First Api call (get people count)
url = 'http://192.168.1.108/cgi-bin/videoStatServer.cgi?action=getSummary&channel=1'
# Second Api call (reset camera people count to 0)
clearUrl = 'http://192.168.1.108/cgi-bin/videoStatServer.cgi?action=clearSectionStat&'
# Variable to fix the camera bug
# shambles = 0
SettingsFile = 'settings.json'

def write_json(data, filename=SettingsFile):
    with open(filename, 'w') as f:
        json.dump(data, f)


app = Flask(__name__, template_folder='out', static_folder='out/', static_url_path='')
CORS(app)

from pyfladesk import init_gui


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/api')
def getDahua():
    def getData():
        MaxPeople = 1
        # Dahua = requests.get(url, auth=HTTPDigestAuth('admin', 'Lupata1488*'))

        with open(SettingsFile, 'r') as openfile:
            Item = json.load(openfile)
            MaxPeople = Item['MaxPeople']

        # Turns all values to a list of lines
        # DahuaValues = Dahua.text.splitlines()
        DahuaValues = exampleData.splitlines()
        # DahuaValues = exampleData.splitlines()

        # Total of people entered today:
        PeopleInString = DahuaValues[4]
        PeopleIn = int(PeopleInString.split("=", 1)[1])

        # Total number of people exited today:
        PeopleOutString = DahuaValues[8]
        PeopleOut = int(PeopleOutString.split("=", 1)[1])

        # Total number of people inside right now + bug fix
        PeopleCount = PeopleIn - PeopleOut

        # Number of people still allowed to enter
        AllowedToEnter = MaxPeople - PeopleCount

        # Return peopleCount, people in, people out
        res = {"PeopleIn": PeopleIn, "PeopleOut": PeopleOut,
               "PeopleCount": PeopleCount, "MaxPeople": MaxPeople}

        return res

    data = getData()

    if data["PeopleCount"] < 0:
        requests.get(clearUrl, auth=HTTPDigestAuth('admin', 'Lupata1488*'))
        data = jsonify(getData())
        data.status_code = 200
        return data

    data = jsonify(getData())
    data.status_code = 200
    return data


@app.route('/firstboot')
def fixDahua():
    requests.get(clearUrl, auth=HTTPDigestAuth('admin', 'Lupata1488*'))
    res = jsonify('success')
    res.status_code = 200
    return res


@app.route('/changeVals', methods=['POST'])
def changeVals():
    num = request.json['maxPeople']
    write_json({"MaxPeople": num})
    return jsonify('success'), 200


if __name__ == '__main__':
    init_gui(app, 5000)
    # app.run(debug=True)


# #Fix the peoplecounting bug on first launch, call only once
# @app.route('/firstboot')
# def fixDahua():

#     global shambles

#     Dahua = requests.get(url, auth=HTTPDigestAuth('admin', 'Lupata1488*'))

#     # Turns all values to a list of lines
#     DahuaValues = Dahua.text.splitlines()
#     # DahuaValues = exampleData.text.splitlines()
#     # DahuaValues = exampleData.splitlines()

#     # Total of people entered today:
#     PeopleInString = DahuaValues[4]
#     PeopleIn = int(PeopleInString.split("=", 1)[1])

#     # Total number of people exited today:
#     PeopleOutString = DahuaValues[8]
#     PeopleOut = int(PeopleOutString.split("=", 1)[1])

#     # Total number of people inside right now + bug fix
#     PeopleCount = PeopleIn - PeopleOut

#     #Fix people counting bug
#     if PeopleCount < 0:

#         shambles = -PeopleCount
#     res = jsonify('success')
#     res.status_code = 200
#     return res
