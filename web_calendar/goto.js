document.getElementById("goto").addEventListener("click",function(event){
   //currentMonth.month = document.getElementById("jumpMonth").value;
   //currentMonth.year = document.getElementById("jumpYear").value;
   currentMonth = new Month(document.getElementById("jumpYear").value, document.getElementById("jumpMonth").value-1);
   alert(currentMonth.month+"  "+currentMonth.year);
   //currentMonth= new Month(document.getElementById("jumpMonth").value, document.getElementById("jumpYear").value);
   updateCalendar();
   //showevents();
}
)