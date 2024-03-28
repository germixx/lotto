# Correct date format
def fixDate(date):
    tmpDate1 = date.split(' ')
    tmpDate2 = tmpDate1[0].split('-')
    return tmpDate2[1] + '/' + tmpDate2[2] + '/' + tmpDate2[0]

def fixDate2(date):
        def adjustMth(months):
          
            if(months == 'January'):
                return '01'
            if(months == 'February'):
                return '02'
            if(months == 'March'):
                return '03'
            if(months == 'April'):
                return '04'
            if(months == 'May'):
                return '05'
            if(months == 'June'):
                return '06'
            if(months == 'July'):
                return '07'
            if(months == 'August'):
                return '08'
            if(months == 'September'):
                return '09'
            if(months == 'October'):
                return '10'
            if(months == 'November'):
                return '11'
            if(months == 'December'):
                return '12'

        def fixDay(dayy):
            return dayy

        dateSplit = date.split()    
        year = dateSplit[3]
        month =   adjustMth(dateSplit[1])
        day = fixDay(dateSplit[2].replace(',', '') )
        sqlDate = f'{year}-{month}-{fixDay(day)}' + ' 00:00:00'
        return sqlDate

def getYestDay(curDay):

    if(curDay == 'Monday'):
        return 'Sunday'

    if(curDay == 'Tuesday'):
        return 'Monday'

    if(curDay == 'Wednesday'):
        return 'Tuesday'

    if(curDay == 'Thursday'):
        return 'Wednesday'

    if(curDay == 'Friday'):
        return 'Thursday'
    
    if(curDay == 'Saturday'):
        return 'Friday'

    if(curDay == 'Sunday'):
        return 'Saturday'