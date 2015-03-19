import urllib
import urllib2

url = "http://wikifish-site.herokuapp.com/api/fish"

dados = open("dados.csv").read().split("\n")


countAdd = 0;

for line in dados[1:]:
    row = line.split(",")

    usual_name = row[0]
    cientific_name = row[1]
    ph = row[2]
    dh = row[3]
    temperature = row[4]
    maximumlenght = row[5]
    aquarium_litters = row[6]
    alimentation = row[7]
    reproduction = row[8]
    illumination = row[9]
    temperament = row[10]
    aquarium_setup = row[11]
    swimming = row[12]
    url_picture = row[13]
    region = row[14]

    params = urllib.urlencode({
      "usual_name": usual_name.lower(),
      "cientific_name": cientific_name.lower(),
      "ph": ph,
      "dh": dh,
      "temperature": temperature,
      "maximumlenght": maximumlenght,
      "aquarium_litters": aquarium_litters,
      "alimentation": alimentation.upper(),
      "reproduction": reproduction.upper(),
      "illumination": illumination.upper(),
      "temperament": temperament.upper(),
      "aquarium_setup": aquarium_setup.upper(),
      "swimming": swimming.upper(),
      "url_picture": url_picture,
      "region": region.lower()
    })

    try:
        response = urllib2.urlopen(url, params).read()

        print response
    except urllib2.HTTPError as err:
        print 'Error: {0}: {1}'.format(err, err.strerror)