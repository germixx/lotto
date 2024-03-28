import requests

from bs4 import BeautifulSoup

from datetime import datetime, timedelta

from .functions import fixDate2

URL = "https://www.flalottery.com/cash4Life"
URL2="http://www.fllott.com/Cash4Life/intelligent-combo-plus.htm"
URL3="https://draweffects.com/api/us/florida/cash4life/getResultsByCount/18"

# Web site

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
    coldNumbers = tst[2].split(' ')
    overdueNumbers = tst[3].split(' ')
    repeatNumbers = tst[4].split(' ')
    winningPairs = tst[5].split(' ')
    CBhot = tst[6].split(' ')
    CBcold = tst[7].split(' ')
    CBoverdue = tst[8].split(' ')
    CBrepeat = tst[9].split(' ')

    hot = [hotNumbers[4].replace(',', ''), hotNumbers[5].replace(',', ''), hotNumbers[6].replace(',', ''), hotNumbers[7].replace(',', '')]

    cold = [coldNumbers[4].replace(',', ''), coldNumbers[5].replace(',', ''), coldNumbers[6].replace(',', ''), coldNumbers[7].replace(',', '')]

    overdue = [overdueNumbers[4].replace(',', ''), overdueNumbers[5].replace(',', ''), overdueNumbers[6].replace(',', ''), overdueNumbers[7].replace(',', '')]

    repeats = [repeatNumbers[4].replace(',', ''), repeatNumbers[5].replace(',', ''), repeatNumbers[6].replace(',', ''), repeatNumbers[7].replace(',', '')]

    pairs = [winningPairs[4], winningPairs[5], winningPairs[6], winningPairs[7], winningPairs[8], winningPairs[9]]

    hotCB = [CBhot[6].replace(',', ''), CBhot[7].replace(',', '')]

    coldCB = [CBcold[6].replace(',', ''), CBcold[7].replace(',', '')]

    overdueCB = [CBoverdue[6].replace(',', ''), CBoverdue[7].replace(',', '')]

    repeatCB = [CBrepeat[6].replace(',', ''), CBrepeat[7].replace(',', '')]

    return [hot, cold, overdue, repeats, pairs, hotCB, coldCB, overdueCB, repeatCB]

def c4lDailyResult():
    x=0
    # get site
    page = requests.get(URL, headers = headers)

    # parse data
    soup = BeautifulSoup(page.content, "html.parser")

    gameNumb = soup.find_all('div', class_="gamePageNumbers")
    # print(gameNumb)
    # start here getting date from results
    daterr = gameNumb[0].find_all('p')
    thePlayDate = daterr[3].text
    # print(thePlayDate)
    # get all the number balls
    results = soup.find_all("span", class_="balls")

    pos1 = results[0].text
    pos2 = results[1].text
    pos3 = results[2].text
    pos4 = results[3].text
    pos5 = results[4].text
    cashBall = results[5].text

    winningNumbers = pos1 + "-" + pos2 + "-" + pos3 + "-" + pos4 + "-" + pos5 + " " + cashBall

    return {'cash4life': { 'date': fixDate2(thePlayDate), 'winningNumbers': winningNumbers} }


def cash4life():

    numbers = getHotColdEtc()

    page = requests.get(URL3, headers = headers)
    resultz = page.json()
    recents = resultz['rows']

    return {
                    'winningNumbers': '',
                    'hot' : numbers[0],
                    'cold' : numbers[1],
                    'overdue' : numbers[2],
                    'repeat' : numbers[3],
                    'winningPairs': numbers[4],
                    'CBhot': numbers[5],
                    'CBcold': numbers[6],
                    'CBoverdue': numbers[7],
                    'CBrepeat': numbers[8],
                    'recentResults':recents,
                    'predictions': [
                        {'sequence': '13-16-27-48-57 01', 'played': 'true', 'quickPick': 'false' }
                    ]
        }