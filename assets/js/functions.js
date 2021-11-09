
var performance = null;
	
function notquali(){
	document.getElementById("wynik2").innerHTML = "";
	document.getElementById("wynik3").innerHTML = "";
	document.getElementById("wynik4").innerHTML = "";
	document.getElementById("wynik5").innerHTML = "";
	document.getElementById("wynik1").innerHTML = "<b>Playing with a 'nazawa tu idzie wybrana' performance:</b><br>		Bronze <input type='radio' name='Performenc' onchange='zmiana1()'> 100% price<br>		Silver <input type='radio' name='Performenc' onchange='zmiana2()'> 115% price<br>		Gold <input type='radio' name='Performenc' onchange='zmiana3()'> 140% price<br><br>				Note: choosing Gold Performance, means getting into Gold League at the end of the Event";
}

function startquali(){
	document.getElementById("wynik2").innerHTML = "";
	document.getElementById("wynik3").innerHTML = "";
	document.getElementById("wynik4").innerHTML = "";
	document.getElementById("wynik5").innerHTML = "";

	document.getElementById("kal1").style.display = 'none';
	document.getElementById("kal2").style.display = 'none';
	document.getElementById("kal3").style.display = 'none';		
	
	document.getElementById("wynik1").innerHTML = "Ile bitew rozegrałeś w quali: <input type='number'><br><br>				Jaki masz performance: <input type='number'><br><br><b>Playing with a 'nazawa tu idzie wybrana' performance:</b><br>		Bronze <input type='radio' name='Performenc' onchange='zmiana1()'> 100% price<br>		Silver <input type='radio' name='Performenc' onchange='zmiana2()'> 115% price<br>		Gold <input type='radio' name='Performenc' onchange='zmiana3()'> 140% price<br><br>				Note: co wybierzesz dostaniesz na koniec";
	
}

function finsquali(){
	document.getElementById("wynik2").innerHTML = "";
	document.getElementById("kal1").style.display = 'none';
	document.getElementById("kal2").style.display = 'none';
	document.getElementById("kal3").style.display = 'none';		
	
	document.getElementById("wynik1").innerHTML = "<b>What is Your Division?</b><br>Div 3 <input type='radio' onchange='next1()' name='choose1'><br>Div 2 <input onchange='next1()' type='radio' name='choose1'><br>Div 1 <input onchange='next1()' type='radio' name='choose1'><br><br>";
}

function next1(){
	document.getElementById("wynik3").innerHTML = "";
	document.getElementById("wynik4").innerHTML = "";
	document.getElementById("wynik5").innerHTML = "";
	document.getElementById("wynik2").innerHTML = "<b>Rank:</b><br>10 <input onchange='next2()' type='radio' name='choose2'><br>9  <input type='radio' onchange='next2()' name='choose2'><br>8  <input type='radio' onchange='next2()' name='choose2'><br>7  <input type='radio' onchange='next2()' name='choose2'><br>6 <input type='radio' onchange='next2()' name='choose2'><br>5 <input type='radio' onchange='next2()' name='choose2'><br>4 <input type='radio' onchange='next2()' name='choose2'><br>3 <input type='radio' onchange='next2()' name='choose2'><br>2 <input type='radio' onchange='next2()' name='choose2'><br>1 <input type='radio' onchange='next2()' name='choose2'><br>";
}
function next2(){
	document.getElementById("wynik4").innerHTML = "";
	document.getElementById("wynik5").innerHTML = "";
	document.getElementById("wynik3").innerHTML = "Jaki masz performance: <input onchange='next3(this)' min='1' max='400' id='perf' type='number'><br>";
}
function next3(field){
	performance = document.getElementById("perf").value;

	document.getElementById("wynik5").innerHTML = "";
	document.getElementById("wynik4").innerHTML = "<b>Playing with a 'nazawa tu idzie wybrana' performance:</b><br>		Bronze <input type='radio' id='c3' name='Performenc' onchange='next4()'> 100% price<br>		Silver <input type='radio' name='Performenc' onchange='next4()' id='c2'> 115% price<br>		Gold <input type='radio' name='Performenc' id='c1' onchange='next4()'> 140% price<br><br>";

}
function next4(){
	
	var gold = document.getElementById("c1").checked; // c1-gold | c2-sliver | c3-bronz
	var sliver = document.getElementById("c2").checked; 
	var bronz = document.getElementById("c3").checked; 
	
	// dla golda ---------
	if (performance>=120 && gold==true) {
	document.getElementById("wynik5").innerHTML = "";
	
	}
	// ------------------
	
	else if (performance>=120 && sliver==true) {
	document.getElementById("wynik5").innerHTML = "<b>Co chcesz osiągność:</b><br>Bronz <input type='radio' name='end'><br>Silver <input type='radio' name='end'><br>Gold <input type='radio' id='gold' name='end'><br><br>Note!: co wybierzesz dostaniesz na koniec";
	}
	else if (performance<120 && performance>=70 && sliver==true){
	document.getElementById("wynik5").innerHTML = "<b>Co chcesz osiągność:</b><br>Bronz <input type='radio' name='end'><br>Silver <input type='radio' name='end'><br>Gold <input type='radio' name='end' disabled><br><br>Note!: co wybierzesz dostaniesz na koniec";
	}
	else if (performance<70 && sliver==true) {
	document.getElementById("wynik5").innerHTML = "<b>Co chcesz osiągność:</b><br>Bronz <input type='radio' name='end'><br>Silver <input type='radio' name='end' disabled><br>Gold <input type='radio' name='end' disabled><br><br>Note!: co wybierzesz dostaniesz na koniec";
	}
	else if (performance>=100 && bronz==true) {
	document.getElementById("wynik5").innerHTML = "<b>Co chcesz osiągność:</b><br>Bronz <input type='radio' name='end'><br>Silver <input type='radio' name='end'><br>Gold <input type='radio' name='end' disabled><br><br>Note!: co wybierzesz dostaniesz na koniec";
	}
	else if (performance<100 && bronz==true) {
	document.getElementById("wynik5").innerHTML = "<b>Co chcesz osiągność:</b><br>Bronz <input type='radio' name='end'><br>Silver <input type='radio' name='end' disabled><br>Gold <input type='radio' name='end' disabled><br><br>Note!: co wybierzesz dostaniesz na koniec";
	}
}


function zmiana1(){
		document.getElementById("kal1").style.display = 'inline';
		document.getElementById("kal2").style.display = 'none';
		document.getElementById("kal3").style.display = 'none';

		document.getElementById("wynik2").innerHTML = "<b>Price:</b> 100 euro<br>	";
}

function zmiana2(){
		document.getElementById("kal1").style.display = 'none';
		document.getElementById("kal2").style.display = 'inline';
		document.getElementById("kal3").style.display = 'none';

		document.getElementById("wynik2").innerHTML = "<b>Price:</b> 115 euro<br>";
}

function zmiana3(){
		document.getElementById("kal1").style.display = 'none';
		document.getElementById("kal2").style.display = 'none';
		document.getElementById("kal3").style.display = 'inline';

		document.getElementById("wynik2").innerHTML = "<b>Price:</b> 140 euro<br>";
}


		
$(function(){
	var str = '#len'; //increment by 1 up to 1-nelemnts
	$(document).ready(function(){
	  var i, stop;
	  i = 1;
	  stop = 4; //num elements
	  setInterval(function(){
		if (i > stop){
		  return;
		}
		$('#len'+(i++)).toggleClass('bounce');
	  }, 500)
	});
  });

  
