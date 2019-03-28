$('#submit').on('click', event => {
    console.log($('#administrative_area_level_1').val());
    console.log($('#locality').val());
    if (!(($('#administrative_area_level_1').val() === "") && ($('#locality').val() === "")))  {
        document.location.href = '/Users/yogeshverma/Dropbox/COMP1930/Git/SpaceShare/Branches/Yogi/search.html';
    } else {
        window.alert("Enter a valid city or country");
    }
});
