import { PerspectiveCamera, WebGLRenderer, Vector2 } from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import RaceScene from './scene'

export default class GAME {
  constructor () {
    /**
     * 旋轉係數 數值大則轉動效果越明顯
     */
    const setting = {
      ROTATE_FACTOR: 0.0015
    }
    const gui = new GUI({
      title: '控制面板'
    })
    const factor = gui.addFolder('轉動幅度')
    factor.add(setting, 'ROTATE_FACTOR', 0.00001, 0.00900, 0.00001).name('轉動係數')

    const scene = new RaceScene(gui)
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    
    const renderer = new WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: true,
      canvas: document.querySelector('canvas.webgl')
    })
    
    const mouse = new Vector2()
    const target = new Vector2()
    
    const bg = {
      color: 0x7ec0ee
    }
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x7ec0ee, 1)
    camera.position.z = 5
    gui.addColor(bg, 'color').name('背景').onChange(value => {
      renderer.setClearColor(value, 1)
    })
    
    function animate() {
      target.x = ( 1 + mouse.x ) * setting.ROTATE_FACTOR
      target.y = ( 1 + mouse.y ) * setting.ROTATE_FACTOR
      scene.rotation.x += 0.05 * ( target.y - scene.rotation.x )
      scene.rotation.y += 0.05 * ( target.x - scene.rotation.y )
      renderer.render( scene, camera )
      requestAnimationFrame( animate )
    }
    
    const windowResizeHanlder = () => {
      const { innerHeight, innerWidth } = window
      renderer.setSize(innerWidth, innerHeight)
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }
    
    const mouseHandler = e => {
      mouse.x = ( e.clientX - window.innerWidth / 2 );
      mouse.y = ( e.clientY - window.innerHeight / 2 );
    }
    
    animate()
    windowResizeHanlder()
    window.addEventListener('resize', windowResizeHanlder)
    window.addEventListener('mousemove', mouseHandler)
  }
}