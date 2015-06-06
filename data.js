///////////////////////////////////
// ALBUMS
///////////////////////////////////

function albumConstructor(category) {
  var album = [];
  for (var i=1; i < 7; i++) {
    var photo = {};
    photo.title = category + " " + i;
    photo.imageTag = '<img src="http://lorempixel.com/650/650/' + category.toLowerCase() + '/' + i + '">';
    album.push(photo);
  }
  return album;
};

var albums = [
  {
    title: "Sports",
    photos: albumConstructor('Sports')
  },
  {
    title: "Abstract",
    photos: albumConstructor('Abstract')
  },
  {
    title: "City",
    photos: albumConstructor('City')
  },
  {
    title: "Food",
    photos: albumConstructor('Food')
  },
  {
    title: "Nightlife",
    photos: albumConstructor('Nightlife')
  },
  {
    title: "Technics",
    photos: albumConstructor('Technics')
  }
];

///////////////////////////////////
// VARIABLES
///////////////////////////////////

var firstImages = fetchFirstImageOfAlbum();
var templates = {};
var $allPages = $('body > div');
var $albumsPage = $('#albumsPage');
var $albumPage = $('#albumPage');
var $photoPage = $('#photoPage');
var activeAlbum;
var activePhoto;

///////////////////////////////////
// FETCHERS
///////////////////////////////////

function fetchFirstImageOfAlbum() {
  var firstImages = [];

  albums.forEach(function(el, idx, list){
    var image = {};
    image.title = el.photos[0].title;
    image.imageTag = el.photos[0].imageTag;
    firstImages.push(image);
  });
  return firstImages;
}

function fetchActiveAlbum() {
  var fetchedActiveAlbum;
  for (var i=0; i<albums.length; i++){
    if (albums[i].title === activeAlbum) {
      fetchedActiveAlbum = albums[i];
    }
  };
  return fetchedActiveAlbum;
}

function fetchActivePhoto() {
  var fetchedActivePhoto;
  for (var i=0; i<albums.length; i++){
    for (var j=0; j<albums[i].photos.length; j++) {
      if (albums[i].photos[j].title === activePhoto) {
        fetchedActivePhoto = albums[i].photos[j];
      }
    }
  };
  return fetchedActivePhoto;
}

///////////////////////////////////
// CONSTRUCTORS
///////////////////////////////////

// Builds the album blocks that display on AlbumsPage
function albumsPageBlockConstructor() {
  for (i=0; i<firstImages.length; i++) {
    var constructStr = "";
    constructStr += '<div class="albumsPageBlock" rel="'
    constructStr += albums[i].title;
    constructStr += '">';
    constructStr += '<div class="albumsPageBlockImage">';
    constructStr += firstImages[i].imageTag;
    constructStr += '</div>';
    constructStr += '<div class="albumsPageBlockTitle"><h3>';
    constructStr += albums[i].title;
    constructStr += '</h3></div></div>';
    $('#albumsPageWrapper').append(constructStr);
  }
}

// Builds the nav links that display on AlbumPage
function albumPageNavLinkConstructor() {
  for (i=0; i<albums.length; i++) {
    var constructStr = "";
    constructStr += '<a href="#" rel="';
    constructStr += albums[i].title;
    constructStr += '">';
    constructStr += albums[i].title;
    constructStr += '</a>';
    $('#albumPageNav nav').append(constructStr);
  }
}

// Builds the main content that displays on AlbumPage
function albumPageMainConstructor() {
  $('#albumPageMain').html("");
  var constructStr = "";
  var fetchedActiveAlbum = fetchActiveAlbum();
  var blocks = "";

  for (var i=0; i<fetchedActiveAlbum.photos.length; i++) {
    blocks += '<div class="albumPageGalleryBlock" rel="';
    blocks += fetchedActiveAlbum.photos[i].title;
    blocks += '">';
    blocks += '<div class="albumPageGalleryBlockImage">';
    blocks += fetchedActiveAlbum.photos[i].imageTag;
    blocks += '</div>';
    blocks += '<div class="albumPageGalleryBlockTitle"><h3>';
    blocks += fetchedActiveAlbum.photos[i].title;
    blocks += '</h3></div></div>';
  }

  constructStr += '<div id="albumPageTitle">';
  constructStr += '<div id="albumPageTitleText"><h1>';
  constructStr += fetchedActiveAlbum.title;
  constructStr += '</h1></div></div>';
  constructStr += '<div id="albumPageGallery">';
  constructStr += '<div id="albumPageGalleryWrapper">';
  constructStr += blocks;
  constructStr += '</div></div>';
  $('#albumPageMain').append(constructStr);
}

