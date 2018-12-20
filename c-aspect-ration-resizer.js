AFRAME.registerComponent('c-aspect-ration-resizer', {
  init() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const objDepth = 1000;
    const camFov = 80;

    const objHeight = Math.tan(THREE.Math.degToRad(camFov / 2)) * objDepth * 2;
    const objWidth = (objHeight * windowWidth) / windowHeight;
    this.el.setAttribute('height', objHeight);
    this.el.setAttribute('width', objWidth);
    this.el.setAttribute('position', '0 1.6 -' + objDepth);
  }
});
