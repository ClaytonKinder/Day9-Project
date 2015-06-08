///////////////////////////////////
// VARIABLES
///////////////////////////////////

var firstImages = fetch.firstImageOfAlbum();
var templates = {};
var $allPages = $('body > div');
var $albumsPage = $('#albumsPage');
var $albumPage = $('#albumPage');
var $photoPage = $('#photoPage');
var activeAlbum;
var activePhoto;

///////////////////////////////////
// ON READY
///////////////////////////////////

$(document).ready(function(){

  constructor.albumsPageBlock();
  constructor.albumPageNavLink();

  // Transitions from AlbumsPage to AlbumPage with selected album intact.
  $('#albumsPageWrapper').on('click', '.albumsPageBlock', function(e){
    e.preventDefault();
    activeAlbum = $(this).attr('rel');
    constructor.albumPageMain();

    $allPages.removeClass('active');
    $albumPage.addClass('active');

    $('#albumPageNav nav a').each(function(){
      if ($(this).attr('rel') === activeAlbum) {
        $(this).addClass("currentAlbum");
      }
    });
  });

  // Changes displayed album inside #albumPageMain based on what nav link inside #albumPageNav is clicked // on.
  $('#albumPageNav nav a').on('click', function(e){
    e.preventDefault();
    activeAlbum = $(this).attr('rel');
    constructor.albumPageMain();
    $('#albumPageNav nav a').removeClass('currentAlbum');
    $(this).addClass('currentAlbum');
  });

  // Builds the photoPage depending on which picture is clicked on
  $('body').on('click', '.albumPageGalleryBlock', function(e){
    e.preventDefault();
    activePhoto = $(this).attr('rel');
    constructor.photoPage();

    $allPages.removeClass('active');
    $photoPage.addClass('active');
  });

  // Views the previous photo within the album
  $('body').on('click', '.prevPhoto', function(e){
    e.preventDefault();
    // Breaks name of activePhoto into array
    if (typeof activePhoto === 'string') {
      var activePhotoArray = activePhoto.split("");
    } else if (typeof activePhoto === 'object') {
      var activePhotoArray = activePhoto.title.split("");
    }
    // Removes last character from activePhotoArray
    var popped = activePhotoArray.pop();
    // Subtracts 1 from the number removed in the last step
    var poppedMinus = (Number(popped) - 1);
    // If activePhoto is less than 1, it loops around to the end of the array, in this case it's 6.
    if (poppedMinus < 1) {
      for (var i=0; i<albums.length; i++) {
        if (activeAlbum === albums[i].title) {
          poppedMinus = albums[i].photos.length;
        }
      }
    }
    // Pushes the newly subtracted number onto the end of the array
    var newActivePhoto = activePhotoArray.push(poppedMinus);
    // Joins the array back into a string
    newActivePhoto = activePhotoArray.join("");
    activePhoto = newActivePhoto;
    constructor.photoPage(newActivePhoto);
  });

  // Views the next photo within the album
  $('body').on('click', '.nextPhoto', function(e){
    e.preventDefault();
    // Breaks name of activePhoto into array
    if (typeof activePhoto === 'string') {
      var activePhotoArray = activePhoto.split("");
    } else if (typeof activePhoto === 'object') {
      var activePhotoArray = activePhoto.title.split("");
    }
    // Removes last character from activePhotoArray
    var popped = activePhotoArray.pop();
    // Adds 1 from the number removed in the last step
    var poppedPlus = (Number(popped) + 1);
    // If activePhoto is greater than the length of the currentAlbum, it loops around to the beginning of the array.
    if (poppedPlus > albums.length) {
      for (var i=0; i<albums.length; i++) {
        if (activeAlbum === albums[i].title) {
          poppedPlus = 1;
        }
      }
    }

    // Pushes the newly subtracted number onto the end of the array
    var newActivePhoto = activePhotoArray.push(poppedPlus);
    // Joins the array back into a string
    newActivePhoto = activePhotoArray.join("");
    activePhoto = newActivePhoto;
    constructor.photoPage(newActivePhoto);
  });
});
