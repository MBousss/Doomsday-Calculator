let today = new Date().toISOString().substr(0, 10);
document.querySelector("#datePicker").value = today;

var doomsdayCalander;
var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var anchorCentury = {
    '1800-1899': 'Friday',
    '1900-1999': 'Wednesday',
    '2000-2099': 'Tuesday',
    '2100-2199': 'Sunday',
};

function doomsdayCalculate() {
    var date = document.getElementById("datePicker").value;

    var year = date.split('-')[0];
    var month = date.split('-')[1];
    var day = date.split('-')[2];

    setDoomdayCalaneder(year);

    var step1 = Math.floor(year.substr(-2) / 12);
    var step2 = year.substr(-2) - (step1 * 12);
    var step3 = Math.floor(step2 / 4);
    var step4 = anchorCenturyDay(year);
    var step5 = step1 + step2 + step3 + step4;
    var step6 = step5 % 7;
    var step7 = findClosestDoomsday(month);
    var step8 = calculateDoomsDate(step7, day, step6);

    var result = `${step8} ${day} ${months[month - 1]} ${year}`;

    document.getElementById('result').innerHTML = result;
}

function calculateDoomsDate(closestDoomDay, currentDay, weekDayIndex) {
    var difference = Math.abs(closestDoomDay.split(' ')[1] - currentDay) % 7;

    if ((difference + weekDayIndex) > weekDays.length - 1) {
        var index = (difference + weekDayIndex) - (weekDays.length - 1);
        return weekDays[index - 1];
    }

    return weekDays[difference + weekDayIndex];
}

function anchorCenturyDay(currentYear) {
    var weekDay;

    for (var century in anchorCentury) {
        var years = century.split('-');
        if (currentYear >= years[0] && currentYear <= years[1]) {
            var weekDay = anchorCentury[century];
        }
    }

    return index = weekDays.indexOf(weekDay);
}

function findClosestDoomsday(currentMonth) {
    var currentMonthName = months[currentMonth - 1];
    console.log(currentMonth);

    for (var i = 0; i < doomsdayCalander.length; i++) {
        var array = doomsdayCalander[i].split(' ');
        if (array[0] == currentMonthName) {
            return doomsdayCalander[i];
        }
    }

}

function setDoomdayCalaneder(currentYear) {
    var leapyear = (currentYear % 100 === 0) ? (currentYear % 400 === 0) : (currentYear % 4 === 0);
    if (leapyear) {
        doomsdayCalander = [
            'January 4',
            'February 29',
            'March 7',
            'April 4',
            'May 9',
            'June 6',
            'July 11',
            'August 8',
            'September 5',
            'October 10',
            'November 7',
            'December 12'
        ];
    } else {
        doomsdayCalander = [
            'January 3',
            'February 28',
            'April 4',
            'May 5',
            'June 6',
            'July 7',
            'August 8',
            'September 9',
            'October 10',
            'November 11',
            'December 12'
        ]
    }
}