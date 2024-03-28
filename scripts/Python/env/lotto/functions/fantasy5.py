import requests, random

from bs4 import BeautifulSoup

from datetime import datetime, timedelta

# Site / API
URL = "https://www.flalottery.com/fantasy5"
URL2 = "http://www.fllott.com/Fantasy-5/intelligent-combo-plus.htm"
URL3 = 'https://draweffects.com/api/us/florida/fantasy5/getResultsByCount/18'
URL4 = "https://draweffects.com/api/us/florida/fantasy5/checkWinningNumbers"

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

    hot = [hotNumbers[4].replace(',', ''), hotNumbers[5].replace(',', ''), hotNumbers[6].replace(',', ''), hotNumbers[7].replace(',', '')]

    cold = [coldNumbers[4].replace(',', ''), coldNumbers[5].replace(',', ''), coldNumbers[6].replace(',', ''), coldNumbers[7].replace(',', '')]

    overdue = [overdueNumbers[4].replace(',', ''), overdueNumbers[5].replace(',', ''), overdueNumbers[6].replace(',', ''), overdueNumbers[7].replace(',', '')]

    repeats = [repeatNumbers[4].replace(',', ''), repeatNumbers[5].replace(',', ''), repeatNumbers[6].replace(',', ''), repeatNumbers[7].replace(',', '')]

    return [hot, cold, overdue, repeats]

def fantGetDailyResult():

    # get site
    page = requests.get(URL, headers = headers)
    
    # parse data
    soup = BeautifulSoup(page.content, "html.parser")
    
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

    return { 'fantasy5': {'date': date, 'winningNumbers': winningNumbers} }

def fantasy5():

    # result = fantGetDailyResult()

    numbers = getHotColdEtc()

    # 6 Query Last 18 Results
    page = requests.get(URL3, headers = headers)
    resultz = page.json()
    last18 = resultz['rows']
    generateRandomNonPlayedNumber()
    
    return {        'winningNumbers': '',
                    'hot' : numbers[0],
                    'cold' : numbers[1],
                    'overdue' : numbers[2],
                    'repeat' : numbers[3],
                    'recentResults':last18,
                    'predictions' : [
                        {'sequence': '9-14-23-24-35', 'played': 'true', 'quickPick': 'false' }, 
                        {'sequence': '10-16-17-20-25', 'played':'true', 'quickPick': 'false' },
                        {'sequence': '7-18-19-20-26', 'played':'true', 'quickPick': 'false' },
                        {'sequence': '2-7-18-22-23', 'played': 'true', 'quickPick': 'false' }, 
                        {'sequence': '1-10-16-20-25', 'played':'true', 'quickPick': 'false' }, 
                    ],
                    'generatedRandom': generateRandomNonPlayedNumber()
        }
# 19 20 26
# 2 9 10 17
arr = []

def generateRandomNonPlayedNumber():

    numberz = []

    def getNumbs():

        if len(numberz) < 5:

            tmp = random.randrange(1, 36)

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