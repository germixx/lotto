import requests

from bs4 import BeautifulSoup

from datetime import datetime, timedelta

from .functions import fixDate2

URL = "https://www.flalottery.com/pick4"

# Web site
midURL2 = "http://www.fllott.com/Pick-4-Midday/intelligent-combo-plus.htm"
midURL3 = 'https://draweffects.com/api/us/florida/pick4/mid/getResultsByCount/18'

eveURL2 = "http://www.fllott.com/Pick-4-Evening/intelligent-combo-plus.htm"
eveURL3 = 'https://draweffects.com/api/us/florida/pick4/eve/getResultsByCount/18'

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
        'Accept-Language' : 'en-US,en;q=0.5', 
        'Accept-Encoding' : 'gzip, deflate', 
        'DNT' : '1', # Do Not Track Request Header 
        'Connection' : 'close'
    }

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
    midRepDig1Numbers = fixit(tst[3].split(' '))
    
    midHotDig2Numbers = fixit(tst[4].split(' '))
    midOdDig2Numbers = fixit(tst[5].split(' '))
    midRepDig2Numbers = fixit(tst[6].split(' '))

    midHotDig3Numbers = fixit(tst[7].split(' '))
    midOdDig3Numbers = fixit(tst[8].split(' '))
    midRepDig3Numbers = fixit(tst[9].split(' '))

    midHotDig4Numbers = fixit(tst[10].split(' '))
    midOdDig4Numbers = fixit(tst[11].split(' '))
    midRepDig4Numbers = fixit(tst[12].split(' '))

    return [midHotDig1Numbers, 
            midOdDig1Numbers, 
            midRepDig1Numbers, 
            midHotDig2Numbers, 
            midOdDig2Numbers, 
            midRepDig2Numbers, 
            midHotDig3Numbers, 
            midOdDig3Numbers, 
            midRepDig3Numbers, 
            midHotDig4Numbers, 
            midOdDig4Numbers, 
            midRepDig4Numbers
            ]


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
    eveRepDig1Numbers = fixit(tst[3].split(' '))
    
    eveHotDig2Numbers = fixit(tst[4].split(' '))
    eveOdDig2Numbers = fixit(tst[5].split(' '))
    eveRepDig2Numbers = fixit(tst[6].split(' '))

    eveHotDig3Numbers = fixit(tst[7].split(' '))
    eveOdDig3Numbers = fixit(tst[8].split(' '))
    eveRepDig3Numbers = fixit(tst[9].split(' '))

    eveHotDig4Numbers = fixit(tst[10].split(' '))
    eveOdDig4Numbers = fixit(tst[11].split(' '))
    eveRepDig4Numbers = fixit(tst[12].split(' '))

    return [
            eveHotDig1Numbers, 
            eveOdDig1Numbers, 
            eveRepDig1Numbers, 
            eveHotDig2Numbers, 
            eveOdDig2Numbers, 
            eveRepDig2Numbers, 
            eveHotDig3Numbers, 
            eveOdDig3Numbers, 
            eveRepDig3Numbers,
            eveHotDig4Numbers,
            eveOdDig4Numbers,
            eveRepDig4Numbers
        ]

def p4getDailyResult():

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
    
    return {'pick4': {'date': fixDate2(eveningDate), 'mid': {'winningNumbers': str(tempsplitMid[0]) + "" + str(tempsplitMid[1]) + "" + str(tempsplitMid[2]) + "" + str(tempsplitMid[3])}, 
    'eve': {'winningNumbers': str(tempsplitEve[0]) + "" + str(tempsplitEve[1]) + "" + str(tempsplitEve[2]) + "" + str(tempsplitEve[3])} } }

def pick4():
    
    page = requests.get(midURL3, headers = headers)
    page1 = requests.get(eveURL3, headers = headers)

    resultzMid = page.json()
    resultzEve = page1.json()

    last18Mid = resultzMid['rows']
    last18Eve = resultzEve['rows']

    numbersMides = getHotColdEtcMid()
    numbersEve = getHotColdEtcEve()
    
    return {
                  'mid': {
                    'winningNumbers': '',
                    'dig1Hot': numbersMides[0],
                    'dig1Overdue': numbersMides[1],
                    'dig1Repeat': numbersMides[2],
                    'dig2Hot': numbersMides[3],
                    'dig2Overdue': numbersMides[4],
                    'dig2Repeat': numbersMides[5],
                    'dig3Hot': numbersMides[6],
                    'dig3Overdue': numbersMides[7],
                    'dig3Repeat': numbersMides[8],
                    'dig4Hot': numbersMides[9],
                    'dig4Overdue': numbersMides[10],
                    'dig4Repeat': numbersMides[11],
                    'recentResults': last18Mid,
                    'predictions': []

                },
                'eve': {
                    'winningNumbers': '',
                    'dig1Hot': numbersEve[0],
                    'dig1Overdue': numbersEve[1],
                    'dig1Repeat': numbersEve[2],
                    'dig2Hot': numbersEve[3],
                    'dig2Overdue': numbersEve[4],
                    'dig2Repeat': numbersEve[5],
                    'dig3Hot': numbersEve[6],
                    'dig3Overdue': numbersEve[7],
                    'dig3Repeat': numbersEve[8],
                    'dig4Hot': numbersEve[9],
                    'dig4Overdue': numbersEve[10],
                    'dig4Repeat': numbersEve[11],
                    'recentResults': last18Eve,
                    'predictions': []
                },
        }