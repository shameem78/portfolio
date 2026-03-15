import { useEffect, useRef, memo } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 1800

const PALETTE = [
  new THREE.Color('#ffaf37'), // golden  — 20%
  new THREE.Color('#c1b9a4'), // beige   — 45%
  new THREE.Color('#ece4d5'), // cream   — 35%
]

const vertexShader = /* glsl */`
  attribute vec3 aRandom;

  uniform float uTime;
  uniform float uScrollY;
  uniform float uScrollPct;
  uniform float uSize;

  varying vec3 vColor;

  void main() {
    vColor = color;
    vec3 pos = position;

    // Idle wave — per-particle independent oscillation
    float speed = aRandom.z * 0.35;
    pos.x += sin(uTime * speed        + aRandom.x) * 0.55;
    pos.y += cos(uTime * speed * 0.7  + aRandom.y) * 0.45;
    pos.z += sin(uTime * speed * 0.5  + aRandom.x + aRandom.y) * 0.25;

    // Scroll parallax — upward drift, depth-modulated
    float rate = 0.009 + (position.z / 12.0) * 0.005;
    pos.y += uScrollY * rate;

    // Vertical wrap — particles re-enter from bottom
    pos.y = mod(pos.y + 9.0, 18.0) - 9.0;

    // Scroll wave distortion — deepens with scroll progress
    pos.x += sin(pos.y * 1.8 + uTime * 0.4 + aRandom.x) * (uScrollPct * 0.75);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (65.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */`
  varying vec3 vColor;

  void main() {
    vec2  coord = gl_PointCoord - vec2(0.5);
    float dist  = length(coord);
    if (dist > 0.5) discard;

    float alpha   = pow(1.0 - smoothstep(0.0, 0.5, dist), 1.6);
    float b       = max(vColor.r, max(vColor.g, vColor.b));
    float opacity = mix(0.28, 0.12, clamp(b - 0.68, 0.0, 1.0));

    gl_FragColor = vec4(vColor, alpha * opacity);
  }
`

function buildScene() {
  // Geometry
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors    = new Float32Array(PARTICLE_COUNT * 3)
  const randoms   = new Float32Array(PARTICLE_COUNT * 3)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3
    positions[i3]     = (Math.random() - 0.5) * 28
    positions[i3 + 1] = (Math.random() - 0.5) * 18
    positions[i3 + 2] = (Math.random() - 0.5) * 12

    const r = Math.random()
    const c = r < 0.20 ? PALETTE[0] : r < 0.65 ? PALETTE[1] : PALETTE[2]
    colors[i3] = c.r; colors[i3+1] = c.g; colors[i3+2] = c.b

    randoms[i3]     = Math.random() * Math.PI * 2
    randoms[i3 + 1] = Math.random() * Math.PI * 2
    randoms[i3 + 2] = Math.random() * 2 + 0.5
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('aRandom',  new THREE.BufferAttribute(randoms, 3))

  const uniforms = {
    uTime:      { value: 0 },
    uScrollY:   { value: 0 },
    uScrollPct: { value: 0 },
    uSize:      { value: 1.9 },
  }

  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geo, mat)
  const scene  = new THREE.Scene()
  scene.add(points)

  return { scene, uniforms }
}

export default memo(function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 10

    // Scene + particles
    const { scene, uniforms } = buildScene()

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    const clock = new THREE.Clock()
    let rafId
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const scrollY   = window.scrollY
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      uniforms.uTime.value      = clock.getElapsedTime()
      uniforms.uScrollY.value   = scrollY
      uniforms.uScrollPct.value = scrollY / maxScroll
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
})
