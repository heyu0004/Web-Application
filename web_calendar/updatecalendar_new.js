function shareAjax(event){
if(logoff===false){
    var user2 = document.getElementById("user2").value;
    var event_id= document.getElementById("event_id").value;
	var dataString = "user2=" + encodeURIComponent(user2)+"&id=" + encodeURIComponent(event_id)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "share_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've shared an event!"+jsonData.message);
			showevents();
		}else{
			alert("You did not share the event"+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
else{
alert("visitors cannot share events, please log in");
}
}


function addtagAjax(event){
if(logoff===false){
    var tag = document.getElementById("tag").value;
    var id = document.getElementById("event_id").value; 
	var dataString = "id=" + encodeURIComponent(id) + "&tag=" + encodeURIComponent(tag)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "addtag_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've added a tag!"+jsonData.message);
			showevents();
		}else{
			alert("You did not add the tag"+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data   
}
else{
alert("visitors cannot add tag, please log in");
}
}


function droptagAjax(event){
if(logoff===false){
    var id = document.getElementById("event_id").value; 
	var dataString = "id=" + encodeURIComponent(id) + "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "droptag_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've dropped a tag!"+jsonData.message);
			showevents();
		}else{
			alert("You did not drop the tag"+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data     
}
else{
alert("visitors cannot drop a tag, please log in");
}
}


function editAjax(event){
if(logoff===false){
    var id = document.getElementById("event_id").value;
    var event_ = document.getElementById("add_event").value;
	var time = document.getElementById("add_time").value;
	var dataString = "event=" + encodeURIComponent(event_) + "&time=" + encodeURIComponent(time)+"&id=" + encodeURIComponent(id)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "edit_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've edited an event!"+jsonData.message);
			showevents();
		}else{
			alert("You did not edit the event"+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
else{
alert("visitors cannot edit events, please log in");
}
}


function deleteAjax(event){
if(logoff===false){
    var id = document.getElementById("event_id").value; // Get the username from the form
	var dataString = "id=" + encodeURIComponent(id)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "delete_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've deleted an event!"+jsonData.message);
			showevents();
		}else{
			alert("You did not delete the event.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
else{
alert("visitors cannot delete events, please log in");
}
}


function addAjax(event){
if(logoff===false){
    var event_ = document.getElementById("add_event").value; // Get the username from the form
	var day = document.getElementById("add_day").value;
	var time = document.getElementById("add_time").value; // Get the username from the form
	var month = document.getElementById("add_month").value;
	var dataString = "event=" + encodeURIComponent(event_) + "&token=" + encodeURIComponent(token)+"&day=" + encodeURIComponent(day)+"&time=" + encodeURIComponent(time)+"&month=" + encodeURIComponent(month)+"&year=" + encodeURIComponent(currentMonth.year);
	alert(dataString);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "add_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've added a new event!"+jsonData.message);
			showevents();
		}else{
			alert("You did not add a new event.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
else{
alert("visitors cannot add events, please log in");
}
}


function logoffAjax(event){
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "logoff_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert(jsonData.message);
			logoff=true;
			token="";
			document.getElementById("welcome_header").innerHTML="Welcome, visitor";
			updateCalendar();
		}else{
			alert("You were not logged off.  ");
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(null); // Send the data
}


function loginAjax(event){
	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  
			alert("You've been Logged in!  ");
			logoff=false;
			token=jsonData.token;
			document.getElementById("welcome_header").innerHTML="Welcome, "+username;
			showevents();
		}else{
			alert("You were not logged in.  "+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString); // Send the data
}


function registerAjax(event){
	username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
    //alert(dataString);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "register_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been Registered!");
		}else{
			alert("You were not Registered.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}


function showtagAjax(){
if(logoff===false){
    var tag = document.getElementById("tag").value; // Get the username from the form 
	// Make a URL-encoded string for passing POST data:
	var dataString = "tag=" + encodeURIComponent(tag)+"&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance   
	xmlHttp.open("POST", "showtag_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			var month_data=[1];
			var id_data=[10];
			var year_data=[2016];
			var day_data=[10];
			var time_data=[8];
			var event_data=["first"];
			var tag=["individual"];
			 year_data=jsonData.year;
			 month_data=jsonData.month;
			 day_data=jsonData.date;
			 time_data=jsonData.time;
			 event_data=jsonData.event;
			 id_data=jsonData.id;
			 tag_data=jsonData.tag;
			 
			 showall(month_data,day_data,time_data,event_data,year_data,id_data,tag_data);	 
		}
		else{
			alert(jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data	
	}
	else{
	alert("visitors cannot see tag events, please log in");
	}
}


function showevents(){
    if(logoff===false){
    var username = document.getElementById("username").value; // Get the username from the form 
	// Make a URL-encoded string for passing POST data:
	var username = "username=" + encodeURIComponent(username)+"&token=" + encodeURIComponent(token);
	//show user's events
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance   
	xmlHttp.open("POST", "calendar.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			var month_data=[1];
			var id_data=[10];
			var year_data=[2016];
			var day_data=[10];
			var time_data=[8];
			var event_data=["first"];
			var tag=["individual"];
			 year_data=jsonData.year;
			 month_data=jsonData.month;
			 day_data=jsonData.date;
			 time_data=jsonData.time;
			 event_data=jsonData.event;
			 id_data=jsonData.id;
			 tag_data=jsonData.tag;
			 
			 showall(month_data,day_data,time_data,event_data,year_data,id_data,tag_data);
			 
		}
		else{
			alert(jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(username); // Send the data	
	}
}


function showall(month_data,day_data,time_data,event_data,year_data,id_data,tag_data){
    if(logoff===false){
	var weeks = currentMonth.getWeeks();
	var weeknum = ["week1", "week2", "week3", "week4", "week5","week6"];
	var montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var displayMonth = montharray[currentMonth.month];
	document.getElementById("curmonth").textContent = displayMonth +" "+currentMonth.year;

	for(var w in weeks){
		var days = weeks[w].getDates();

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
                var i=0;
                while (i < month_data.length){
                while (day.charAt(0)=='0'){
                 day=day.substr(1);}
                if(currentMonth.month==(month_data[i]-1)&&(day==day_data[i])&&currentMonth.year==year_data[i]){ 
                   document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].innerHTML +="<p>"+"("+id_data[i]+") "+time_data[i]+" "+event_data[i]+" "+tag_data[i]+" "+"</p>";
                }
                i=i+1;
                }
            }
			else {
				document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].textContent = " ";									
			}
		}
	}
}
} 


document.getElementById("login_btn").addEventListener("click", loginAjax, false); 
document.getElementById("register_btn").addEventListener("click", registerAjax, false); 
document.getElementById("logoff_btn").addEventListener("click", logoffAjax, false); 
document.getElementById("add_btn").addEventListener("click", addAjax, false); 
document.getElementById("delete_btn").addEventListener("click", deleteAjax, false); 
document.getElementById("edit_btn").addEventListener("click",editAjax, false); 
document.getElementById("addtag_btn").addEventListener("click",addtagAjax, false); 
document.getElementById("droptag_btn").addEventListener("click",droptagAjax, false); 
document.getElementById("share_btn").addEventListener("click",shareAjax, false); 
document.getElementById("showtag_btn").addEventListener("click", function(event){
	updateCalendar();
	showtagAjax();
}, false);

document.getElementById("showall_btn").addEventListener("click", function(event){
	updateCalendar();
	showevents();
}, false);

var logoff=true;
var token="";
var currentMonth = new Month(2016, 2); // March 2016


// Change the month when the "next" button is pressed
document.getElementById("next_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	showevents();
}, false);

document.getElementById("prev_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	showevents();
}, false);


// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar(){
	var weeknum = ["week1", "week2", "week3", "week4", "week5","week6"];
	//clear table
    var j=5;
    var k=6;
    while (j>=0){
       while (k>=0){
          document.getElementById(weeknum[j]).getElementsByClassName(weeknum[j])[k].textContent = " ";
       k=k-1;
       }
    j=j-1;
    }
    j=0;k=0;
    
    //repopulate table
    var weeks = currentMonth.getWeeks();
	var montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var displayMonth = montharray[currentMonth.month];
	
	document.getElementById("curmonth").textContent = displayMonth +" "+currentMonth.year;
    
	for(var w in weeks){
		var days = weeks[w].getDates();
		for(var d in days){
			// You can see console.log() output in your JavaScript debugging tool, like Firebug,
			// WebWit Inspector, or Dragonfly.
			console.log(days[d].toISOString());

			// week goes from 0 to 4 and day goes from 0 to 6
			var dateString = days[d].toDateString();
			var space = ' ';
			var arrayDateStrings = dateString.split(space);
			var day = arrayDateStrings[2];
			//document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].textContent = " ";
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