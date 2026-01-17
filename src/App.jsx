import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './App.css'

function GeometryMesh({ g }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  const { type, size, color, position } = g

  let geometry = null
  if (type === 'sphere') geometry = <sphereGeometry args={[size, 32, 32]} />
  if (type === 'box') geometry = <boxGeometry args={[size, size, size]} />
  if (type === 'cone') geometry = <coneGeometry args={[size, size * 1.6, 32]} />
  if (type === 'cylinder') geometry = <cylinderGeometry args={[size, size, size * 1.6, 32]} />
  if (type === 'torus') geometry = <torusGeometry args={[size, size * 0.4, 16, 100]} />

  return (
    <mesh ref={meshRef} position={position} castShadow>
      {geometry}
      <meshPhongMaterial color={color} specular={0x888888} shininess={60} />
    </mesh>
  )
}

function Controls() {
  const controlsRef = useRef()
  const { camera, gl } = useThree()

  useEffect(() => {
    const controls = new ThreeOrbitControls(camera, gl.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 30
    controlsRef.current = controls
    return () => {
      controls.dispose()
      controlsRef.current = null
    }
  }, [camera, gl])

  useFrame(() => {
    if (controlsRef.current) controlsRef.current.update()
  })

  return null
}

function App() {
  const [geometries, setGeometries] = useState([
    { id: 1, type: 'sphere', size: 1.2, color: '#2a9df4', position: [0, 0, 0] },
  ])

  const [type, setType] = useState('sphere')
  const [size, setSize] = useState(1)
  const [color, setColor] = useState('#ff6b6b')

  function addGeometry() {
    const id = Date.now()
    const pos = [ (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 4 ]
    setGeometries(g => [...g, { id, type, size: Number(size), color, position: pos }])
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.25} />
        <hemisphereLight skyColor={0xffffbb} groundColor={0x080820} intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {geometries.map(g => (
          <GeometryMesh key={g.id} g={g} />
        ))}
        <Controls />
      </Canvas>

      <div className="ui-panel">
        <h4>Add Geometry</h4>
        <label>Type</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="sphere">Sphere</option>
          <option value="box">Box</option>
          <option value="cone">Cone</option>
          <option value="cylinder">Cylinder</option>
          <option value="torus">Torus</option>
        </select>

        <label>Size</label>
        <input type="number" min="0.1" step="0.1" value={size} onChange={e => setSize(e.target.value)} />

        <label>Color</label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />

        <button onClick={addGeometry}>Add to Scene</button>
      </div>
    </div>
  )
}

export default App