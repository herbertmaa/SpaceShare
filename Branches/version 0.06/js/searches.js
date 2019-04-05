$('#autocomplete').on('change', event => {

  var address = $('#autocomplete').val();

  localStorage.setItem('AddressArr', address);
  address = address.replace(/,/g,"");
  var addressArray = address.split(" ");

  localStorage.setItem('City', addressArray[addressArray.length - 3]);
  localStorage.setItem('Address', address);

  if (addressArray[addressArray.length - 3] != "" && 
  addressArray[addressArray.length - 2] != "")  {
    document.location.href = "search.html";
} else {
    window.alert("Enter a valid city or country");
    
}

});