$('#upload-photos').on('submit', function (event) {
    event.preventDefault();
    formData = new FormData();
    

    var files = $('#photos').get(0).files
        
        
    if (files.length == 0) {
        alert('Select at least 1 file to upload.');
        
    }
    else{
    // Append the files to the formData.
    for (var i=0; i < files.length; i++) {
        var file = files[i];
        

        formData.append("photos[]" , file, file.name);
        
        alert('You sucessfully posted!')

        
    }
    var title = document.getElementById("spotlightTitle").value
    if (title ==''){
        title = 'Anonymous'
    }
    var description = document.getElementById("spotlightDescription").value
    if (description ==''){
        description = 'Because they are awesome!'
    }
    var DVC = document.getElementById('spotlightDVC').checked
    formData.append("Title:", title);
     formData.append("Description:", description);
     formData.append("DVC:", DVC)


  // Handle Photos Upload
  uploadPhotos(formData);
}
});


function uploadPhotos(formData) {

    $.ajax({
        url: '/api/images/spotlight',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
    })
}


function catDogPic(){

   
   if($('#spotlightDVC').is(':checked')){
    spotlightImageName = 'cats.JPEG'
    
    document.getElementById("spotlightImage").src = '../images/home/' +spotlightImageName;
    document.getElementById("spotlightImage").width = "750"
   }
   else{
    spotlightImageName = 'dog.png'
    
    document.getElementById("spotlightImage").src = '../images/home/' +spotlightImageName;
    document.getElementById("spotlightImage").width = "750"
   }





}
catDogPic()
// function getSpotlight(){

//     const xhttp =  new XMLHttpRequest();


// console.log('test')

// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 400) {
//       alert(this.responseText);
      
//     }
//     else if (this.readyState == 4 && this.status == 200){

//         serverRes = JSON.parse(this.responseText);
        

//             spotlightTitle = serverRes.Title;
//             spotlightDescription = serverRes.Description;
//             spotlightImageName = serverRes.ImageName;
//             spotlightDVC = serverRes.DVC;
             
//              document.getElementById("spotlightImage").style.background = '../images/home/spotlight/' +spotlightImageName; 
        

             
//             console.log(serverRes)
        
//             };

// };

// xhttp.open("GET", "/api/images/spotlightSingle", true);

// xhttp.send()

// }
// getSpotlight()
