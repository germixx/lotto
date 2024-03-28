# Get All Results
# Count & identify patterns
# Count and identify sub patterns
# Identify most combinations of numbers
# 
# report info -> Numbers of draws, show patterns, sub patterns values, combos,
# identify all doubles, and triples and place in database
from functions.fantasy5 import getAllResults, getPattern, countPatterns, countDoubles, countTriples

# Grab all results
from dbs import  connection2

connPat = connection2('patterns')
mycursor = connPat.cursor()

connSubPat = connection2('subPatterns')
mycursor1 = connSubPat.cursor()

conndbl = connection2('doubles')
mycursor2 = conndbl.cursor()

connTrips = connection2('triples')
mycursor3 = connTrips.cursor()

allResults = getAllResults()

# Patterns
patterns = getPattern(allResults)

countSubPatterns = countPatterns(allResults)

doubles = countDoubles(allResults)

trips = countTriples(allResults)

for k in patterns:

    sql = "INSERT INTO FLFantasy5 (pattern, count) VALUES (%s, %s)"
    
    val = (k["pattern"], k["value"])
    
    mycursor.execute(sql, val)

    # connPat.commit()

for k in countSubPatterns:
    
    pat = k["pattern"][0] + k["pattern"][2] + k["pattern"][4] + k["pattern"][6] +k["pattern"][8]
    
    sql = "INSERT INTO FLFantasy5 (pattern, subPattern, count) VALUES (%s, %s, %s)"
        
    val = ( pat, k["pattern"], k["value"])
        
    mycursor1.execute(sql, val)

    # connSubPat.commit()

for x in doubles:

    num = x["pattern"].split('-')
    
    sql = "INSERT INTO FLFantasy5 (doubles, n1, n2, count) VALUES ( %s, %s, %s, %s)"
        
    val = ( x["pattern"], num[0], num[1], x["value"])
        
    mycursor2.execute(sql, val)

    # conndbl.commit()

for l in trips:

    num = l["pattern"].split('-')

    sql = "INSERT INTO FLFantasy5 (triples, n1, n2, n3, count) VALUES ( %s, %s,%s, %s, %s )"
        
    val = ( l["pattern"], num[0], num[1], num[2], l["value"])
        
    mycursor3.execute(sql, val)

    # connTrips.commit()