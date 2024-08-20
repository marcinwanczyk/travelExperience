window.addEventListener('DOMContentLoaded', function () {
    const svgElement = document.querySelector('#svgContainer');
    initializeViewBox(svgElement);
    if (!svgElement) {
        console.error('SVG not found');
        return;
    }

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    console.log('SVG Element:', svgElement);
    console.log('viewBox attribute:', svgElement.getAttribute('viewBox'));

    document.addEventListener('mousedown', (event) => {
        isDragging = true;
        const rect = svgElement.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
    });

    svgElement.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const rect = svgElement.getBoundingClientRect();
        const dx = event.clientX - rect.left - startX;
        const dy = event.clientY - rect.top - startY;

        const viewBoxAttr = svgElement.getAttribute('viewBox');
        if (!viewBoxAttr) {
            console.error('viewBox attribute is missing on the SVG element.');
            const defaultViewBox = `0 0 ${svgElement.clientWidth} ${svgElement.clientHeight}`;
            svgElement.setAttribute('viewBox', defaultViewBox);
            viewBoxAttr = defaultViewBox;
            return;
        }
        const viewBox = viewBoxAttr.split(' ').map(Number);

        let [viewX, viewY, viewWidth, viewHeight] = viewBox;
        viewX -= dx * (viewWidth / svgElement.clientWidth);
        viewY -= dy * (viewHeight / svgElement.clientHeight);

        svgElement.setAttribute('viewBox', `${viewX} ${viewY} ${viewWidth} ${viewHeight}`);

        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;

    });

    document.addEventListener('mouseup', (event) => {
        console.log('Mouse up detected at position:', event.clientX, event.clientY);
        isDragging = false;
    });

    svgElement.addEventListener('mouseleave', (event) => {
        isDragging = false;
    });
});

function initializeViewBox(svgElement) {
    let viewBoxAttr = svgElement.getAttribute('viewBox');
    if (!viewBoxAttr) {
        const defaultViewBox = `0 0 ${svgElement.clientWidth} ${svgElement.clientHeight}`;
        svgElement.setAttribute('viewBox', defaultViewBox);
    }
}