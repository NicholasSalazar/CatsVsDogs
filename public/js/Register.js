

function Register(){
var username = document.getElementById("inputUsername").value;
var email = document.getElementById("inputEmail").value;
var password = document.getElementById("inputPassword").value;
var adminPrivilegeBox = document.getElementById("adminPrivilegeBox");



const xhttp =  new XMLHttpRequest();


temp = {
	"name": username.toString(),
	"email": email.toString(),
	"password": password.toString(),
  "adminPrivilege": "true"
}

data = JSON.stringify(temp)
console.log(temp)
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
    	alert('You have successfully registered!')
    	location.redirect('/login') //Change the location to appropriate domain
        }
};
xhttp.open("POST", "/api/users",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data)

}

var input = document.getElementById("inputPassword");

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("registerButton").click();
  }
});
