function shareAjax(event){
if(logoff===false){
    var user2 = document.getElementById("user2").value;
    var event_id= document.getElementById("event_id").value;
	var dataString = "user2=" + encodeURIComponent(user2)+"&id=" + encodeURIComponent(event_id)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "share_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've shared an event! ");
			showevents();
		}else{
			alert("Failed...You did not share the event "+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString); 
}
else{
alert("Visitors cannot share events, please log in first");
}
}


function addtagAjax(event){
if(logoff===false){
    var tag = document.getElementById("tag").value;
    var id = document.getElementById("event_id").value; 
	var dataString = "id=" + encodeURIComponent(id) + "&tag=" + encodeURIComponent(tag)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "addtag_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've added a tag! ");
			showevents();
		}else{
			alert("Failed...You did not add the tag"+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString); 
}
else{
alert("Visitors cannot add tag, please log in first");
}
}


function droptagAjax(event){
if(logoff===false){
    var id = document.getElementById("event_id").value; 
	var dataString = "id=" + encodeURIComponent(id) + "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "droptag_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've dropped a tag! ");
			showevents();
		}else{
			alert("Failed...You did not drop the tag "+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString);   
}
else{
alert("Visitors cannot drop a tag, please log in first");
}
}


function editAjax(event){
if(logoff===false){
    var id = document.getElementById("event_id").value;
    var event_ = document.getElementById("add_event").value;
	var time = document.getElementById("add_time").value;
	var dataString = "event=" + encodeURIComponent(event_) + "&time=" + encodeURIComponent(time)+"&id=" + encodeURIComponent(id)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "edit_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've edited an event! ");
			showevents();
		}else{
			alert("Failed...You did not edit the event"+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString); 
}
else{
alert("Visitors cannot edit events, please log in first");
}
}


function deleteAjax(event){
if(logoff===false){
    var id = document.getElementById("event_id").value; 
	var dataString = "id=" + encodeURIComponent(id)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "delete_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've deleted an event!");
			showevents();
		}else{
			alert("Failed...You did not delete the event.  "+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString); 
}
else{
alert("Visitors cannot delete events, please log in first");
}
}


function addAjax(event){
if(logoff===false){
    var event_ = document.getElementById("add_event").value; 
	var day = document.getElementById("add_day").value;
	var time = document.getElementById("add_time").value; 
	var month = document.getElementById("add_month").value;
	var dataString = "event=" + encodeURIComponent(event_) + "&token=" + encodeURIComponent(token)+"&day=" + encodeURIComponent(day)+"&time=" + encodeURIComponent(time)+"&month=" + encodeURIComponent(month)+"&year=" + encodeURIComponent(currentMonth.year);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "add_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've added a new event!");
			showevents();
		}else{
			alert("Failed... You did not add the event.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString); 
}
else{
alert("Visitors cannot add events, please log in first");
}
}


function logoffAjax(event){
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "logoff_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){ 
			alert(jsonData.message);
			logoff=true;
			token="";
			document.getElementById("welcome_header").innerHTML="Welcome";
			updateCalendar();
		}else{
			alert("Failed...You did not log off.");
		}
	}, false); 
	xmlHttp.send(null); 
}


function loginAjax(event){
	var username = document.getElementById("username").value; 
	var password = document.getElementById("password").value; 
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "login_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've now Logged in ~ =^ ^=  ");
			logoff=false;
			token=jsonData.token;
			document.getElementById("welcome_header").innerHTML="Welcome, "+username;
			showevents();
		}else{
			alert("Failed...You did not log in.  "+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString);
}


function registerAjax(event){
	username = document.getElementById("username").value; 
	var password = document.getElementById("password").value; 
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "register_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
			alert("Success! You've now been Registered!");
		}else{
			alert("Failed! You are not Registered.  "+jsonData.message);
		}
	}, false); 
	xmlHttp.send(dataString); 
}


function showtagAjax(){
if(logoff===false){
    var tag = document.getElementById("tag").value; 
	var dataString = "tag=" + encodeURIComponent(tag)+"&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest();  
	xmlHttp.open("POST", "showtag_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){  
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
			showevents();
		}
	}, false); 
	xmlHttp.send(dataString); 
	}
	else{
	alert("visitors cannot see tag events, please log in");
	}
}


function showevents(){
    if(logoff===false){
    var username = document.getElementById("username").value;  
	var username = "username=" + encodeURIComponent(username)+"&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest();  
	xmlHttp.open("POST", "calendar.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){  
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
	}, false);
	xmlHttp.send(username); 
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
			console.log(days[d].toISOString());
			var dateString = days[d].toDateString();
			var space = ' ';
			var arrayDateStrings = dateString.split(space);
			var day = arrayDateStrings[2];
			if (days[d].getMonth() == currentMonth.month) {
                document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].textContent = day;
                if(days[d].getFullYear()==Tyear&&days[d].getMonth()==Tmonth&&days[d].getDate()==Tday){
                document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].innerHTML= "<b><font color='red'>"+day+"</font><b>";	
                }
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

document.getElementById("share_btn").addEventListener("click", shareAjax, false); 
document.getElementById("login_btn").addEventListener("click", loginAjax, false); 
document.getElementById("register_btn").addEventListener("click", registerAjax, false); 
document.getElementById("logoff_btn").addEventListener("click", logoffAjax, false); 
document.getElementById("add_btn").addEventListener("click", addAjax, false); 
document.getElementById("delete_btn").addEventListener("click", deleteAjax, false); 
document.getElementById("edit_btn").addEventListener("click",editAjax, false); 
document.getElementById("addtag_btn").addEventListener("click",addtagAjax, false); 
document.getElementById("droptag_btn").addEventListener("click",droptagAjax, false); 
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
var Today = new Date();
var Tyear=Today.getFullYear();
var Tmonth=Today.getMonth();
var Tday=Today.getDate();
var currentMonth = new Month(Today.getFullYear(),Today.getMonth());



document.getElementById("next_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); 
	updateCalendar(); 
	showevents();
}, false);

document.getElementById("prev_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); 
	updateCalendar(); 
	showevents();
}, false);


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
    var weeks = currentMonth.getWeeks();
	var montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var displayMonth = montharray[currentMonth.month];
	document.getElementById("curmonth").textContent = displayMonth +" "+currentMonth.year;
	for(var w in weeks){
		var days = weeks[w].getDates();
		for(var d in days){
			console.log(days[d].toISOString());
			var dateString = days[d].toDateString();
			var space = ' ';
			var arrayDateStrings = dateString.split(space);
			var day = arrayDateStrings[2];
			if (days[d].getMonth() == currentMonth.month) {
                document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].textContent = day;
                if(days[d].getFullYear()==Tyear&&days[d].getMonth()==Tmonth&&days[d].getDate()==Tday){
                document.getElementById(weeknum[w]).getElementsByClassName(weeknum[w])[d].innerHTML= "<b><font color='red'>"+day+"</font><b>";	
                }
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