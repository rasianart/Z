$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select

console.log('hey');

$('#create-hole').on('click', () => {
    console.log('create');
});

$('.portals').on('click', function() {
    let idName = $(this).attr('id');
    $.get('/portalentrance/' + idName, (data) => {
        console.log(data);
    });

    // window.location.href = "/portalentrance" + idName;
})

});
