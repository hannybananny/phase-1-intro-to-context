function createEmployeeRecord(array) {
  let employeeRecordObj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecordObj;
}

function createEmployeeRecords(employeeArrays) {
  let newEmployeeArr = []
  
  employeeArrays.map(employee =>{
    newEmployeeArr.push(createEmployeeRecord(employee))
  })
    return newEmployeeArr
  }


function createTimeInEvent(employeeObj, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employeeObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  });
  return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employeeObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  });
  return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date) {
  
    let timeInEvent = employeeObj.timeInEvents
    let timeOutEvent = employeeObj.timeOutEvents
  
    let timeInDate = timeInEvent.find(time => {
      return date === time.date
    })
    
    let timeOutDate = timeOutEvent.find(time => {
      return date === time.date
    })
    
    return timeOutDate.hour/100 - timeInDate.hour/100
    // timeInEvent.map(timeEvent =>{
    //   let timeIn = timeEvent.hour
    //   let timeInDate = timeEvent.date
     
    //   timeOutEvent.map(time => {
    //     let timeOut = time.hour
  

    //   if (date === timeInDate){
    //       return timeOut/100 - timeIn/100
    //     }
    //   })
    // })
   
//     for (let i = 0; i < timeInEvent.length; i++) {
//     let timeIn = timeInEvent[i].hour;
//     let timeInDate = timeInEvent[i].date;
   

//     for (let i = 0; i < timeInEvent.length; i++) {
//       let timeOut = timeOutEvent[i].hour;
//       let timeOutDate = timeOutEvent[i].date;
      
//       if (date === timeOutDate) {
//         if (date === timeInDate) {
          
//           return timeOut / 100 - timeIn / 100;
//         }
//       }
//     }
// }
}


function wagesEarnedOnDate(employeeObj, date) {
  let hoursWorked = hoursWorkedOnDate(employeeObj, date);
  let payRate = employeeObj.payPerHour;
  return parseInt(hoursWorked * payRate);
}

function allWagesFor(employeeObj) {
  
  let wagesArr = [];

 let timeInEvent = employeeObj.timeInEvents
 let dates = timeInEvent.map(time => time.date)
 
 dates.forEach(date => {
    let wages = wagesEarnedOnDate(employeeObj, date)
    wagesArr.push(wages)
})

  let totalWages = wagesArr.reduce((a, b) => {
    return a + b;
  }, 0);

  return totalWages;
}


function calculatePayroll(employeeRecord){
        
        let wagesArr = []
        employeeRecord.forEach(employee => {
            let employeeObj = employee 
            let allWages = allWagesFor(employeeObj)
            wagesArr.push(allWages)
        })
          
            let payroll = wagesArr.reduce((a, b) => {
                return a + b;
              }, 0);
    
              return payroll
}