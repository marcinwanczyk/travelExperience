let isMouseDown = false;
let startX, startY;
const canvasContainer = document.querySelector('#canvas-container')

const scene = new THREE.Scene()
const camera = new THREE.
    PerspectiveCamera(
        75,
        canvasContainer.offsetWidth / canvasContainer.offsetHeight,
        0.1,
        1000)
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true,
        canvas: document.querySelector('canvas')
    }
);

// renderer.setSize(innerWidth, innerHeight)
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)
// document.getElementById('threejs').appendChild(renderer.domElement)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial
        ({ map: new THREE.TextureLoader().load('/img/globe.jpg') }))
scene.add(sphere)

const glowMap = new THREE.TextureLoader().load('/img/ring1.png')
const glowMaterial = new THREE.MeshBasicMaterial({ map: glowMap, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending})
const glowMesh = new THREE.Mesh(new THREE.SphereGeometry(5.2, 50, 50), glowMaterial)
// scene.add(glowMesh) 

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.set(5, 3, 5)
scene.add(pointLight)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff })

const starVertices = []
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = (Math.random() - 0.5) * 2000
    starVertices.push(x, y, z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

// scene.background = new THREE.Color(0x000000)
camera.position.z = 20

addEventListener('mousedown', (event) => {
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;
});

addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        sphere.rotation.y += dx * 0.005;
        sphere.rotation.x += dy * 0.005;
        startX = event.clientX;
        startY = event.clientY;
    }
});

addEventListener('mouseup', () => {
    isMouseDown = false;
});

function animate() {
    requestAnimationFrame(animate)
    // sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.001
    // group.rotation.y += mouse.x 
    // sphere.position.x = mouse.x * 10
    // sphere.position.y = mouse.y * 10
    renderer.render(scene, camera)
}
animate()
