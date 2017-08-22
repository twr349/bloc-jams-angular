(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          var currentAlbum = Fixtures.getAlbum();


  /**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;

/**
  * @function setSong
  * @desc Stops currently playing song and loads new audio file as currentBuzzObject
  * @param {Object} song
*/
        var setSong = function(song) {
          if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.currentSong = null;
          }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
          });

    SongPlayer.currentSong = song;
 };

/**
*@function playSong
*@desc Plays current song using the currentBuzzObject
*@param {object} song
*/

      var playSong = function(song) {
        if (currentBuzzObject) {
          currentBuzzObject.play();
          song.playing = true;
        }
      };

  /**
  *@function stopSong
  *@desc Stops current song
  *@param {object} song
  */

      var stopSong = function (song) {
        currentBuzzObject.stop();
        song.playing = null;
      };

/**
*@function getSongIndex
*@desc Get index of current song
*@param {object}
*/
var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
};

/**
* @desc Active song object from list of songs
* @type {Object}
*/
      SongPlayer.currentSong = null;
/**
*@desc Checks to see if currentSong is the song playing
*@type {object}
*/
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
    if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
    } else if (SongPlayer.currentSong === song) {
      if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
          }
        }
};
/**
*@desc If song.playing is true set it to false and pause the music
*@type {object}
*/
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

/**
*@desc Plays previous song.
*@type {object}
*/

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if(currentSongIndex < 0) {
              stopSong(song);

            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
        };


     /**
     *@desc Plays next song.
     *@type {object}
     */

             SongPlayer.next = function() {
                 var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                 currentSongIndex++;

                 if(currentSongIndex === currentAlbum.songs.length) {
                   stopSong(song);

                 } else {
                   var song = currentAlbum.songs[currentSongIndex];
                   setSong(song);
                   playSong(song);
                 }
             };

               return SongPlayer;
          }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
