function addZoom(svgElement) {
  let scale = 1;
  const zoomFactor = 0.1; // Zoom sensitivity
  const minScale = 0.1; // Minimum zoom level
  const maxScale = 7; // Maximum zoom level

  console.log(`Initial scale: ${scale}, zoomFactor: ${zoomFactor}`);

  // Get the original full map dimensions
  const originalViewBox =
    svgElement.getAttribute("viewBox") ||
    `0 0 ${svgElement.clientWidth} ${svgElement.clientHeight}`;
  const [originalX, originalY, originalWidth, originalHeight] = originalViewBox
    .split(" ")
    .map(Number);

  svgElement.addEventListener("wheel", function (event) {
    event.preventDefault();

    const direction = event.deltaY < 0 ? 1 : -1; // Determine zoom in (+1) or out (-1)
    let newScale = scale + zoomFactor * direction;

    // Clamp the scale between minScale and maxScale
    if (newScale < minScale) {
      newScale = minScale;
    } else if (newScale > maxScale) {
      newScale = maxScale;
    }

    // If scale didn't change, stop execution
    if (newScale === scale) {
      console.log("Zoom limit reached");
      return;
    }

    let viewBox = svgElement.getAttribute("viewBox");
    if (!viewBox) {
      viewBox = `0 0 ${svgElement.clientWidth} ${svgElement.clientHeight}`;
      svgElement.setAttribute("viewBox", viewBox);
    }

    let [viewX, viewY, viewWidth, viewHeight] = viewBox.split(" ").map(Number);

    // Calculate the center of the current `viewBox`
    const centerX = viewX + viewWidth / 2;
    const centerY = viewY + viewHeight / 2;

    if (direction > 0) {
      // Zooming in: adjust viewBox relative to mouse pointer
      const rect = svgElement.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const zoomCenterX = (mouseX / svgElement.clientWidth) * viewWidth + viewX;
      const zoomCenterY =
        (mouseY / svgElement.clientHeight) * viewHeight + viewY;

      const newViewWidth = viewWidth * (1 - zoomFactor);
      const newViewHeight = viewHeight * (1 - zoomFactor);

      viewX += ((viewWidth - newViewWidth) * (zoomCenterX - viewX)) / viewWidth;
      viewY +=
        ((viewHeight - newViewHeight) * (zoomCenterY - viewY)) / viewHeight;

      viewWidth = newViewWidth;
      viewHeight = newViewHeight;
    } else {
      // Zooming out: adjust viewBox relative to the global center of the map

      const newViewWidth = viewWidth * (1 + zoomFactor);
      const newViewHeight = viewHeight * (1 + zoomFactor);

      viewX = centerX - newViewWidth / 2;
      viewY = centerY - newViewHeight / 2;

      viewWidth = newViewWidth;
      viewHeight = newViewHeight;
    }

    // Update the viewBox and scale
    svgElement.setAttribute(
      "viewBox",
      `${viewX} ${viewY} ${viewWidth} ${viewHeight}`
    );
    scale = newScale;

    console.log(
      `Zoom event: direction=${direction}, scale=${scale}, viewBox=${viewX} ${viewY} ${viewWidth} ${viewHeight}`
    );
  });
}