// Builds the photoPage depending on which photo from albumPage is clicked
function photoPageConstructor(actPho) {
  $('#photoPage').html("");
  var constructStr = "";
  var fetchedActiveAlbum = fetchActiveAlbum();
  if (actPho !== undefined) {
    var fetchedActivePhoto = actPho;
  } else {
    var fetchedActivePhoto = fetchActivePhoto();
  }


  constructStr += '<div id="photoPageNavWrapper">';
  constructStr += '<a id="photoPageBackBlock" href="#">';
  constructStr += '<div id="photoPageBackIcon"><i class="fa fa-chevron-left"></i></div>';
  constructStr += '<div id="photoPageBackText">';
  constructStr += 'Back to ' + fetchedActiveAlbum.title;
  constructStr += '</div></a>';
  constructStr += '<div id="photoPageTitleBlock"><h1>';
  constructStr += photoPageTitleConstructor(fetchedActivePhoto);
  constructStr += '</h1></div></div>';
  constructStr += '<div id="photoPagePhotoWrapper">';
  constructStr += photoPagePhotoBlockConstructor();
  constructStr += '</div>';

  $('#photoPage').append(constructStr);

  $('#photoPageBackBlock').on('click', function(e){
    e.preventDefault();
    albumPageMainConstructor();
    $allPages.removeClass('active');
    $albumPage.addClass('active');
  });
}

function photoPageTitleConstructor(actTitle) {
  var constructStr = "";
  var fetchedActivePhoto = fetchActivePhoto();

  if (actTitle !== undefined) {
    if (typeof actTitle === 'object') {
      constructStr += actTitle.title;
    } else {
      constructStr += actTitle;
    }
  } else {
    constructStr += fetchedActivePhoto.title;
  }
  return constructStr;
}

function photoPagePhotoBlockConstructor(actPho) {
  $('#photoPagePhotoWrapper').html("");
  var constructStr = "";
  var fetchedActiveAlbum = fetchActiveAlbum();

  if (actPho !== undefined) {
    var fetchedActivePhoto = actPho;

    if (typeof actPho === 'string') {
      activePhoto = actPho;
    } else {
      activePhoto = actPho.title;
    }

    constructStr += '<div id="photoPagePhotoBlock" rel="';
    constructStr += activePhoto;
    constructStr += '">';
    constructStr += '<div id="prevPhoto" class="prevPhoto"><i class="fa fa-chevron-left"></i></div>';
    for (var i=0; i<fetchedActiveAlbum.photos.length; i++) {
      if (fetchedActiveAlbum.photos[i].title === activePhoto) {
        constructStr += fetchedActiveAlbum.photos[i].imageTag;
      }
    }
    constructStr += '<div id="nextPhoto" class="nextPhoto"><i class="fa fa-chevron-right"></i></div>';
    constructStr += '</div>';

    $('#photoPagePhotoWrapper').append(constructStr);
  } else {
    fetchedActivePhoto = fetchActivePhoto();
    constructStr += '<div id="photoPagePhotoBlock" rel="';
    constructStr += fetchedActivePhoto.title;
    constructStr += '">';
    constructStr += '<div id="prevPhoto" class="prevPhoto"><i class="fa fa-chevron-left"></i></div>';
    constructStr += fetchedActivePhoto.imageTag;
    constructStr += '<div id="nextPhoto" class="nextPhoto"><i class="fa fa-chevron-right"></i></div>';
    constructStr += '</div>';

     return constructStr;
  }
}
