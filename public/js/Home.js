


function getSpotlight(){

    const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
      
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);




          counterCats = 0
          counterDogs = 0
             
            console.log(serverRes[0])

                
            for(i=0;i<=serverRes.length-1;i++){
            if (serverRes[i].DVC == true){
                
                     $('<div class="person-listing"><h6 class="text-primary">'+serverRes[i].Title+'</h6>'+
                       
                        '<img src="' + 'data:'+serverRes[i].img.contentType+';base64,'+serverRes[i].ImageName+'" width="100" height="100">' +
                        '<strong class = "inline-field"> Why Cats Rule: </strong>' +
                        '<span class = "inline-field">'+serverRes[i].Description+'</span></div>' 
                        

                        ).appendTo("#CatsBody");
                     counterCats +=1;
                    
                }
                else{  
                $('<div class="person-listing"><h6 class="text-primary">'+serverRes[i].Title+'</h6>'+
                       
                        '<img src="' + 'data:'+serverRes[i].img.contentType+';base64,'+serverRes[i].ImageName+'" width="100" height="100">' +
                        '<strong class = "inline-field"> Why Dogs Rule: </strong>' +
                        '<span class = "inline-field">'+serverRes[i].Description+'</span></div>'
                        ).appendTo("#DogsBody"); 
                        counterDogs +=1;
                        console.log(counterDogs)
                        console.log(counterCats)
            }
            }

            if (counterCats != counterDogs){
                console.log('test')
                if (counterCats > counterDogs){
                    $('<span class="text-primary">   (Is winning by '+(counterCats-counterDogs)+ ')</span>').appendTo("#CatHeader")
                    console.log('test')

                }
                else if (counterDogs > counterCats){
                    $('<span class="text-primary">   (Is winning by '+(counterDogs-counterCats)+ ')</span>').appendTo("#DogHeader")
                }
            }

            };

};

xhttp.open("GET", "/api/images/spotlight", true);

xhttp.send()

}
getSpotlight()
