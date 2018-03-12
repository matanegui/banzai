import {
    ANIMATIONS
} from './static/animations-data';

export const Animation = {
    create: (id, defaultState, speed = 0) => {
        return {
            playing: false,
            loop: false,
            speed: speed,
            id: id,
            frameIndex: 0,
            timestamp: 0,
            state: defaultState
        }
    },

    play: (animation, state = animation.state, loop = false) => {
        const previousState = animation.state;
        animation.state = state;
        animation.playing = true;
        animation.loop = loop;
    },

    stop: (animation) => {
        animation.playing = false;
    },

    forward: (animation, dt) => {
        if (animation && animation.playing) {
            const atlas = ANIMATIONS[animation.id][animation.state];
            //Update  animation frame if needed
            if (animation.timestamp < 10 / animation.speed) {
                animation.timestamp += dt;
            } else {
                animation.timestamp = 0;
                animation.frameIndex = animation.frameIndex < atlas.length - 1 ? animation.frameIndex + 1 : 0;
            }
        }
    },

    state(animation, state = null) {
        if (state) {
            animation.state = state;
            return state;
        }
        else return animation.state;
    },

    frame(animation) {
        const atlas = ANIMATIONS[animation.id][animation.state];
        return atlas[animation.frameIndex];
    }
}