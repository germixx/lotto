import requests, random

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
        'Accept-Language' : 'en-US,en;q=0.5', 
        'Accept-Encoding' : 'gzip, deflate', 
        'DNT' : '1', # Do Not Track Request Header 
        'Connection' : 'close'
    }

# Fantasy5
# generate a number between 1 - 36
# Check if number is in array, add number to array
# when 5 numbers are added
# check with number API

arr = []
URL = "https://draweffects.com/api/us/florida/fantasy5/checkWinningNumbers"
def generateRandomNonPlayedNumber():

    print('asdasdas')
    
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

        if len(numberz) < 6:

            strNum = '-'.join(str(x) for x in numberz)

            daata = {'checkNumber': strNum }
            
            # get site
            page = requests.post(URL, json = daata, headers = headers)
            
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
# numberz = []

# arr = []

# def getNumbs():

#     if len(numberz) < 5:

#         tmp = random.randrange(1, 36)

#         if(tmp in numberz):

#             getNumbs()

#         else:
#             numberz.append(tmp)
            
#             getNumbs()
#     else:
#         return numberz.sort()

# def mainGenerate():

#     global numberz 

#     if len(arr) < 6:

#         getNumbs()

#         if len(numberz) > 4:

#             strNum = '-'.join(str(x) for x in numberz)

#             daata = {'checkNumber': strNum }
            
#             # get site
#             page = requests.post(URL, json = daata, headers = headers)
            
#             res = page.json()

#             if res['success'] == True:
#                 # print('True ', strNum)
#                 numberz = [] 
#                 mainGenerate()
                
#             else:
#                 # print('False ', strNum)
#                 arr.append(strNum)
#                 numberz = []
#                 mainGenerate()
    
#     else:
#         x= 0 
#         # mainGenerate()


LowOdd = [ 1, 3, 5, 7, 9, 11, 13, 15, 17 ]
LowEven = [ 2, 4, 6, 8, 10, 12, 14, 16, 18 ]
highOdd = [19, 21, 23, 25, 27, 29, 31, 33, 35]
highEven = [20, 22, 24, 26, 28, 30, 32, 34, 36]

# Patterns
# 1x LowOdd, 1x LowEven, 1x HighOdd, 2x HighEven
# 2x LowOdd, 1x LowEven, 1x HighOdd, 1x HighEven
# 1x LowOdd, 1x LowEven , 2x HighOdd, 1x HighEven
# 1x LowOdd, 2x LowEven , 1x HighOdd, 1x HighEven

if __name__ == "__main__":
    
    # return 5 generated sequences
    # xx = generateRandomNonPlayedNumber()
    # Steps
    #  Create basic algorithm of just grabbing random numbers from within the groups
    #       and creating lines from them to match the pattern
    #
    # Create algorithm with Codex pattern but instead weigh the numbers against probability and
    #       doubles patterns
    print(arr, ' arr ')













