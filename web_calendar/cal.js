var currentMonth = new Month(2016, 2); // March 2016


// Change the month when the "next" button is pressed
document.getElementById("next_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);

document.getElementById("prev_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);
 
 
// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar(){
	var weeks = currentMonth.getWeeks();
	var weeknum = ["week1", "week2", "week3", "week4", "week5"];
	
	var montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var displayMonth = montharray[currentMonth.month];
	document.getElementById("curmonth").textContent = displayMonth +" "+currentMonth.year;
 
	for(var w in weeks){
		var days = weeks[w].getDates();
		// days contains normal JavaScript Date objects.
 
		for(var d in days){
			// You can see console.log() output in your JavaScript debugging tool, like Firebug,
			// WebWit Inspector, or Dragonfly.
			console.log(days[d].toISOString());

			// week goes from 0 to 4 and day goes from 0 to 6
			var dateString = days[d].toDateString();
			var space = ' ';
			var arrayDateStrings = dateString.split(space);
			var day = arrayDateStrings[2];
						
			if (days[d].getMonth() == currentMonth.month) {
                document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].textContent = day;
            }
			else {
				document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].textContent = " ";									
			}
		}
	}
}

(function(){Date.prototype.deltaDays=function(c){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+c)};Date.prototype.getSunday=function(){return this.deltaDays(-1*this.getDay())}})();
function Week(c){this.sunday=c.getSunday();this.nextWeek=function(){return new Week(this.sunday.deltaDays(7))};this.prevWeek=function(){return new Week(this.sunday.deltaDays(-7))};this.contains=function(b){return this.sunday.valueOf()===b.getSunday().valueOf()};this.getDates=function(){for(var b=[],a=0;7>a;a++)b.push(this.sunday.deltaDays(a));return b}}
function Month(c,b){this.year=c;this.month=b;this.nextMonth=function(){return new Month(c+Math.floor((b+1)/12),(b+1)%12)};this.prevMonth=function(){return new Month(c+Math.floor((b-1)/12),(b+11)%12)};this.getDateObject=function(a){return new Date(this.year,this.month,a)};this.getWeeks=function(){var a=this.getDateObject(1),b=this.nextMonth().getDateObject(0),c=[],a=new Week(a);for(c.push(a);!a.contains(b);)a=a.nextWeek(),c.push(a);return c}};