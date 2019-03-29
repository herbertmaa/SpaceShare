
$('#submit').on('click', event => {
  var address = $('#autocomplete').val();
  localStorage.setItem('Address', address);
   if (!(($('#administrative_area_level_1').val() === "") && ($('#locality').val() === "")))  {
        document.location.href = "search.html";
    } else {
        window.alert("Enter a valid city or country");
    }
    
});
