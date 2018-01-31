import * as PLAYGROUND from './static/playground.js';
import {
    ANIMATIONS
} from './static/animations';
import {
    PLAYGROUND_CONFIG
} from './static/playground-config';

// eslint-disable-next-line no-unused-vars
let t = 0;
const entity = (x = 0, y = 0, components = {}) => ({
    x,
    y,
    components
});

const app = new PLAYGROUND.Application(Object.assign(PLAYGROUND_CONFIG, {
    create: () => {
        app.entities = [
            entity(0, 0, {
                'animation': {
                    speed: 40,
                    id: 'walker',
                    frameIndex: 0,
                    frame: 0,
                    timestamp: 0,
                    state: 'walkingDown'
                }
            })
        ];
        app.entities.forEach(entity => {
            //Load animation atlases
            const animation = entity.components.animation;
            if (animation) {
                app.loadAtlas(animation.id);
            }
        });
    },
    resize: () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const baseWidth = 320;
        const baseHeight = 180;
        const scale = Math.min(Math.floor(windowWidth / baseWidth), Math.floor(windowHeight / baseHeight));
        app.scale = scale;
    },
    step: (dt) => {
        app.entities.forEach(entity => {
            //Update animations frames
            const animation = entity.components.animation;
            if (animation) {
                const atlas = ANIMATIONS[animation.id][animation.state];
                if (animation.timestamp < 10 / animation.speed) {
                    animation.timestamp += dt;
                } else {
                    animation.timestamp = 0;
                    animation.frameIndex = animation.frameIndex < atlas.length - 1 ? animation.frameIndex + 1 : 0;
                    animation.frame = atlas[animation.frameIndex];
                }
            }
        });
    },
    render: () => {
        const screen = app.layer;
        screen.clear();
        screen.font("46px title");
        screen.fillStyle("#e23d69");
        screen.fillText("Towers.io", 48, 8);
        app.entities.forEach(entity => {
            //Render animated entities
            const animation = entity.components.animation;
            if (animation) {
                screen.drawAtlasFrame(app.atlases[animation.id], animation.frame, entity.x, entity.y);
            }
        });
    }
}));
