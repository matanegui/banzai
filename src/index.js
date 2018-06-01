import * as PLAYGROUND from './static/playground.js';
import {
    PLAYGROUND_CONFIG
} from './static/playground-config';

import { Animation } from './game/animation';
import { Text } from './game/text';

const entity = (x = 0, y = 0, components = {}) => {
    const e = { x, y };
    Object.assign(e, components);
    return e;
}

// eslint-disable-next-line no-unused-vars
const app = new PLAYGROUND.Application(Object.assign(PLAYGROUND_CONFIG, {
    create: function () {
        //Load app-wide resources
        this.loadAtlas('font');

        //Set up new app-level functions
        this.layer.drawText = Text.drawText(this.layer, this.atlases.font);

        //Init entities
        this.gameState = {};
        const gameState = this.gameState;

        //Load tileset
        this.loadAtlas('tileset');
        this.gameState.map = {
            x: 0,
            y: 8,
            data: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
                2, 1, 1, 1, 1, 2, 2, 2, 1, 2,
                2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
                2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
                2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ],
            width: 10,
            height: 7,
            tileWidth: 24,
            tileHeight: 24
        };
        const map = this.gameState.map;
        for (let x = 0; x < map.height; x++) {
            for (let y = 0; y < map.width; y++) {
                const cellIndex = (x * map.width) + y;
                const cellX = y * map.tileWidth;
                const cellY = x * map.tileHeight;
                console.log(map.data[cellIndex], cellX, cellY);
            }
        }
        //Load guy
        gameState.guy = entity(100, 50, {
            "animation": Animation.create('coqguy', 'idleRight', 300)
        });
        this.loadAtlas(gameState.guy.animation.id);
        Animation.play(gameState.guy.animation);

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
        const gameState = this.gameState;
        Animation.forward(gameState.guy.animation, dt);
        //Input
        const keys = this.keyboard.keys;
        //Animation.play(entities.guy.animation, 'idl');
        if (keys.right) {
            gameState.guy.x += 1.5;
        } else if (keys.left) {
            gameState.guy.x -= 1.5;
        } else if (keys.up) {
            gameState.guy.y -= 1.5;
        } else if (keys.down) {
            gameState.guy.y += 1.5;
        }
    },
    render: function () {
        const gameState = this.gameState;
        const atlases = this.atlases;
        const screen = this.layer;

        screen.clear('#000000');

        //Map
        const map = this.gameState.map;
        for (let x = 0; x < map.height; x++) {
            for (let y = 0; y < map.width; y++) {
                const cellIndex = (x * map.width) + y;
                const cellX = y * map.tileWidth;
                const cellY = x * map.tileHeight;
                screen.drawAtlasFrame(atlases.tileset, map.data[cellIndex], map.x + cellX, map.y + cellY);
            }
        }

        const guy = gameState.guy;
        screen.drawAtlasFrame(atlases[guy.animation.id], Animation.frame(guy.animation), guy.x, guy.y)

        //Interface
        this.layer.fillStyle("#222222");
        this.layer.fillRect(240, 0, 80, 180);

        //Text
        screen.drawText(
            `Life: some`,
            244, 4, { scale: 1, bw: 70 });
    }
}));
