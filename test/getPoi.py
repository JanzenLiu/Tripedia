from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import WebDriverException
from json import dumps, JSONEncoder
import re

poiByCity = [
{'cityPath': 'france/nice', 'pois': [{'path': '/france/nice/attractions/musee-d-art-moderne-et-d-art-contemporain/a/poi-sig/1188487/1322981', 'name': 'Musée d’Art Moderne et d’Art Contemporain'}, {'path': '/france/nice/attractions/musee-matisse/a/poi-sig/1196791/1322981', 'name': 'Musée Matisse'}, {'path': '/france/nice/attractions/port-lympia/a/poi-sig/1196848/1322981', 'name': 'Port Lympia'}, {'path': '/france/nice/attractions/musee-national-marc-chagall/a/poi-sig/1196793/1322981', 'name': 'Musée National Marc Chagall'}, {'path': '/france/nice/attractions/cathedrale-orthodoxe-russe-st-nicolas/a/poi-sig/410074/1322981', 'name': 'Cathédrale Orthodoxe Russe St-Nicolas'}]},
{'cityPath': 'france/provence/marseille', 'pois': [{'path': '/france/provence/marseille/attractions/musee-des-civilisations-de-l-europe-et-de-la-mediterranee/a/poi-sig/1226376/359286', 'name': 'Musée des Civilisations de l’Europe et de la Méditerranée'}, {'path': '/france/provence/marseille/attractions/le-panier/a/poi-sig/1195462/359286', 'name': 'Le Panier'}, {'path': '/france/provence/marseille/attractions/villa-mediterranee/a/poi-sig/1496147/359286', 'name': 'Villa Méditerranée'}, {'path': '/france/provence/marseille/attractions/basilique-notre-dame-de-la-garde/a/poi-sig/399731/359286', 'name': 'Basilique Notre Dame de la Garde'}, {'path': '/france/provence/marseille/attractions/vieux-port/a/poi-sig/1195435/359286', 'name': 'Vieux Port'}, {'path': '/france/provence/marseille/attractions/centre-de-la-vieille-charite/a/poi-sig/399733/359286', 'name': 'Centre de la Vieille Charité'}, {'path': '/france/provence/marseille/attractions/chateau-d-if/a/poi-sig/399735/359286', 'name': 'Château d’If'}, {'path': '/france/provence/marseille/attractions/musee-cantini/a/poi-sig/399743/359286', 'name': 'Musée Cantini'}, {'path': '/france/provence/marseille/attractions/la-cite-radieuse/a/poi-sig/1227036/359286', 'name': 'La Cité Radieuse'}]},
{'cityPath': 'france/burgundy-and-the-rhone/lyon', 'pois': [{'path': '/france/burgundy-and-the-rhone/lyon/attractions/musee-des-beaux-arts/a/poi-sig/417298/359234', 'name': 'Musée des Beaux-Arts'}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/basilique-notre-dame-de-fourviere/a/poi-sig/417258/359234', 'name': 'Basilique Notre Dame de Fourvière'}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/lyon-confluence/a/poi-sig/417276/359234', 'name': 'Lyon Confluence'}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/musee-des-confluences/a/poi-sig/417300/359234', 'name': 'Musée des Confluences'}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/place-des-terreaux/a/poi-sig/417316/359234', 'name': 'Place des Terreaux'}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/musees-gadagne/a/poi-sig/1192297/359234', 'name': 'Musées Gadagne'}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/parc-de-la-tete-d-or/a/poi-sig/417312/359234', 'name': "Parc de la Tête d'Or"}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/opera-de-lyon/a/poi-sig/417248/359234', 'name': 'Opéra de Lyon'}, {'path': '/france/burgundy-and-the-rhone/lyon/attractions/centre-d-histoire-de-la-resistance-et-de-la-deportation/a/poi-sig/417262/359234', 'name': "Centre d'Histoire de la Résistance et de la Déportation"}]},
{'cityPath': 'france/provence/avignon', 'pois': [{'path': '/france/provence/avignon/attractions/palais-des-papes/a/poi-sig/418483/359285', 'name': 'Palais des Papes'}, {'path': '/france/provence/avignon/attractions/pont-st-benezet/a/poi-sig/1193710/359285', 'name': 'Pont St-Bénezet'}, {'path': '/france/provence/avignon/attractions/musee-du-petit-palais/a/poi-sig/418475/359285', 'name': 'Musée du Petit Palais'}, {'path': '/france/provence/avignon/attractions/musee-angladon/a/poi-sig/418471/359285', 'name': 'Musée Angladon'}, {'path': '/france/provence/avignon/attractions/place-du-palais/a/poi-sig/1196146/359285', 'name': 'Place du Palais'}, {'path': '/france/provence/avignon/attractions/musee-lapidaire/a/poi-sig/1536129/359285', 'name': 'Musée Lapidaire'}, {'path': '/france/provence/avignon/attractions/collection-lambert/a/poi-sig/1265295/359285', 'name': 'Collection Lambert'}, {'path': '/france/provence/avignon/attractions/musee-calvet/a/poi-sig/418473/359285', 'name': 'Musée Calvet'}, {'path': '/france/provence/avignon/attractions/basilique-st-pierre/a/poi-sig/1512559/359285', 'name': 'Basilique St-Pierre'}]},
{'cityPath': 'france/southwestern-france/bordeaux', 'pois': [{'path': '/france/southwestern-france/bordeaux/attractions/la-cite-du-vin/a/poi-sig/1537668/359293', 'name': 'La Cité du Vin'}, {'path': '/france/southwestern-france/bordeaux/attractions/miroir-d-eau/a/poi-sig/1537398/359293', 'name': "Miroir d'Eau"}, {'path': '/france/southwestern-france/bordeaux/attractions/musee-du-vin-et-du-negoce/a/poi-sig/1537490/359293', 'name': 'Musée du Vin et du Négoce'}, {'path': '/france/southwestern-france/bordeaux/attractions/musee-d-aquitaine/a/poi-sig/452933/359293', 'name': "Musée d'Aquitaine"}, {'path': '/france/southwestern-france/bordeaux/attractions/musee-des-beaux-arts/a/poi-sig/452937/359293', 'name': 'Musée des Beaux-Arts'}, {'path': '/france/southwestern-france/bordeaux/attractions/musee-d-art-contemporain/a/poi-sig/452923/359293', 'name': "Musée d'Art Contemporain"}, {'path': '/france/southwestern-france/bordeaux/attractions/cathedrale-st-andre/a/poi-sig/1196013/359293', 'name': 'Cathédrale St-André'}, {'path': '/france/southwestern-france/bordeaux/attractions/tour-pey-berland/a/poi-sig/1193620/359293', 'name': 'Tour Pey Berland'}, {'path': '/france/southwestern-france/bordeaux/attractions/musee-des-arts-decoratifs-et-du-design/a/poi-sig/452935/359293', 'name': 'Musée des Arts Décoratifs et du Design'}]},
{'cityPath': 'france/cote-dazur/cannes', 'pois': [{'path': '/france/cote-dazur/cannes/attractions/la-croisette/a/poi-sig/1227608/359252', 'name': 'La Croisette'}, {'path': '/france/cote-dazur/cannes/attractions/iles-de-lerins/a/poi-sig/1270506/359252', 'name': 'Îles de Lérins'}, {'path': '/france/cote-dazur/cannes/attractions/palais-des-festivals-et-des-congres/a/poi-sig/1188653/359252', 'name': 'Palais des Festivals et des Congrès'}, {'path': '/france/cote-dazur/cannes/attractions/la-malmaison/a/poi-sig/428884/359252', 'name': 'La Malmaison'}, {'path': '/france/cote-dazur/cannes/attractions/vieux-port/a/poi-sig/428900/359252', 'name': 'Vieux Port'}, {'path': '/france/cote-dazur/cannes/attractions/le-suquet/a/poi-sig/1196940/359252', 'name': 'Le Suquet'}, {'path': '/france/cote-dazur/cannes/attractions/hotel-de-ville/a/poi-sig/1251682/359252', 'name': 'Hôtel de Ville'}]},
{'cityPath': 'france/alsace-and-lorraine/strasbourg', 'pois': [{'path': '/france/alsace-and-lorraine/strasbourg/attractions/cathedrale-notre-dame/a/poi-sig/417553/359225', 'name': 'Cathédrale Notre-Dame'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/palais-rohan/a/poi-sig/417575/359225', 'name': 'Palais Rohan'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/grande-ile/a/poi-sig/417559/359225', 'name': 'Grande Île'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/petite-france/a/poi-sig/417579/359225', 'name': 'Petite France'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/musee-de-l-oeuvre-notre-dame/a/poi-sig/417569/359225', 'name': 'Musée de l’Œuvre Notre-Dame'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/musee-d-art-moderne-et-contemporain/a/poi-sig/1400306/359225', 'name': 'Musée d’Art Moderne et Contemporain'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/grande-mosquee-de-strasbourg/a/poi-sig/1489262/359225', 'name': 'Grande Mosquée de Strasbourg'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/barrage-vauban/a/poi-sig/1262509/359225', 'name': 'Barrage Vauban'}, {'path': '/france/alsace-and-lorraine/strasbourg/attractions/jardin-des-deux-rives/a/poi-sig/417561/359225', 'name': 'Jardin des Deux Rives'}]},
{'cityPath': 'france/provence/aix-en-provence', 'pois': [{'path': '/france/provence/aix-en-provence/attractions/musee-granet/a/poi-sig/475694/359282', 'name': 'Musée Granet'}, {'path': '/france/provence/aix-en-provence/attractions/caumont-centre-d-art/a/poi-sig/1536084/359282', 'name': 'Caumont Centre d’Art'}, {'path': '/france/provence/aix-en-provence/attractions/cours-mirabeau/a/poi-sig/1229369/359282', 'name': 'Cours Mirabeau'}, {'path': '/france/provence/aix-en-provence/attractions/vieil-aix/a/poi-sig/1195975/359282', 'name': 'Vieil Aix'}, {'path': '/france/provence/aix-en-provence/attractions/camp-des-milles/a/poi-sig/1227619/359282', 'name': 'Camp des Milles'}, {'path': '/france/provence/aix-en-provence/attractions/bastide-du-jas-de-bouffan/a/poi-sig/1227638/359282', 'name': 'Bastide du Jas de Bouffan'}, {'path': '/france/provence/aix-en-provence/attractions/carrieres-de-bibemus/a/poi-sig/1227646/359282', 'name': 'Carrières de Bibemus'}, {'path': '/france/provence/aix-en-provence/attractions/atelier-cezanne/a/poi-sig/475684/359282', 'name': 'Atelier Cézanne'}, {'path': '/france/provence/aix-en-provence/attractions/cathedrale-st-sauveur/a/poi-sig/475686/359282', 'name': 'Cathédrale St-Sauveur'}]},
{'cityPath': 'france/toulouse', 'pois': [{'path': '/france/toulouse/attractions/cite-de-l-espace/a/poi-sig/1192993/1003054', 'name': 'Cité de l’Espace'}, {'path': '/france/toulouse/attractions/couvent-des-jacobins/a/poi-sig/1192995/1003054', 'name': 'Couvent des Jacobins'}, {'path': '/france/toulouse/attractions/basilique-st-sernin/a/poi-sig/1065219/1003054', 'name': 'Basilique St-Sernin'}, {'path': '/france/toulouse/attractions/place-du-capitole/a/poi-sig/1065217/1003054', 'name': 'Place du Capitole'}, {'path': '/france/toulouse/attractions/musee-des-augustins/a/poi-sig/1065216/1003054', 'name': 'Musée des Augustins'}, {'path': '/france/toulouse/attractions/capitole/a/poi-sig/1065224/1003054', 'name': 'Capitole'}, {'path': '/france/toulouse/attractions/fondation-bemberg/a/poi-sig/1457533/1003054', 'name': 'Fondation Bemberg'}, {'path': '/france/toulouse/attractions/les-abattoirs/a/poi-sig/1065232/1003054', 'name': 'Les Abattoirs'}, {'path': '/france/toulouse/attractions/canal-du-midi/a/poi-sig/1065221/1003054', 'name': 'Canal du Midi'}]}
]

def makeUrl(path):
	return ("https://www.lonelyplanet.com" + path)

def getBS(url):
	browser.get(url)
	src = browser.page_source
	bs = BeautifulSoup(src, "lxml")
	return bs

def findOne(bs, tag, className):
	res = bs.find(tag, class_=className)
	return res

def findAll(bs, tag, className):
	res = bs.find_all(tag, class_=className)
	return res

def getInfo(bs):
	Info = {
		"Contact": "",
		"Location": "",
		"Price": "",
		"Hours": "",
	}
	info = findOne(bs, "div", "EssentialInfo")
	items = findAll(info, "section", "SidebarSection")
	for item in items:
		title = item.header.text
		# may have list
		content = item.div.text
		Info[title] = content
	return Info

def getImage(bs):
	img = findOne(bs, "div", "ImageHero")
	style = img["style"]
	# to parse the image url out of the style

def getPara(bs):
	res = []
	paras = bs.find_all("p")
	for para in paras:
		res.append(para.text)
	return res

def getSingleInfo(path):
	bs = getBS(makeUrl(path))
	Info = getInfo(bs)
	return Info

pois = []

def crawlAll():
	for city in poiByCity:
		for poi in city["pois"]:
			try:
				print("Getting poi", poi["name"], "...")
				path = poi["path"]
				url = makeUrl(path)
				bs = getBS(url)
				info = getInfo(bs)
				newPoi = {
					"name": poi["name"],
					"cityPath": city["cityPath"],
					"introduction": getPara(bs),
					"contact": info["Contact"],
					"location": info["Location"],
					"ticket": info["Price"],
					"openTime": info["Hours"]
				}
				pois.append(newPoi)
				city["pois"].remove(poi)
			except TimeoutException:
				continue
			except WebDriverException:
				continue
		poiByCity.remove(city)

pattern = 'lonelyplanetimages\.imgix\.net\/.*\.jpg'

browser = webdriver.Firefox();