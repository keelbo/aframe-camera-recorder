'use strict';

// Ref: https://github.com/spite/ccapture.js/

const gRecorder = new CCapture({
  verbose: false,
  display: true,
  framerate: 30,
  quality: 100,
  format: 'jpg',
  timeLimit: 20,
  frameLimit: 0,
  autoSaveTime: 0
});

function render() {
  const sceneEl = document.querySelector('a-scene');
  //   sphere.rotation.x += 0.005;
  //   sphere.rotation.y += 0.005;
  //   renderer.render(scene, camera);
  gRecorder.capture(sceneEl.canvas);
  // requestAnimationFrame(render);
}

// setTimeout(() => {
//   // setInterval(() => {
//   // }, 10);
//   render();
// }, 2000);

AFRAME.registerComponent('c-camera-recorder', {
  schema: {
    format: {
      type: 'string',
      default: 'webm',
      oneOf: ['webm', 'jpg', 'png', 'mp4']
    }
  },
  init() {
    const { format } = this.data;

    this.isRecording = false;
    this.toggleBtnEl = this.setupToggleBtn();

    this.bindMethods();
  },

  tick() {
    // if (this.isRecording) {
    //   const sceneEl = document.querySelector('a-scene');
    //   gRecorder.capture(sceneEl.canvas);
    // }
    // setInterval(() => {
    // render();
    // }, 0);
    // render();
  },

  tock() {
    render();
  },

  update() {},

  play() {
    this.addEventListeners();
  },

  pause() {
    this.removeEventListeners();
  },

  setupToggleBtn() {
    const toggleBtnEl = document.createElement('BUTTON');
    toggleBtnEl.style.position = 'absolute';
    toggleBtnEl.style.top = '20px';
    toggleBtnEl.style.left = '20px';
    toggleBtnEl.style.zIndex = '10000';
    toggleBtnEl.innerText = 'Start Recording';
    document.body.appendChild(toggleBtnEl);

    return toggleBtnEl;
  },

  bindMethods() {
    this.toggleRecordingPlayPause = this.toggleRecordingPlayPause.bind(this);
  },

  addEventListeners() {
    this.toggleBtnEl.addEventListener(
      'click',
      this.toggleRecordingPlayPause,
      false
    );
  },

  removeEventListeners() {
    this.toggleBtnEl.removeEventListener(
      'click',
      this.toggleRecordingPlayPause
    );
  },

  toggleRecordingPlayPause() {
    if (this.isRecording) {
      gRecorder.stop();
      gRecorder.save();
      this.toggleBtnEl.innerText = 'Start Recording';
    } else {
      gRecorder.start();
      this.toggleBtnEl.innerText = 'Stop Recording';
    }
    this.isRecording = !this.isRecording;
  }
});
