function addZoom(svgElement) {
    let scale = 1;
    const zoomFactor = 0.1; 

    console.log(`Initial scale: ${scale}, zoomFactor: ${zoomFactor}`);

    svgElement.addEventListener('wheel', function(event) {
        event.preventDefault();
        const direction = event.deltaY < 0 ? 1 : -1;
        let newScale = scale + (zoomFactor * direction);
        newScale = Math.round(newScale * 10) / 10; 
        console.log(`Attempting to zoom, direction: ${direction}, newScale: ${newScale}`);

        if (newScale < 0.1) {
            console.log('Zoom limit reached');
        return;
        }

        const rect = svgElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        let viewBox = svgElement.getAttribute('viewBox');
        if (!viewBox) {
            viewBox = `0 0 ${svgElement.clientWidth} ${svgElement.clientHeight}`;
            svgElement.setAttribute('viewBox', viewBox);
        }
        let [viewX, viewY, viewWidth, viewHeight] = viewBox.split(' ').map(Number);

        const newViewWidth = viewWidth * (1 - zoomFactor * direction);
        const newViewHeight = viewHeight * (1 - zoomFactor * direction);
        const zoomCenterX = x / svgElement.clientWidth * viewWidth + viewX;
        const zoomCenterY = y / svgElement.clientHeight * viewHeight + viewY;

        viewX += (viewWidth - newViewWidth) * (zoomCenterX - viewX) / viewWidth;
        viewY += (viewHeight - newViewHeight) * (zoomCenterY - viewY) / viewHeight;

        svgElement.setAttribute('viewBox', `${viewX} ${viewY} ${newViewWidth} ${newViewHeight}`);
        scale = newScale;
        console.log(`Updated scale: ${scale}`);
    });
}