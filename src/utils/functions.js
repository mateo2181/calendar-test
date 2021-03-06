export function orderReminders(reminders) {
    return reminders.sort(function(a, b) {
        let dateA = new Date(a.year, a.month, a.day, a.time.split(':')[0], a.time.split(':')[1]); 
        let dateB = new Date(b.year, b.month, b.day, b.time.split(':')[0], b.time.split(':')[1]); 
        return dateA - dateB;
    });
} 

export function getYears(fromYear, toYear) {
    let array = [];
    let i = 0;
    while(fromYear+i <= toYear) {
        array.push(fromYear+i);
        i++;
    }
    return array;
}