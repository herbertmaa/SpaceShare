
$('#submit').on('click', event => {
  var address = $('#autocomplete').val();
    address = address.replace(/,/g,"");
    var addressArray = address.split(" ");
    console.log(addressArray);

    localStorage.setItem('Length', $('#make-length').val());
    localStorage.setItem("Width", $('make-width').val());
    localStorage.setItem('Height', $('make-width').val());

    localStorage.setItem('City', addressArray[addressArray.length - 3]);
    localStorage.setItem('Address', address);

    
   if (!(($('#administrative_area_level_1').val() === "") && ($('#locality').val() === "")))  {
        document.location.href = "search.html";
    } else {
        window.alert("Enter a valid city or country");
    }
    
});



