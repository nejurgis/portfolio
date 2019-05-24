import * as THREE from "three"
import alphaTexture from "../../assets/sc.png"
import sphereGeometry from "../../assets/peels_d25.json"

export default scene => {
  const group = new THREE.Group()

  const subjectGeometry = new THREE.IcosahedronGeometry(10, 2)

  const subjectMaterial = new THREE.MeshStandardMaterial({
    color: "#000",
    transparent: true,
    side: THREE.DoubleSide,
    alphaTest: 0.5,
  })
  subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture)
  subjectMaterial.alphaMap.magFilter = THREE.NearestFilter
  subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping
  subjectMaterial.alphaMap.repeat.y = 1

  const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial)

  const subjectWireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(subjectGeometry),
    new THREE.LineBasicMaterial()
  )

  const loader = new THREE.TextureLoader()
  const texture = loader.load(alphaTexture)
  var material = new THREE.MeshBasicMaterial({ map: texture })
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const geometry = new THREE.PlaneBufferGeometry(10, 10, 1)
  const mesh = new THREE.Mesh(geometry, material)
  console.log("mesh position", mesh.position)

  const planetGeometry = new THREE.BufferGeometry()

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

  const planet = new THREE.LineSegments(
    planetGeometry,
    new THREE.LineBasicMaterial({
      color: 0xa2b5cd,
    })
  )

  group.add(subjectMesh)
  group.add(subjectWireframe)
  group.addEventListener("mouseover", console.log("hello"))
  mesh.position.x = 30
  mesh.position.y = 10
  mesh.position.z = 10
  mesh.rotation.x = Math.PI / 1
  scene.add(group, mesh, planet)

  group.rotation.z = Math.PI / 4

  const speed = 0.02
  const textureOffsetSpeed = 0.02

  function deformGeometry(geometry) {
    for (let i = 0; i < geometry.vertices.length; i += 2) {
      const scalar = 1 + Math.random() * 0.8
      geometry.vertices[i].multiplyScalar(scalar)
    }

    return geometry
  }

  function update(time) {
    const angle = time * speed

    group.rotation.y = angle

    subjectMaterial.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed

    subjectWireframe.material.color.setHSL(Math.sin(angle * 2), 0.5, 0.5)

    const scale = (Math.sin(angle * 8) + 6.4) / 5
    subjectWireframe.scale.set(scale, scale, scale)
  }

  return {
    update,
  }
}
