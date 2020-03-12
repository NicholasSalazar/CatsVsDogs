
function sendInfo(){
var username = document.getElementById("inputUsername").value;
var password = document.getElementById("inputPassword").value;

const xhttp =  new XMLHttpRequest();


temp = {
	"name": username.toString(),
	"password": password.toString()
};




data = JSON.stringify(temp)

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
    	 
       
      window.sessionStorage.token = this.responseText

    	 window.location="/"; 
      
      

        }
};
xhttp.open("POST", "/api/auth",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data)

}


var input = document.getElementById("inputPassword");

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("loginButton").click();
  }
});


