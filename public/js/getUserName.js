function getUserName(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
        var serverRes =JSON.parse(this.responseText);
        var y = serverRes.name
        var x = document.getElementById("userName");
        x.innerHTML = y

        

        }
};
xhttp.open("GET", "/api/users/me", true);

xhttp.send()


}


getUserName();

function logout(){
const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      
    }
    else if (this.readyState == 4 && this.status == 200){
    }
  }
xhttp.open("GET", "/api/auth/logout", true);

xhttp.send();

}