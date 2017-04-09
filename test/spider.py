from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import WebDriverException
from json import dumps, JSONEncoder

def makeUrl(country, city):
	return "/".join([lp, country, city])

def getBS(url):
	browser.get(link)
	src = browser.page_source
	bs = BeautifulSoup(src, "lxml")
	return bs

def findOne(bs, tag, className):
	res = bs.find(tag, class_=className);
	return res

def findAll(bs, tag, className):
	res = bs.find_all(tag, class_=className);
	return res

def saveJson(fileName, object):
	JSONEncoder().encode(object)
	with open(fileName,"a") as file:
		file.write(dumps(object, file, indent=4))
		
lp = "https://www.lonelyplanet.com"

browser = webdriver.Firefox()
browser.set_page_load_timeout(10)
browser.set_script_timeout(10)
