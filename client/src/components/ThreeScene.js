import React, { Component } from 'react';
import * as THREE from 'three';
import smoke from '../assets/Smoke-Element.png';
import { apiUrl } from './../env';

class ThreeScene extends Component{
  async componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.width = width;
    this.height = height;

    this.highestArchive = 1;
    this.maxDisplays = 6;

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

    this.smokeTexture = new THREE.TextureLoader().load(smoke);
    this.smokeMaterial = new THREE.MeshLambertMaterial({color: 0xd3dbe8, map: this.smokeTexture, transparent: true});
    this.planeGeo = new THREE.PlaneGeometry(300, 300);

    this.createSmoke();

    this.highestArchive = await this.getMax()
    this.createAnimals(this.highestArchive);

    this.start()
  }

  createSmoke() {
    for (let p = 0; p < 100; p++) {
      const particle = new THREE.Mesh(this.planeGeo, this.smokeMaterial);
      particle.position.set(Math.random()*500-250, Math.random()*500-250, Math.random()*1000-100);
      particle.rotation.z = Math.random() * 360;
      this.scene.add(particle);
      this.smokeParticles.push(particle);
    }
  }

  createAnimals(id) {
    for (let p = 0; p < 5; p++) {
      let pic;
      THREE.ImageUtils.crossOrigin = '';
      const picTexture = new THREE.TextureLoader().load(`${apiUrl}/archive/${id}`, (tex) => {
        tex.needsUpdate = true;
        pic.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
      });
      const picMaterial = new THREE.MeshLambertMaterial({color: 0xbbffff, opacity: 0, map: picTexture, transparent: true, blending: THREE.AdditiveBlending})
      pic = new THREE.Mesh(this.planeGeo, picMaterial);
      pic.position.z = 800;
      const randx = this.random((this.width/6) * -1, this.width/6);
      const randy = this.random((this.height/6) * -1, this.height/6);
      pic.position.x = randx;
      pic.position.y = randy;
      this.animals.push({
        mesh: pic,
        opacity: .0001,
        lastOpacity: 0,
        period: this.random(50, 600)
      })
      this.scene.add(pic);
    }
  }

  evolveAnimals() {
    let sp = this.animals.length;
    while(sp--) {
      const animal = this.animals[sp];
      if (animal.period !== 0) {
        animal.period -= 1;
        break;
      }
      if (animal.opacity <= 0) {
        const randx = this.random((this.width/6) * -1, this.width/6);
        const randy = this.random((this.height/6) * -1, this.height/6);
        animal.mesh.position.x = randx;
        animal.mesh.position.y = randy;
        animal.mesh.material.map.dispose();
        animal.mesh.material.map = new THREE.TextureLoader().load(`${apiUrl}/archive/${this.random(1, this.highestArchive)}`, (tex) => {
          tex.needsUpdate = true;
          animal.mesh.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
        });
        animal.opacity = .0001;
        animal.lastOpacity = 0;
        animal.period = this.random(50, 600)
        break;
      }
      if (animal.opacity >= 1) {
        animal.lastOpacity = 1
        animal.opacity = 0.99
      } else if (animal.opacity > animal.lastOpacity
          || animal.opacity === animal.lastOpacity
        ) {
        animal.lastOpacity = animal.opacity;
        animal.opacity += (this.delta * 0.2);
      } else {
        animal.lastOpacity = animal.opacity;
        animal.opacity -= (this.delta * 0.2);
      }
      animal.mesh.material.opacity = animal.opacity
    }
  }

  random(min, max) {
    const x = Math.abs(Math.sin(Math.random()));
    return Math.floor(x * (max - min) + min);
  }

  getRand() {
    const rand = Math.floor(Math.random() * (this.highestArchive)) + 1;
    return rand;
  }

  getMax() {
    return fetch(`${apiUrl}/archive/max`, {
    method: "GET",
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }})
      .then(response => {
        return response.json()
      })
  }

  evolveSmoke() {
    let sp = this.smokeParticles.length;
    while(sp--) {
      this.smokeParticles[sp].rotation.z += (this.delta * 0.2);
    }
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
    this.delta = this.clock.getDelta();
    requestAnimationFrame( this.animate );
    this.evolveSmoke();
    this.evolveAnimals();
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