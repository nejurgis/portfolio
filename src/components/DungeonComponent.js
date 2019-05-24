import React from "react"
import * as THREE from "three"
import debounce from "lodash/debounce"
import DeviceOrientationController from "../lib/DeviceOrientationController"
import sphereGeometry from "../assets/peels_d25.json"
import ima from "../assets/sc.png"
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
let renderer, scene, camera, planet, controls, group

const initScene = function() {
  var curve = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    20,
    10, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    1 // aRotation
  )

  const loader = new THREE.TextureLoader()
  const texture = loader.load(ima)
  var points = curve.getPoints(50)
  var geometry2 = new THREE.ShapeGeometry().setFromPoints(points)

  var material = new THREE.MeshStandardMaterial({
    map: texture,

    // colorWrite: false,
  })

  // Create the final object to add to the scene
  var ellipse = new THREE.Line(geometry2, material)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(111, 1, 0.1, 100)

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

  var material = new THREE.MeshBasicMaterial({ map: texture })
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const geometry = new THREE.PlaneBufferGeometry(1, 1, 1)
  const mesh = new THREE.Mesh(geometry, material)

  // mesh.on("click", e => {
  //   console.log("event", e)
  // })
  camera.position.z = 0
  mesh.position.x = 1
  // mesh.position.y = 1
  // mesh.position.z = 1

  controls = new DeviceOrientationController(camera, renderer.domElement)
  console.log("renderer.domElement:", mesh.domElement)
  controls.connect({ pan: false })

  scene.add(mesh, planet, ellipse)
}

function track() {
  console.log("bam")
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
  planet.rotation.x += 2.5e-4
  controls.update()
  renderer.render(scene, camera)
}

function render() {
  onRender()
  if (playing) requestAnimationFrame(render)
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
