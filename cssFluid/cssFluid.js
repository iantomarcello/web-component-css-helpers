export let cssFluid = (max, min, maxViewportWidth, minViewportWidth) => {
    return `calc(${min}px + (${max} - ${min}) * ((100vw - ${minViewportWidth}px)/(${maxViewportWidth} - ${minViewportWidth})))`;
};
