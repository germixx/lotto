# Fantasy V functions for report
import requests

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
        'Accept-Language' : 'en-US,en;q=0.5', 
        'Accept-Encoding' : 'gzip, deflate', 
        'DNT' : '1', # Do Not Track Request Header 
        'Connection' : 'close'
}

URL = "https://draweffects.com/api/us/florida/fantasy5/getAll"
URLTEST = "https://draweffects.com/api/us/florida/fantasy5/getResultsByCount/18"

def getAllResults():

    page = requests.get(URLTEST, headers = headers)

    resultz = page.json()

    return resultz["rows"]
        
def getPattern(lines):

    thisdict = {}
    arr = []
    def myFunc(e):
        return e["value"]

    masterR = []
    
    def identifyPattern(num):

        if(1 <= num <= 9):
            return 'A'
        
        if(10 <= num <= 19):
            return 'B'
        
        if(20 <= num <= 29):
            return 'C'
        
        if(30 <= num <= 36):
            return 'D'

    # Cycle through each line, 
    for x in lines:

        seqArr = x["sequence"].split('-')
    
        patternArr = []
        
        for y in seqArr:

            patternArr.append(identifyPattern(int(y)))
    
        pat = ''.join(patternArr)

        if pat in thisdict:
            thisdict[pat] += 1
        else: 
            thisdict[pat] = 1
    
    for k, v in thisdict.items():

        arr.append({"pattern": k, "value": v})

    arr.sort(reverse=True, key=myFunc)
    return arr

def countPatterns(lines):

    thisdict = {}
    arr = []

    def myFunc(e):
        return e["value"]

    def identifyPattern(p):
        
        if(1 <= p <= 5):
            return 'A1'

        if(6 <= p <= 9):
            return 'A2'

        if(10 <= p <= 14):
            return 'B1'

        if(15 <= p <= 19):
            return 'B2'

        if(20 <= p <= 24):
            return 'C1'

        if(25 <= p <= 29):
            return 'C2'

        if(30 <= p <= 32):
            return 'D1'

        if(33 <= p <= 36):
            return 'D2'

    # count patterns and place in dictionary

    for x in lines:

        seqArr = x["sequence"].split('-')
    
        patternArr = []

        for y in seqArr:
            patternArr.append(identifyPattern(int(y)))

        pat = ''.join(patternArr)
        
        if pat in thisdict:
            thisdict[pat] += 1
        else: 
            thisdict[pat] = 1

    for k, v in thisdict.items():
        arr.append({"pattern": k, "value": v})

    arr.sort(reverse=True, key=myFunc)
    return arr



def countDoubles(lines):

    def myFunc(e):
        return e["value"]

    def adjustPattern(num1, num2):
        
        kk = max(int(num1), int(num2))
        jj = min(int(num1), int(num2))

        return str(jj) + "-" + str(kk)

    thisdict = {}
    arr = []
    patternArr = []

    for x in lines:

        seqArr = x["sequence"].split('-')
        
        nm = adjustPattern( seqArr[0], seqArr[1] )
        nm2 = adjustPattern( seqArr[0] , seqArr[2] )
        nm3 = adjustPattern(seqArr[0] , seqArr[3] )
        nm4 = adjustPattern( seqArr[0] , seqArr[4] )
 
        nm5 = adjustPattern( seqArr[1] , seqArr[2] )
        nm6 = adjustPattern( seqArr[1] , seqArr[3])
        nm7 = adjustPattern( seqArr[1] , seqArr[4] )
        nm8 = adjustPattern( seqArr[2] , seqArr[3] )

        nm9 = adjustPattern( seqArr[2] , seqArr[4] )
        nm10 = adjustPattern( seqArr[3] , seqArr[4] )

        # push all to array, then cycle throught array determining if in array or not then increment

        arr.append(nm)
        arr.append(nm2)
        arr.append(nm3)
        arr.append(nm4)
        arr.append(nm5)
        arr.append(nm6) 
        arr.append(nm7)
        arr.append(nm8)
        arr.append(nm9) 
        arr.append(nm10) 

    for xx in arr:
        
        if xx in thisdict:
            thisdict[xx] += 1
        else: 
            thisdict[xx] = 1


    for k, v in thisdict.items():
        patternArr.append({"pattern": k, "value": v})

    patternArr.sort(reverse=True, key=myFunc)
    return patternArr

def countTriples(lines):

    def myFunc(e):
        return e["value"]

    thisdict = {}
    arr = []
    patternArr = []

    for x in lines:

        seqArr = x["sequence"].split('-')

        tr = seqArr[0] + "-" + seqArr[1] + "-" + seqArr[2]
        tr1 = seqArr[0] + "-" + seqArr[1] + "-" + seqArr[3] 
        tr2 = seqArr[0] + "-" + seqArr[1] + "-" + seqArr[4]
        tr3 = seqArr[0] + "-" + seqArr[2] + "-" + seqArr[3]
        tr4 = seqArr[0] + "-" + seqArr[2] + "-" + seqArr[4]
        tr5 = seqArr[0] + "-" + seqArr[3] + "-" + seqArr[4]
        tr6 = seqArr[1] + "-" + seqArr[2] + "-" + seqArr[3]
        tr7 = seqArr[1] + "-" + seqArr[2] + "-" + seqArr[4]
        tr8 = seqArr[2] + "-" + seqArr[3] + "-" + seqArr[4]
        tr9 = seqArr[1] + "-" + seqArr[3] + "-" + seqArr[4]

        arr.append(tr)
        arr.append(tr1)
        arr.append(tr2)
        arr.append(tr3)
        arr.append(tr4)
        arr.append(tr5)
        arr.append(tr6)
        arr.append(tr7)
        arr.append(tr8)
        arr.append(tr9)

    for xx in arr:
        
        if xx in thisdict:
            thisdict[xx] += 1
        else: 
            thisdict[xx] = 1

    for k, v in thisdict.items():
        patternArr.append({"pattern": k, "value": v})

    patternArr.sort(reverse=True, key=myFunc)
    return patternArr
























































