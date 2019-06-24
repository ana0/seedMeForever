import React, { Component } from 'react';
import * as THREE from 'three';
import smoke from '../assets/Smoke-Element.png';
import { apiUrl } from './../env'

class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.width = width;
    this.height = height;

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 1000

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#ffffff')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    this.clock = new THREE.Clock();

    const light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(-1,0,1);
    this.scene.add(light);

    this.smokeParticles = [];
    this.animals = []

    this.createSmoke();
    this.createAnimal();

    this.start()
  }

  createSmoke() {
    const smokeTexture = new THREE.TextureLoader().load(smoke);
    const smokeMaterial = new THREE.MeshLambertMaterial({color: 0xd3dbe8, map: smokeTexture, transparent: true});
    const smokeGeo = new THREE.PlaneGeometry(300, 300);
    for (let p = 0; p < 100; p++) {
      var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
      particle.position.set(Math.random()*500-250, Math.random()*500-250, Math.random()*1000-100);
      particle.rotation.z = Math.random() * 360;
      this.scene.add(particle);
      this.smokeParticles.push(particle);
    }
  }

  random(min, max) {
    var x = Math.abs(Math.sin(Math.random()));
    return Math.floor(x * (max - min) + min);
  }

  createAnimal() {
    const picGeo = new THREE.PlaneGeometry(300,300);
    THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
    let pic;
    const picTexture = new THREE.TextureLoader().load(`${apiUrl}/archive/1`, (tex) => {
      tex.needsUpdate = true;
      pic.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
    });
    //const picMaterial = new THREE.MeshLambertMaterial({color: 0xbbffff, opacity: 1, map: picTexture, transparent: true})
    const picMaterial = new THREE.MeshLambertMaterial({color: 0xbbffff, opacity: 1, map: picTexture, transparent: true, blending: THREE.AdditiveBlending})
    pic = new THREE.Mesh(picGeo,picMaterial);
    pic.position.z = 800;
    var randx = this.random((this.width/6) * -1, this.width/6);
    var randy = this.random((this.height/6) * -1, this.height/6);
    pic.position.x = randx;
    pic.position.y = randy;
    this.animals.push({ mesh: pic, opacity: .0001, lastOpacity: 0 })
    this.scene.add(pic);
  }

  evolveSmoke() {
    var sp = this.smokeParticles.length;
    while(sp--) {
      this.smokeParticles[sp].rotation.z += (this.delta * 0.2);
    }
  }

  fadeAnimals() {
    var sp = this.animals.length;
    while(sp--) {
      if (this.animals[sp].opacity >= 1) {
        this.animals[sp].lastOpacity = 1
        this.animals[sp].opacity = 0.99
      } else if (this.animals[sp].opacity <= 0) {
        this.scene.remove( this.animals[sp] );
        this.animals.splice(sp, 1)
        break;
      } else if (this.animals[sp].opacity > this.animals[sp].lastOpacity
          || this.animals[sp].opacity === this.animals[sp].lastOpacity
        ) {
        this.animals[sp].lastOpacity = this.animals[sp].opacity;
        this.animals[sp].opacity += (this.delta * 0.2);
      } else {
        this.animals[sp].lastOpacity = this.animals[sp].opacity;
        this.animals[sp].opacity -= (this.delta * 0.2);
      }
      this.animals[sp].mesh.material.opacity = this.animals[sp].opacity
    }
  }

  render() {
    this.renderer.render( this.scene, this.camera );
   
  }

  componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    // note: three.js includes requestAnimationFrame shim
    this.delta = this.clock.getDelta();
    requestAnimationFrame( this.animate );
    this.evolveSmoke();
    this.fadeAnimals();
    if (Math.floor(Math.random() * 100) % 100 === 0) { this.createAnimal() }
    this.renderScene();
 }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render(){
    return(
      <div
        style={{
          width: '100%',
          height: '100%',
          left: "0px",
          marginTop: "-8px",
          position: 'fixed' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ThreeScene