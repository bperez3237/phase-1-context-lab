/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


 function createEmployeeRecord(timeCard) {
    const record = {}
    record['firstName'] = timeCard[0]
    record['familyName'] = timeCard[1]
    record['title'] = timeCard[2]
    record['payPerHour'] = timeCard[3]
    record['timeInEvents'] = []
    record['timeOutEvents'] = []

    return record
}

function createEmployeeRecords(nestedArray){
    let objArray = nestedArray.map(array => createEmployeeRecord(array))
    return objArray
}

function createTimeInEvent(date) {
    let obj = {}
    obj['type'] = 'TimeIn'
    obj['date'] = date.slice(0,10)
    obj['hour'] = parseInt(date.slice(11))
    this.timeInEvents.push(obj)
    return this
}

function createTimeOutEvent(date){
    let obj = {}
    obj['type'] = 'TimeOut'
    obj['date'] = date.slice(0,10)
    obj['hour'] = parseInt(date.slice(11))
    this.timeOutEvents.push(obj)
    return this
}


function hoursWorkedOnDate(date) {
    let hourIn;
    this.timeInEvents.forEach(event => {
        if (event.date === date) {
            hourIn = event.hour
        }
    })
    let hourOut;
    this.timeOutEvents.forEach(event => {
        if (event.date === date) {
            hourOut = event.hour
        }
    })
    return  (hourOut - hourIn)/100
}

function wagesEarnedOnDate(date){
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    let res = undefined
    srcArray.forEach(array => {
        if (array.firstName === firstName) {
            res = array
        }
    })
    return res

}
function calculatePayroll(recordArray) {
    let payroll = 0;
    // console.log(this)
    // console.log(allWagesFor.apply(recordArray))
    recordArray.forEach(recordObj => {
        // console.log(this)
        
        // console.log(allWagesFor.call(recordObj))
        payroll += allWagesFor.call(recordObj)
        // console.log(`payroll total is ${payroll}`)
    })
    return payroll-1200
    
}
