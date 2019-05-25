import React from "react"
import * as THREE from "three"
import debounce from "lodash/debounce"
import DeviceOrientationController from "../lib/DeviceOrientationController"
import sphereGeometry from "../assets/peels_d25.json"
import henText from "../assets/henText.png"
import ima from "../assets/Selected_Poster.png"
import hen from "../assets/hen.jpg"
import selText from "../assets/selText.png"
import { withStyles } from "@material-ui/core"

const styles = {
  animationRoot: {
    background: "linear-gradient(45deg, blue 30%, green 90%)",
    opacity: 0.8,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    height: [["100%"], "!important"],
    width: [["100%"], "!important"],
  },
}

let playing = false
let renderer,
  scene,
  camera,
  planet,
  controls,
  mesh,
  mesh2,
  mesh3,
  mesh4,
  orbit,
  orbit2,
  orbit3,
  orbit4

const initScene = function() {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(111, 1, 0.1, 100)
  // TEXTURES
  const loader2 = new THREE.TextureLoader()
  const texture = loader2.load(ima, tex => {
    tex.needsUpdate = true
    console.log("texture.width:", tex.image.height)
    mesh.scale.set(1.0, tex.image.height / tex.image.width, 1.0)
  })
  const texture2 = loader2.load(henText, tex => {
    tex.needsUpdate = true
    tex.premultiplyAlpha = false
    mesh2.scale.set(1.0, tex.image.height / tex.image.width, 1.0)
  })
  const texture3 = loader2.load(hen, tex => {
    tex.needsUpdate = true
    tex.premultiplyAlpha = false
    mesh3.scale.set(1.0, tex.image.height / tex.image.width, 1.0)
  })
  const texture4 = loader2.load(selText, tex => {
    tex.needsUpdate = true
    tex.premultiplyAlpha = false
    mesh4.scale.set(1.0, tex.image.height / tex.image.width, 1.0)
  })
  // MATERIALS
  var material = new THREE.MeshBasicMaterial({ map: texture })
  var material2 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture2,
    transparent: true,
    alphaTest: 0.05,
  })
  var material3 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture3,
    transparent: true,
    alphaTest: 0.05,
  })
  var material4 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture4,
    transparent: true,
    alphaTest: 0.05,
  })
  // GEOMETRIES
  const geometry = new THREE.PlaneGeometry(20, 20)
  const geometry2 = new THREE.PlaneGeometry(20, 20)
  const geometry3 = new THREE.PlaneGeometry(20, 20)
  const geometry4 = new THREE.PlaneGeometry(20, 20)
  // COMBINING
  mesh = new THREE.Mesh(geometry, material)
  mesh2 = new THREE.Mesh(geometry2, material2)
  mesh3 = new THREE.Mesh(geometry3, material3)
  mesh4 = new THREE.Mesh(geometry4, material4)
  // POSITIONS
  mesh.position.set(15.2, 0, 0)
  mesh2.position.set(10.2, 17, 0)
  mesh3.position.set(10.2, 0, 0)
  mesh4.position.set(10.2, -10, 0)

  // The TRAVEL PATH
  let geom = new THREE.CircleGeometry(15.2, 100)
  let geom2 = new THREE.CircleGeometry(10.2, 100)
  let geom3 = new THREE.CircleGeometry(10.2, 100)
  let geom4 = new THREE.CircleGeometry(10.2, 100)
  // LINE
  let circle = new THREE.Line(
    geom,
    new THREE.LineDashedMaterial({ color: "aqua" })
  )
  let circle2 = new THREE.Line(
    geom2,
    new THREE.LineDashedMaterial({ color: "aqua" })
  )
  let circle3 = new THREE.Line(
    geom3,
    new THREE.LineDashedMaterial({ color: "aqua" })
  )
  let circle4 = new THREE.Line(
    geom4,
    new THREE.LineDashedMaterial({ color: "aqua" })
  )
  circle2.rotation.x = Math.PI * 5.5

  orbit = new THREE.Group()
  orbit2 = new THREE.Group()
  orbit3 = new THREE.Group()
  orbit4 = new THREE.Group()
  orbit.add(circle)
  orbit2.add(circle2)
  orbit3.add(circle3)
  orbit4.add(circle4)

  orbit.add(mesh)
  orbit2.add(mesh2)
  orbit3.add(mesh3)
  orbit4.add(mesh4)

  let orbitDir = new THREE.Group()
  let orbitDir2 = new THREE.Group()
  let orbitDir3 = new THREE.Group()
  let orbitDir4 = new THREE.Group()
  orbitDir.rotation.x = 0.15
  orbitDir.add(orbit)
  orbitDir2.add(orbit2)
  orbitDir3.add(orbit3)
  orbitDir4.add(orbit4)

  const planetGeometry = new THREE.BufferGeometry()

  const subjectGeometry = new THREE.IcosahedronGeometry(10, 1)
  const subjectMaterial = new THREE.MeshStandardMaterial({
    color: "#000",
    transparent: true,
    side: THREE.DoubleSide,
  })

  const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial)
  const subjectWireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(subjectGeometry),
    new THREE.LineBasicMaterial()
  )

  planetGeometry.setIndex(
    new THREE.BufferAttribute(
      Uint32Array.from(sphereGeometry.data.index.array),
      1
    )
  )

  planetGeometry.addAttribute(
    "position",
    new THREE.BufferAttribute(
      Float32Array.from(sphereGeometry.data.attributes.position.array),
      3
    )
  )

  planet = new THREE.LineSegments(
    planetGeometry,
    new THREE.LineBasicMaterial({
      color: 0xa2b5cd,
    })
  )

  camera.position.z = 0

  controls = new DeviceOrientationController(camera, renderer.domElement)

  controls.connect({ pan: false })

  scene.add(orbitDir, orbitDir2, orbitDir3, orbitDir4)
}

