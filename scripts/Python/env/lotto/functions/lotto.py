import requests, random

from bs4 import BeautifulSoup

from datetime import datetime, timedelta

from .functions import fixDate2

# Web site
URL = "https://www.flalottery.com/lotto"
URL2 = "http://www.fllott.com/Lotto/intelligent-combo-plus.htm"
URL3 = 'https://draweffects.com/api/us/florida/lotto/getResultsByCount/18'
URL4 = "https://draweffects.com/api/us/florida/lotto/checkWinningNumbers"
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

    pairs = [winningPairs[4], winningPairs[5], winningPairs[6], winningPairs[7], winningPairs[8], winningPairs[9]]

    hot = [hotNumbers[4].replace(',', ''), hotNumbers[5].replace(',', ''), hotNumbers[6].replace(',', ''), hotNumbers[7].replace(',', '')]

    cold = [coldNumbers[4].replace(',', ''), coldNumbers[5].replace(',', ''), coldNumbers[6].replace(',', ''), coldNumbers[7].replace(',', '')]

    overdue = [overdueNumbers[4].replace(',', ''), overdueNumbers[5].replace(',', ''), overdueNumbers[6].replace(',', ''), overdueNumbers[7].replace(',', '')]

    repeats = [repeatNumbers[4].replace(',', ''), repeatNumbers[5].replace(',', ''), repeatNumbers[6].replace(',', ''), repeatNumbers[7].replace(',', '')]

    return [hot, cold, overdue, repeats, pairs]

def lottoDailyResult():

    # get site
    page = requests.get(URL, headers = headers)

    # parse data
    soup = BeautifulSoup(page.content, "html.parser")


    gameNumb = soup.find_all('div', class_="gamePageNumbers")

    # Get lotto numbers here
    fff = gameNumb[0].find_all('span')
    temp= gameNumb[0].find_all('p')
    n1 = fff[0].text
    n2 = fff[2].text
    n3 = fff[4].text
    n4 = fff[6].text
    n5 = fff[8].text
    n6 = fff[10].text
    seq = n1 + "-" + n2 + "-" + n3 + "-" + n4 + "-" + n5 + "-" + n6
    dates = temp[4].text

    return {'lotto': { 'date': fixDate2(dates), 'winningNumbers': seq}}

def lotto():

    numbers = getHotColdEtc()

    # 6 Query Last 18 Results
    page = requests.get(URL3, headers = headers)
    resultz = page.json()
    last18 = resultz['rows']

    return {
                    'winningNumbers': '',
                    'hot': numbers[0],
                    'cold': numbers[1],
                    'overdue': numbers[2],
                    'repeat': numbers[3],
                    'winningPairs': numbers[4],
                    'recentResults': last18,
                    'predictions': []
        }

arr = []

def generateRandomNonPlayedNumber():

    numberz = []

    def getNumbs():

        if len(numberz) < 6:

            tmp = random.randrange(1, 53)

            if(tmp in numberz):

                getNumbs()

            else:
                numberz.append(tmp)
                
                getNumbs()
        else:
            return numberz.sort()


    if len(arr) < 5:

        getNumbs()

        if len(numberz) > 4:

            strNum = '-'.join(str(x) for x in numberz)

            daata = {'checkNumber': strNum }
            
            # get site
            page = requests.post(URL4, json = daata, headers = headers)
            
            res = page.json()

            if res['success'] == True:
                # print('True ', strNum)
                numberz = [] 
                generateRandomNonPlayedNumber()
                
            else:
                # print('False ', strNum)
                arr.append(strNum)
                numberz = []
                generateRandomNonPlayedNumber()
    
    else:
        
        return arr