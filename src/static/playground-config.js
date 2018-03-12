const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const baseWidth = 640;
const baseHeight = 360;
const scale = Math.min(Math.floor(windowWidth / baseWidth), Math.floor(windowHeight / baseHeight));

export const PLAYGROUND_CONFIG = {
    smoothing: false,
    background: "#000000",
    scale: scale,
    width: baseWidth,
    height: baseHeight,
    paths: {
        base: "src/assets/",
        images: "images/",
        sounds: "sounds/",
        fonts: "fonts/",
        atlases: "atlases/"
    },
};
