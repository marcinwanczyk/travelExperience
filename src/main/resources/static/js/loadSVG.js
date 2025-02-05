function loadSVG(url, containerID) {
    fetch(url).then(response => response.text()).then(svg => {
        document.getElementById(containerID).innerHTML = svg;
        const svgElement = document.querySelector('#' + containerID + ' svg');
        addZoom(svgElement);
        addDrag(svgElement);
    }).catch(error => console.error("error loading svg file: ", error));
}
    loadSVG("svg/world.svg", "svgContainer");
