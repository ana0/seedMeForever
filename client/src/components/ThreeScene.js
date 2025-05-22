import React, { Component } from 'react';
import * as THREE from 'three';
import smoke from '../assets/Smoke-Element.png';
//import { apiUrl } from './../env';

import bird0 from '../assets/0.jpeg';
import bird1 from '../assets/1.jpeg';
import bird2 from '../assets/2.jpeg';
import bird3 from '../assets/3.jpeg';
import bird4 from '../assets/4.jpeg';
import bird5 from '../assets/5.jpeg';
import bird6 from '../assets/6.jpeg';
import bird7 from '../assets/7.jpeg';
import bird8 from '../assets/8.jpeg';
import bird9 from '../assets/9.jpeg';
import bird10 from '../assets/10.jpeg';
import bird11 from '../assets/11.jpeg';
import bird12 from '../assets/12.jpeg';
import bird13 from '../assets/13.jpeg';
import bird14 from '../assets/14.jpeg';
import bird15 from '../assets/15.jpeg';
import bird16 from '../assets/16.jpeg';
import bird17 from '../assets/17.jpeg';
import bird18 from '../assets/18.jpeg';
import bird19 from '../assets/19.jpeg';
import bird20 from '../assets/20.jpeg';
import bird21 from '../assets/21.jpeg';
import bird22 from '../assets/22.jpeg';
import bird23 from '../assets/23.jpeg';
import bird24 from '../assets/24.jpeg';
import bird25 from '../assets/25.jpeg';
import bird26 from '../assets/26.jpeg';
import bird27 from '../assets/27.jpeg';
import bird28 from '../assets/28.jpeg';
import bird29 from '../assets/29.jpeg';
import bird30 from '../assets/30.jpeg';
import bird31 from '../assets/31.jpeg';
import bird32 from '../assets/32.jpeg';
import bird33 from '../assets/33.jpeg';
import bird34 from '../assets/34.jpeg';
import bird35 from '../assets/35.jpeg';
import bird36 from '../assets/36.jpeg';
import bird37 from '../assets/37.jpeg';
import bird38 from '../assets/38.jpeg';
import bird39 from '../assets/39.jpeg';
import bird40 from '../assets/40.jpeg';

let birds = [bird0, bird1, bird2, bird3, bird4, bird5, bird6, bird7, bird8, bird9, bird10, bird11, bird12, bird13, bird14, bird15, bird16, bird17, bird18, bird19, bird20, bird21, bird22, bird23, bird24, bird25, bird26, bird27, bird28, bird29, bird30, bird31, bird32, bird33, bird34, bird35, bird36, bird37, bird38, bird39, bird40]

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

    //this.highestArchive = await this.getMax()
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
      //const picTexture = new THREE.TextureLoader().load(`${apiUrl}/archive/${id}`, (tex) => {
      const picTexture = new THREE.TextureLoader().load(birds[Math.floor(Math.random() * birds.length)], (tex) => {
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
        //animal.mesh.material.map = new THREE.TextureLoader().load(`${apiUrl}/archive/${this.random(1, this.highestArchive)}`, (tex) => {
        animal.mesh.material.map = new THREE.TextureLoader().load(birds[Math.floor(Math.random() * birds.length)], (tex) => {
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

  // getMax() {
  //   return fetch(`${apiUrl}/archive/max`, {
  //   method: "GET",
  //   headers: {
  //     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
  //   }})
  //     .then(response => {
  //       return response.json()
  //     })
  // }

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