export let cssFluid = (max: number, min: number, maxViewportWidth: number, minViewportWidth: number) => {
	return `calc(${min}px + (${max} - ${min}) * ((100vw - ${minViewportWidth}px)/(${maxViewportWidth} - ${minViewportWidth})))`;
}
