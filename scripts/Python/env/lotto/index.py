# Steps
# Task: build daily session data with all games insert into MongoDB

from pymongo import MongoClient

from datetime import datetime, timedelta
from functions.functions import fixDate
from functions.functions import getYestDay

from functions.fantasy5 import fantasy5, fantGetDailyResult, generateRandomNonPlayedNumber
from functions.cash4life import cash4life, c4lDailyResult
from functions.jtp import jtp, jtpGetDailyResult
from functions.megaMillions import megaMillions, MMgetDailyResult
from functions.powerball import powerball, powerballGetDaily
from functions.lotto import lotto, lottoDailyResult
from functions.pick2 import pick2, p2getDailyResult
from functions.pick3 import pick3, p3getDailyResult
from functions.pick4 import pick4, p4getDailyResult
from functions.pick5 import pick5, p5getDailyResult
from functions.mongofunctions import sortMongo

# Get current date in format (mm/dd/yy)
current_time = datetime.now()
todaysDate = current_time.strftime('%-m/%-d/%Y')
dayOfWeek = current_time.strftime('%A')

# dayOfWeek = 'Wednesday' 
data = 0

yesterdaysDate = (datetime.now() - timedelta(days=1)).strftime('%-m/%-d/%Y')
yesterdayDayOfWeek = getYestDay(dayOfWeek)

previousDayGameData = []
# print(yesterdayDayOfWeek, yesterdaysDate)

# pprint library is used to make the output look more pretty
from pprint import pprint

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
        'Accept-Language' : 'en-US,en;q=0.5', 
        'Accept-Encoding' : 'gzip, deflate', 
        'DNT' : '1', # Do Not Track Request Header 
        'Connection' : 'close'
}

# Connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient('mongodb://127.0.0.1:27017/')

# Set Mongo Databases
db=client.lotteryAlg

# Get todays date - 
# Get yesterdays date/day 
# Query yesterdays date/day, 
# Query mongo, if not in DB, continue, else return
# Get games list from date
# Cycle through each game list 
# get winning game numbers from recent game
# input into databases
# get day (Mon, Tues, etc)
# query the game session data for the games for that day which will create a session obj in mongo
# Insert session data in mongo
# the day of game play - create a session data obj

gamerfunc = {
    'fantasy5': fantGetDailyResult(),
    'powerball': powerballGetDaily(),
    'cash4life': c4lDailyResult(),
    'lotto': lottoDailyResult(),
    'jtp': jtpGetDailyResult(),
    'megaMillions': MMgetDailyResult(),
    'pick2': p2getDailyResult(),
    'pick3': p3getDailyResult(),
    'pick4': p4getDailyResult(),
    'pick5': p5getDailyResult()
}

ff = db.official.find_one({'sessionDate': todaysDate })

# check if current session is set
if (isinstance(ff, dict)):

    x=0

else:

   xsasdasd=0
    
#    yester = db.official.find_one({'sessionDate': yesterdaysDate }) 
    
#    for key in yester['games']:

#        previousDayGameData.append(gamerfunc[key])

#    sortMongo(previousDayGameData, yesterdaysDate)

if(dayOfWeek == 'Monday'):

    data = {
    'sessionDate': todaysDate,
        'games': {
            # 'pick2': pick2(),
            # 'pick3': pick3(),
            # 'pick4': pick4(),
            # 'pick5': pick5(),
            'fantasy5': fantasy5(),
            # 'cash4life': cash4life(),
            'powerball': powerball(),
        }
    }

if(dayOfWeek == 'Tuesday'):

    data = {
    'sessionDate': todaysDate,
        'games': {
            # 'pick2': pick2(),
            # 'pick3': pick3(),
            # 'pick4': pick4(),
            # 'pick5': pick5(),
            'fantasy5': fantasy5(),
            # 'cash4life': cash4life(),
            # 'jtp': jtp(),
            # 'megaMillions': megaMillions()
        }
    }

if(dayOfWeek == 'Wednesday'):

    data = {
    'sessionDate': todaysDate,
        'games': {
            # 'pick2': pick2(),
            # 'pick3': pick3(),
            # 'pick4': pick4(),
            # 'pick5': pick5(),
            'fantasy5': fantasy5(),
            # 'cash4life': cash4life(),
            'lotto': lotto(),
            'powerball': powerball(),
        }
    }

if(dayOfWeek == 'Thursday'):

    data = {
    'sessionDate': todaysDate,
        'games': {
            # 'pick2': pick2(),
            # 'pick3': pick3(),
            # 'pick4': pick4(),
            # 'pick5': pick5(),
            'fantasy5': fantasy5(),
            # 'cash4life': cash4life(),
        }
    }

if(dayOfWeek == 'Friday'):

    data = {
    'sessionDate': todaysDate,
        'games': {
            # 'pick2': pick2(),
            # 'pick3': pick3(),
            # 'pick4': pick4(),
            # 'pick5': pick5(),
            'fantasy5': fantasy5(),
            # 'cash4life': cash4life(),
            # 'jtp': jtp(),
            # 'megaMillions': megaMillions()
        }
    }

if(dayOfWeek == 'Saturday'):

    data = {
    'sessionDate': todaysDate,
        'games': {
            # 'pick2': pick2(),
            # 'pick3': pick3(),
            # 'pick4': pick4(),
            # 'pick5': pick5(),
            'fantasy5': fantasy5(),
            # 'cash4life': cash4life(),
            'lotto': lotto(),
            'powerball': powerball(),
        }
    }

if(dayOfWeek == 'Sunday'):
    
    data = {
    'sessionDate': todaysDate,
        'games': {
            # 'pick2': pick2(),
            # 'pick3': pick3(),
            # 'pick4': pick4(),
            # 'pick5': pick5(),
            'fantasy5': fantasy5(),
            'cash4life': cash4life(),
        }
    }

# Insert into MongoDB
res = db.official.insert_one(data)


# Delete after testing 12/4/22
# # # Opening a file
# file1 = open('/home/jgoolsby/SSR/lotteryAlg/scripts/Python/env/lotto/logs.txt', 'a')
# s = "Script successfully ran on " + "\n"
  
# # Writing a string to file
# file1.write(s) 
    
# #Closing file
# file1.close()



