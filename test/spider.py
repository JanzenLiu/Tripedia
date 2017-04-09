from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import WebDriverException
from json import dumps, JSONEncoder

def makeUrl(country, city):
	return "/".join([lp, country, city])

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

def getImgUrl(bs):
	div = findOne(bs, "div", "slideshow__slide")
	imgUrl = ""
	if(div):
		style = div["style"]
		imgUrl = style[23:-3]
	return imgUrl

def getImage(country, city):
	print("Getting image for", country, "/", city, "...")
	link = makeUrl(country, city)
	bs = getBS(link)
	return getImgUrl(bs)

def saveJson(fileName, object):
	JSONEncoder().encode(object)
	with open(fileName,"a") as file:
		file.write(dumps(object, file, indent=4))

lp = "https://www.lonelyplanet.com"

########3################################################## data section ##############################################################
usCities = ["chicago", "seattle", "washington-dc", "boston", "new-orleans", "las-vegas", "miami"]
nzCities = ["auckland", "wellington"]
cnCities = ["hong-kong", "shanghai", "beijing", "tibet/lhasa", "guangdong/guangzhou", "sichuan/chengdu", "zhejiang/hangzhou", "shandong/qingdao", "shandong/taian", "shaanxi-shanxi/xian"]
jpCities = ["tokyo", "kansai/kyoto", "kansai/osaka", "kyushu/fukuoka", "central-honshu/nagoya", "kyushu/nagasaki", "hokkaido/sapporo", "hiroshima", "kansai/nara", "central-honshu/kanaz"]
bzCities = ["rio-de-janeiro", "sao-paulo", "the-northeast/salvador", "the-north/manaus", "the-northeast/recife", "the-northeast/fortaleza", "the-central-west/brasilia", "the-north/belem", "the-southeast/belo-horizonte", "the-northeast/sao-luis"]
egCities = ["cairo", "red-sea-coast/hurghada", "nile-valley/luxor", "mediterranean-coast/alexandria", "nile-valley/aswan", "sinai/dahab", "western-desert/siwa-oasis", "suez-canal/port-said", "sinai/nuweiba"]
itlCities = ["rome", "venice", "florence", "milan", "sicily", "puglia/otranto", "puglia/taranto", "puglia/trani", "puglia/alberobello", "puglia/cisternino"]
spCities = ["barcelona", "madrid", "valencia-and-murcia/valencia", "granada", "seville", "aragon-basque-country-and-navarra/bilbao", "aragon-basque-country-and-navarra/san-sebastian", "andalucia/malaga", "canary-islands/tenerife/santa-cruz-de-tenerife", "andalucia/cordoba"]
frCities = ["paris", "nice", "provence/marseille", "burgundy-and-the-rhone/lyon", "provence/avignon", "southwestern-france/bordeaux", "cote-dazur/cannes", "alsace-and-lorraine/strasbourg", "provence/aix-en-provence", "toulouse"]

countries = ["usa", "new-zealand", "china", "egypt", "italy", "spain", "france", "japan", "brazil"]

cities = {
	"usa": usCities,
	"new-zealand": nzCities,
	"china": cnCities,
	"japan": jpCities,
	"brazil": bzCities,
	"egypt": egCities,
	"italy": itlCities,
	"spain": spCities,
	"france": frCities
}
#######################################################################################################################################

browser = webdriver.Firefox()
browser.set_page_load_timeout(10)
browser.set_script_timeout(10)

Images = []

def getAllImage(list):
	for country in countries:
		for city in cities[country]:	
			try:
				url = getImage(country, city)
				path = "/".join([country, city])
				list.append({"path": path, "imageUrl": url})
			except TimeoutException:
				continue
			except WebDriverException:
				continue