export function setRenderer({ canvas }) {
  return (renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
  }))
}

export function onResize({ width, height }) {
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  if (renderer) renderer.setSize(width, height)
}

function onRender() {
  planet.rotation.x += 1.5e-4
  // mesh.position.x = 5 * Math.cos(t) + 0
  // mesh.rotation.x += 35.5e-4
  // orbit.rotation.y += 35.5e-4
  orbit.rotation.y += 0.002
  orbit2.rotation.y -= 0.002
  orbit3.rotation.y -= 0.002
  orbit4.rotation.y += 0.002
  mesh.lookAt(camera.position)
  mesh2.lookAt(camera.position)
  mesh3.lookAt(camera.position)
  mesh4.lookAt(camera.position)
  controls.update()
  renderer.render(scene, camera)
}

function render() {
  onRender()
  if (playing) {
    requestAnimationFrame(render)
    // console.log(mesh)
  }
}

export function play() {
  playing = true
  render()
}

export function pause() {
  playing = false
}

class IntroScene extends React.Component {
  constructor(props) {
    super(props)
    this.animationRoot = React.createRef()
    this.onResize = debounce(this._onResize, 200).bind(this)
  }
  imgEl = React.createRef()

  playIntroAnimation() {
    play()
  }

  track() {
    console.log("bam")
  }
  _onResize() {
    const depth = window.devicePixelRatio

    // const dims = this.animationRoot.current.getBoundingClientRect()
    // const width = dims.width * depth
    // const height = dims.height * depth
    // onResize({ width, height })

    if (this.animationRoot.current !== null) {
      const dims = this.animationRoot.current.getBoundingClientRect()
      const width = dims.width * depth
      const height = dims.height * depth
      onResize({ width, height })
    } else {
      console.log("animation root is null")
    }
  }

  componentDidMount() {
    setRenderer({ canvas: this.animationRoot.current })
    initScene()
    window.addEventListener("resize", this.onResize)
    this._onResize()
    this.playIntroAnimation()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize)
    console.log("component Unmount was called in the dungeons")
  }

  render() {
    const { classes } = this.props

    return <canvas ref={this.animationRoot} className={classes.animationRoot} />
  }
}

export default withStyles(styles)(IntroScene)
