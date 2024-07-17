function loadSVG(url, containerID){
    fetch(url).then(response => response.text()).then(svg => {
         document.getElementById(containerID).innerHTML = svg;
    }).catch(error => console.error("error loading svg file: ", error));
}