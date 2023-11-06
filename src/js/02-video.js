import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_KEY = `videoplayer-current-time`;

async function initPlayer() {
  try {
    await player.ready(); // Wait for the player to be ready
    const time = localStorage.getItem(LOCAL_KEY) || 0;
    player.setCurrentTime(time);

    player.on('timeupdate', throttle(function({ seconds }) {
      localStorage.setItem(LOCAL_KEY, seconds);
    }, 1000));
  } catch (error) {
    console.error('Error initializing player:', error);
  }
}

initPlayer();