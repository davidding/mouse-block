(function() {
  const STORAGE_KEY = "mouseBlockEnabled"; // match background.js
  const LAYER_ID = "mouse-block-9474875377";
  const LAYER_CSS = `position: fixed !important;
    inset: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    z-index: 2147483647 !important;
    transform: none !important;
    cursor: not-allowed !important;`;

  /**
   * @param {Event} e
   */
  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * @returns {HTMLElement}
   */
  const createLayer = () => {
    const layer = document.createElement("div");
    layer.id = LAYER_ID;
    layer.style.cssText = LAYER_CSS;
    layer.onclick = blockEvent;
    layer.oncontextmenu = blockEvent;
    layer.onmousedown = blockEvent;
    layer.onmouseup = blockEvent;
    layer.onmouseover = blockEvent;
    layer.onwheel = blockEvent;
    return layer;
  };

  /**
   * @returns {HTMLElement}
   */
  const getLayer = () => {
    return document.getElementById(LAYER_ID) || createLayer();
  }

  /**
   *
   * @param {HTMLElement} layer
   * @returns {boolean}
   */
  const isLayerActive = (layer) => {
    return document.body.contains(layer);
  };

  /**
   * @param {HTMLElement} layer
   * @param {boolean=} active
   * @returns {void}
   */
  const toggleLayer = (layer, active) => {
    const currentlyActive = isLayerActive(layer);

    let shouldActivateLayer = !currentlyActive;

    if (typeof active === "boolean") {
      shouldActivateLayer = active;
    }

    if (shouldActivateLayer === currentlyActive) return;

    if (shouldActivateLayer) {
      document.body.append(layer);
    } else {
      layer.remove();
    }
  };

  chrome.storage.local.get(STORAGE_KEY, (result) => {
    const layer = getLayer();
    toggleLayer(layer, result[STORAGE_KEY]);
  });
}());
