let isMouseDown = false;
let startX, startY;
const canvasContainer = document.querySelector('.right')

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

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)
canvasContainer.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(6, 60, 60),
    new THREE.MeshBasicMaterial
        ({ map: new THREE.TextureLoader().load('/img/globe.jpg') }))
scene.add(sphere)

// const glowMap = new THREE.TextureLoader().load('/img/ring1.png')
// const glowMaterial = new THREE.MeshBasicMaterial({ map: glowMap, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending })
// const glowMesh = new THREE.Mesh(new THREE.SphereGeometry(5.2, 50, 50), glowMaterial)
// scene.add(glowMesh) 

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

camera.position.z = 20

canvasContainer.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;
});

canvasContainer.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        sphere.rotation.y += dx * 0.005;
        sphere.rotation.x += dy * 0.005;
        startX = event.clientX;
        startY = event.clientY;
    }
});

canvasContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
});

function animate() {
    requestAnimationFrame(animate)
    sphere.rotation.y += 0.001
    renderer.render(scene, camera)
}
animate()
