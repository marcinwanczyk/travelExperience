// drag.js
function addDrag(svgElement) {
    // Variables for mouse drag functionality
    let isDragging = false;
    let startX, startY;
    let startViewX, startViewY;

    // Get the original full map dimensions
    const originalViewBox = svgElement.getAttribute('viewBox') || `0 0 ${svgElement.clientWidth} ${svgElement.clientHeight}`;
    const [originalX, originalY, originalWidth, originalHeight] = originalViewBox.split(' ').map(Number);

    // Base drag sensitivity (adjust this value as needed)
    const baseDragSensitivity = 1;

    // Add event listeners for mouse drag
    svgElement.addEventListener('mousedown', function (event) {
        if (event.button === 0) { // Left mouse button
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;

            // Get the current viewBox values
            const viewBox = svgElement.getAttribute('viewBox');
            const [viewX, viewY, viewWidth, viewHeight] = viewBox.split(' ').map(Number);
            startViewX = viewX;
            startViewY = viewY;

            // Change cursor to "grabbing" while dragging
            svgElement.style.cursor = 'grabbing';
        }
    });

    svgElement.addEventListener('mousemove', function (event) {
        if (isDragging) {
            // Get the current viewBox dimensions
            const viewBox = svgElement.getAttribute('viewBox');
            const [viewX, viewY, viewWidth, viewHeight] = viewBox.split(' ').map(Number);

            // Calculate the current zoom scale
            const zoomScale = originalWidth / viewWidth;

            // Adjust drag sensitivity based on the zoom scale
            const dragSensitivity = baseDragSensitivity / zoomScale;

            // Calculate the distance moved by the mouse
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            // Apply sensitivity scaling to the distance
            const scaledDx = dx * dragSensitivity;
            const scaledDy = dy * dragSensitivity;

            // Calculate new viewBox position
            let newViewX = startViewX - scaledDx;
            let newViewY = startViewY - scaledDy;

            // Prevent the viewBox from exceeding the map borders
            newViewX = Math.max(originalX, Math.min(newViewX, originalX + originalWidth - viewWidth));
            newViewY = Math.max(originalY, Math.min(newViewY, originalY + originalHeight - viewHeight));

            // Update the viewBox
            svgElement.setAttribute('viewBox', `${newViewX} ${newViewY} ${viewWidth} ${viewHeight}`);

            // Update the start position to ensure smooth dragging even at borders
            startX = event.clientX;
            startY = event.clientY;
            startViewX = newViewX;
            startViewY = newViewY;
        }
    });

    svgElement.addEventListener('mouseup', function (event) {
        if (event.button === 0) { // Left mouse button
            isDragging = false;

            // Reset cursor to default
            svgElement.style.cursor = 'grab';
        }
    });

    svgElement.addEventListener('mouseleave', function () {
        if (isDragging) {
            isDragging = false;

            // Reset cursor to default
            svgElement.style.cursor = 'grab';
        }
    });

    // Set initial cursor style
    svgElement.style.cursor = 'grab';
}