import { Group, AmbientLight, DirectionalLight } from 'three'

export default class BasicLights extends Group {
  constructor(gui) {
    super()

    const dir = new DirectionalLight(0xffffff, 1)
    dir.position.set(5, 10, 7.5)
    dir.lookAt(0, 0, 0)
    const ambi = new AmbientLight( 0x222222 , 5)
    this.add(ambi, dir)
    const light = gui.addFolder('光線')
    light.add(dir.position, 'x', -10, 10, 0.5).name('x位置')
    light.add(dir.position, 'y', -10, 10, 0.5).name('y位置')
    light.add(dir.position, 'z', -10, 10, 0.5).name('z位置')
    light.close()
  }
}
