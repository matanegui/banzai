import * as PLAYGROUND from './static/playground.js';
import {
    PLAYGROUND_CONFIG
} from './static/playground-config';

import { Animation } from './animation';

// eslint-disable-next-line no-unused-vars
let t = 0;
const entity = (x = 0, y = 0, components = {}) => ({
    x,
    y,
    components
});

const app = new PLAYGROUND.Application(Object.assign(PLAYGROUND_CONFIG, {
    create: function () {
        this.entities = [
            entity(0, 0, {
                'animation': Animation.create('boi', 'walking_right', 80)
            })
        ];
        this.pc = this.entities[0];
        this.entities.forEach(entity => {
            //Load animation atlases
            const animation = entity.components.animation;
            if (animation) {
                this.loadAtlas(animation.id);
            }
        });
    },
    resize: function () {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const baseWidth = this.width;
        const baseHeight = this.height;
        const scale = Math.min(Math.floor(windowWidth / baseWidth), Math.floor(windowHeight / baseHeight));
        this.scale = scale;
    },
    step: function (dt) {
        const speed = 1.5;
        //Parse input
        const pcAnimation = this.pc.components.animation;
        if (this.keyboard.keys.up) {
            this.pc.y = this.pc.y - speed;
            Animation.play(pcAnimation, 'walking_up');
        } else if (this.keyboard.keys.right) {
            this.pc.x = this.pc.x + speed;
            Animation.play(pcAnimation, 'walking_right');
        } else if (this.keyboard.keys.down) {
            this.pc.y = this.pc.y + speed;
            Animation.play(pcAnimation, 'walking_down');
        } else if (this.keyboard.keys.left) {
            this.pc.x = this.pc.x - speed;
            Animation.play(pcAnimation, 'walking_left');
        }
        else {
            const currentState = Animation.state(pcAnimation);
            pcAnimation.frameIndex = 0;
            Animation.stop(pcAnimation);
        }

        this.entities.forEach(entity => {
            //Update animations frames
            const animation = entity.components.animation;
            Animation.forward(animation, dt);
        });
    },
    render: function () {
        const screen = this.layer;
        screen.clear('#A0C1D1');
        this.entities.forEach(entity => {
            //Render animated entities
            const animation = entity.components.animation;
            if (animation) {
                screen.drawAtlasFrame(this.atlases[animation.id], Animation.frame(animation), entity.x, entity.y);
            }
        });
    }
}));
