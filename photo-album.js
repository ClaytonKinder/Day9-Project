$(document).ready(function(){

  albumsPageBlockConstructor();
  albumPageNavLinkConstructor();

  // Transitions from AlbumsPage to AlbumPage with selected album intact.
  $('#albumsPageWrapper').on('click', '.albumsPageBlock', function(e){
    e.preventDefault();
    activeAlbum = $(this).attr('rel');
    albumPageMainConstructor();

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
    albumPageMainConstructor();
    $('#albumPageNav nav a').removeClass('currentAlbum');
    $(this).addClass('currentAlbum');
  });

  // Builds the photoPage depending on which picture is clicked on
  $('body').on('click', '.albumPageGalleryBlock', function(e){
    e.preventDefault();
    activePhoto = $(this).attr('rel');
    photoPageConstructor();

    $allPages.removeClass('active');
    $photoPage.addClass('active');

    $('body').on('click', '#photoPagePhotoBlock > div', function(e){
      e.preventDefault();


      if ($(this).hasClass('prevPhoto')) {
        // Breaks name of activePhoto into array
        if (typeof activePhoto === 'string') {
          var activePhotoArray = activePhoto.split("");
        } else if (typeof activePhoto === 'object') {
          var activePhotoArray = activePhoto.title.split("");
        }
        // console.log('Prev ActivePhotoArray: ', activePhotoArray);
        // Removes last character from activePhotoArray
        var popped = activePhotoArray.pop();
        // console.log('Prev Popped: ', popped);
        // Subtracts 1 from the number removed in the last step
        var poppedMinus = (Number(popped) - 1);
        // console.log('Prev PoppedMinus: ', poppedMinus);
        // If activePhoto is less than 1, it loops around to the end of the array, in this case it's 6.
        if (poppedMinus < 1) {
          for (var i=0; i<albums.length; i++) {
            if (activeAlbum === albums[i].title) {
              poppedMinus = albums[i].photos.length;
              // console.log('Prev PoppedMinus ChangeTo6: ', poppedMinus);
            }
          }
        }

        // Pushes the newly subtracted number onto the end of the array
        var newActivePhoto = activePhotoArray.push(poppedMinus);
        // console.log('Prev newActivePhoto: ', newActivePhoto);
        // Joins the array back into a string
        newActivePhoto = activePhotoArray.join("");
        //console.log('Prev newActivePhoto Joined: ', newActivePhoto);
        console.log('Currently Displaying Photo Title: ', newActivePhoto);
        activePhoto = newActivePhoto;
        photoPageConstructor(newActivePhoto);

      } else if ($(this).hasClass('nextPhoto')) {
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
        // console.log('Next PoppedPlus: ', poppedPlus);
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
        // console.log('Currently Displaying Photo Title: ', newActivePhoto);

        activePhoto = newActivePhoto;
        photoPageConstructor(newActivePhoto);
        // photoPagePhotoBlockConstructor(newActivePhoto);
      }
    });
  });


});
