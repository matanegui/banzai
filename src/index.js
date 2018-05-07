import * as PLAYGROUND from './static/playground.js';
import {
    PLAYGROUND_CONFIG
} from './static/playground-config';

import { Animation } from './game/animation';
import { Text } from './game/text';

const entity = (x = 0, y = 0, components = {}) => ({
    x,
    y,
    components
});

// eslint-disable-next-line no-unused-vars
const app = new PLAYGROUND.Application(Object.assign(PLAYGROUND_CONFIG, {
    create: function () {
        this.entities = [

        ];
        //Load guy
        this.guy = entity(0, 0, {
            "animation": Animation.create('coqguy', 'idle', 400)
        });
        //Load bitmap font and set up text drawing function
        this.loadAtlas('font');
        this.loadAtlas('coqguy');
        this.layer.drawText = Text.drawText(this.layer, this.atlases.font);
        Animation.play(this.guy.components.animation);
    },
    resize: function () {
        // Scale up as much as possible while fitting the screen
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const baseWidth = this.width;
        const baseHeight = this.height;
        const scale = Math.min(Math.floor(windowWidth / baseWidth), Math.floor(windowHeight / baseHeight));
        this.scale = Math.max(1, scale);
    },
    step: function (dt) {
        Animation.forward(this.guy.components.animation, dt);
    },
    render: function () {
        const screen = this.layer;
        screen.clear('#222222');
        screen.drawText(
            `Tiene sombrero de marinero y en vez de capa se puso un collar. Viva la fiesta viva la noche vivan los djs`,
            0, 120, { scale: 1, bw: 260 });
        screen.drawAtlasFrame(this.atlases[this.guy.components.animation.id], Animation.frame(this.guy.components.animation), this.guy.x, this.guy.y);

    }
}));
