import csv, json
from flask import Flask

app = Flask(__name__)


@app.route("/overview")
def get_overview():
    data_list = []
    with open("./db/allergyBoundelss.csv", "r") as f:
        reader = csv.reader(f)
        for item in reader:
            if reader.line_num == 1:
                header = item
                continue
            data = {}
            data["id"] = int(item[0])
            data["type"] = item[1]
            filters = json.loads(item[3])
            for cat in ["drink", "symptoms", "meetings"]:
                if cat.upper() in filters:
                    data[cat] = filters[cat.upper()]
                else:
                    data[cat] = "ALL"
            data["support"] = json.loads(item[5])[3]
            data["plot"] = item[6]
            data_list.append(data)
    return {"overview": data_list}


@app.route("/<int:data_id>")
def get_data(data_id):
    data = []
    header = []
    with open("./db/allergyBoundelss.csv", "r") as f:
        reader = csv.reader(f)
        for item in reader:
            if reader.line_num == 1:
                header = item
                continue
            item_id = int(item[0])
            if item_id == data_id:
                data = item
                break
    data_dict = {}
    if not data:
        return data_dict
    for (k, v) in zip(header, data):
        if k == "data" or k == "metadata" or k == "slice":
            try:
                v = json.loads(v)
            except JSONDecodeError as e:
                raise e
        data_dict[k] = v
    return data_dict

