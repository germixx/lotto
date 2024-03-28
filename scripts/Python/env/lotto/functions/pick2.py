import requests

from bs4 import BeautifulSoup

from datetime import datetime, timedelta
from .functions import fixDate2

URL = "https://www.flalottery.com/pick2"
# Web site
midURL2 = "http://www.fllott.com/Pick-2-Midday/intelligent-combo-plus.htm"
midURL3 = 'https://draweffects.com/api/us/florida/pick2/mid/getResultsByCount/18'

eveURL2 = "http://www.fllott.com/Pick-2-Evening/intelligent-combo-plus.htm"
eveURL3 = 'https://draweffects.com/api/us/florida/pick2/eve/getResultsByCount/18'

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
        'Accept-Language' : 'en-US,en;q=0.5', 
        'Accept-Encoding' : 'gzip, deflate', 
        'DNT' : '1', # Do Not Track Request Header 
        'Connection' : 'close'
    }

def getHotColdEtcEve():

    def fixit(n):
 
        tmp = n[4].split(',')
        
        return [tmp[0], n[5][0]]

    page2 = requests.get(eveURL2, headers = headers)

    soup2 = BeautifulSoup(page2.content, "html.parser")

    results = soup2.find_all("li")

    tst = results[19].text.split('T')

    eveHotDig1Numbers = fixit(tst[1].split(' '))
    eveOdDig1Numbers = fixit(tst[2].split(' '))
    eveHotDig2Numbers = fixit(tst[4].split(' '))
    eveOdDig2Numbers = fixit(tst[5].split(' '))

    return [eveHotDig1Numbers, eveOdDig1Numbers, eveHotDig2Numbers, eveOdDig2Numbers]

def getHotColdEtcMid():

    def fixit(n):

        tmp = n[4].split(',')
        
        return [tmp[0], n[5][0]]

    page2 = requests.get(midURL2, headers = headers)

    soup2 = BeautifulSoup(page2.content, "html.parser")

    results = soup2.find_all("li")

    tst = results[19].text.split('T')

    midHotDig1Numbers = fixit(tst[1].split(' '))
    midOdDig1Numbers = fixit(tst[2].split(' '))
    midHotDig2Numbers = fixit(tst[4].split(' '))
    midOdDig2Numbers = fixit(tst[5].split(' '))

    return [midHotDig1Numbers, midOdDig1Numbers, midHotDig2Numbers, midOdDig2Numbers]

def p2getDailyResult():

    # get site
    page = requests.get(URL, headers = headers)

    # parse data
    soup = BeautifulSoup(page.content, "html.parser")

    gameNumb = soup.find_all('div', class_="gamePageNumbers")

    midDayResults = gameNumb[0].find_all('p')
    eveningResults = gameNumb[1].find_all('p')

    midDayDate = midDayResults[1].text
    eveningDate = eveningResults[1].text

    tempsplitMid = [int(x) for x in str(midDayResults[2].text.replace('-', ''))]
    tempsplitEve = [int(x) for x in str(eveningResults[2].text.replace('-', ''))]

    return {'pick2': {'date': fixDate2(eveningDate) , 'mid': {
        'winningNumbers': str(tempsplitMid[0]) + "" + str(tempsplitMid[1])
    }, 'eve': {'winningNumbers': str(tempsplitEve[0]) + "" + str(tempsplitEve[1])} } }

def pick2():

    numbersMid = getHotColdEtcMid()
    numbersEve = getHotColdEtcEve()

    page = requests.get(midURL3, headers = headers)
    pagee = requests.get(eveURL3, headers = headers)
    
    resultzMid = page.json()
    resultzEve = pagee.json()
    
    last18Mid = resultzMid['rows']
    last18Eve = resultzEve['rows']

    return {
                'mid': {
                    'winningNumbers': '',
                    'dig1Hot': numbersMid[0],
                    'dig1Overdue': numbersMid[1],
                    'dig2Hot': numbersMid[2],
                    'dig2Overdue': numbersMid[3],
                    'recentResults': last18Mid,
                    'predictions': []

                },
                'eve': {
                    'winningNumbers': '',
                    'dig1Hot': numbersEve[0],
                    'dig1Overdue': numbersEve[1],
                    'dig2Hot': numbersEve[2],
                    'dig2Overdue': numbersEve[3],
                    'recentResults': last18Eve,
                    'predictions': ''
                },
        }