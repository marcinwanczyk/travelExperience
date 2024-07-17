// const svgContainer = document.getElementById('svgContainer');
// const svgElement = document.getElementById('svg');
// let scale = 1;

// svgContainer.addEventListener('wheel', function(event){
//     event.preventDefault();

//     const zoomIntensity = 0.1;
//     if(event.deltaY < 0){
//         scale += zoomIntensity;
//     } else {
//         scale -= zoomIntensity;
//     }

//     scale = Math.min(Math.max(0.5, scale), 4);

//     const rect = svgElement.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;

//     svgElement.style.transform = 'scale(${scale})';
//     svgElement.style.transformOrigin = '${mouseX}px ${mouseY}px';
// });