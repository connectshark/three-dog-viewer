import {  Scene, AnimationMixer, Clock } from 'three'
import BasicLights from './basicLight'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class RaceScene extends Scene {
  constructor (gui) {
    super()
    const light = new BasicLights(gui)

    this.mixer = null
    this.anim = []
    this.animAction = 0
    this.stop = false
    new GLTFLoader().load('./dogv5.glb' , gltf => {
      const horseModel = gltf.scene
      horseModel.position.y = -1
      horseModel.scale.set(2, 2, 2)
      const rotationSetting = {
        x: 0,
        y: -0.5,
        z: 0
      }
      horseModel.rotation.x = rotationSetting.x
      horseModel.rotation.y = rotationSetting.y
      horseModel.rotation.z = rotationSetting.z

      this.add(horseModel)

      this.mixer = new AnimationMixer(horseModel)
      const clips = gltf.animations
      const anims = {}
      clips.forEach((clip, clipIndex) => {
        anims[clip.name] = () => {
          this.anim[this.animAction].stop()
          this.animAction = clipIndex
          this.anim[clipIndex].play()
          if (this.stop) {
            this.stop = false
            this.render()
          }
        }
        this.anim.push(this.mixer.clipAction(clip))
      })
      anims['none'] = () => {
        this.stop = true
      }

      const ro = gui.addFolder('起始轉向')
      ro.add(rotationSetting, 'y', -2, 2, 0.05).name('y軸').onChange(() => {
        horseModel.rotation.y = rotationSetting.y
      })
      ro.add(rotationSetting, 'x', -2, 2, 0.05).name('x軸').onChange(() => {
        horseModel.rotation.x = rotationSetting.x
      })
      ro.add(rotationSetting, 'z', -2, 2, 0.05).name('z軸').onChange(() => {
        horseModel.rotation.z = rotationSetting.z
      })
      ro.close()

      const skinBox = {
        skin: horseModel.children[1].material.color.getHex(),
        hair: horseModel.children[3].material.color.getHex()
      }

      const co = gui.addFolder('顏色')
      co.addColor(skinBox, 'skin').name('皮膚').onChange(value => {
        horseModel.children[1].material.color.set(value)
      })
      co.addColor(skinBox, 'hair').name('鬃毛').onChange(value => {
        horseModel.children[3].material.color.set(value)
      })

      const animFolder = gui.addFolder('動畫')
      Object.entries(anims).forEach(anim => {
        animFolder.add(anims, anim[0])
      })
      this.anim[this.animAction].play()
      this.render()
    })
    
    this.clock = new Clock()
    this.add(light)
  }
  render = () => {
    this.mixer.update( this.clock.getDelta() )
    if (!this.stop) {
      requestAnimationFrame(this.render)
    }
  }
}
