export let cssCustomProperty = (prop) => {
    return window.getComputedStyle(document.body).getPropertyValue(prop);
};
