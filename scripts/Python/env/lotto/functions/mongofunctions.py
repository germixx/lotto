from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:27017/')

# Set Mongo Databases
db=client.lotteryAlg

# # 10 Update previous days Winning Numbers field
def sortMongo(data, date):
    
    for xx in data:
        
        if(xx.get('pick2')):
            
            tmp2 = xx.get('pick2')
            
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick2.mid.winningNumbers": tmp2['mid']['winningNumbers']}}, upsert=True)
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick2.eve.winningNumbers": tmp2['eve']['winningNumbers']}}, upsert=True)

        if(xx.get('pick3')):
        
            tmp3 = xx.get('pick3')
            
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick3.mid.winningNumbers": tmp3['mid']['winningNumbers']}}, upsert=True)
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick3.eve.winningNumbers": tmp3['eve']['winningNumbers']}}, upsert=True)
        
        if(xx.get('pick4')):
        
            tmp4 = xx.get('pick4')
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick4.mid.winningNumbers": tmp4['mid']['winningNumbers']}}, upsert=True)
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick4.eve.winningNumbers": tmp4['eve']['winningNumbers']}}, upsert=True)
        
        if(xx.get('pick5')):
        
            tmp5 = xx.get('pick5')
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick5.mid.winningNumbers": tmp5['mid']['winningNumbers']}}, upsert=True)
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.pick5.eve.winningNumbers": tmp5['eve']['winningNumbers']}}, upsert=True)
        
        if(xx.get('fantasy5')):
        
            tmpf5 = xx.get('fantasy5')
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.fantasy5.winningNumbers": tmpf5['winningNumbers']}}, upsert=False)
                    
        if(xx.get('jtp')):
        
            tmpjtp = xx.get('jtp')
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.jtp.winningNumbers": tmpjtp['winningNumbers']}}, upsert=True)
        
        if(xx.get('lotto')):
        
            tmplot = xx.get('lotto')
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.lotto.winningNumbers": tmplot['winningNumbers']}}, upsert=True)
                    
        if(xx.get('powerball')):
        
            tmppb = xx.get('powerball')
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.powerball.winningNumbers": tmppb['winningNumbers']}}, upsert=True)
        
        if(xx.get('megaMillions')):
        
            tmpmm = xx.get('megaMillions')
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.megaMillions.winningNumbers": tmpmm['winningNumbers']}}, upsert=True)
        
        if(xx.get('cash4life')):
        
            tmpc4l = xx.get('cash4life')            
            db.official.update_one({"sessionDate": date}, { "$set" : { "games.cash4life.winningNumbers": tmpc4l['winningNumbers']}}, upsert=True)
            
      