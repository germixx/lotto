import requests

from bs4 import BeautifulSoup

from datetime import datetime, timedelta

from .functions import fixDate2

# Web site
URL = "https://www.flalottery.com/jackpotTriplePlay"
URL2 = "http://www.fllott.com/Jackpot-Triple-Play/intelligent-combos.htm"
URL3 = 'https://draweffects.com/api/us/florida/jtp/getResultsByCount/18'

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
        'Accept-Language' : 'en-US,en;q=0.5', 
        'Accept-Encoding' : 'gzip, deflate', 
        'DNT' : '1', # Do Not Track Request Header 
        'Connection' : 'close'
    }

def getHotColdEtc():

    page2 = requests.get(URL2, headers = headers)

    soup2 = BeautifulSoup(page2.content, "html.parser")

    results = soup2.find_all("li")

    tst = results[19].text.split('T')

    hotNumbers = tst[1].split(' ')

    overdueNumbers = tst[2].split(' ')

    hot = [hotNumbers[4].replace(',', ''), hotNumbers[5].replace(',', ''), hotNumbers[6].replace(',', ''), hotNumbers[7].replace(',', ''), hotNumbers[8].replace(',', ''), hotNumbers[9].replace(',', ''), hotNumbers[10].replace(',', ''), hotNumbers[11].replace(',', '')]

    overdue = [overdueNumbers[4].replace(',', ''), overdueNumbers[5].replace(',', ''), overdueNumbers[6].replace(',', ''), overdueNumbers[7].replace(',', ''), overdueNumbers[8].replace(',', ''), overdueNumbers[9].replace(',', ''), overdueNumbers[10].replace(',', ''), overdueNumbers[11].replace(',', '')]

    return [hot, overdue]

def jtpGetDailyResult():

    # get site
    page = requests.get(URL, headers = headers)
    
    # parse data
    soup = BeautifulSoup(page.content, "html.parser")

    gameNumb = soup.find_all('div', class_="gamePageNumbers")
    
    # get all the number balls
    results = soup.find_all("span", class_="balls")

    # Date
    today = datetime.today()
    yesterday = str(today - timedelta(days=1))
    dates = yesterday.split(' ')
    date = dates[0] + " 00:00:00"

    pos1 = results[0].text
    pos2 = results[1].text
    pos3 = results[2].text
    pos4 = results[3].text
    pos5 = results[4].text 
    winningNumbers = pos1 + "-" + pos2 + "-" + pos3 + "-" + pos4 + "-" + pos5

    daterr = gameNumb[0].find_all('p')

    thePlayDate = daterr[4].text

    return {'jtp': { 'date': fixDate2(thePlayDate), 'winningNumbers': winningNumbers } }

def jtp():
    
    numbers = getHotColdEtc()
  
    page = requests.get(URL3, headers = headers)
    resultz = page.json()
    last18 = resultz['rows']

    return {
                    'winningNumbers': '',
                    'hot': numbers[0],
                    'overdue': numbers[1],
                    'recentResults': last18,
                    'predictions': []
        }