export const Text = {
    drawText: (screen, fontAtlas) => (text, x, y, { scale = 1, bw, bh } = {}) => {
        const charWidth = 4 * scale;
        const charHeight = 7 * scale;
        const atlasOffset = 65;

        const render = (text, x = x, y = y) => {
            let xOffset = 0;
            for (let i = 0; i < text.length; i++) {
                const entry = fontDict[text.charAt(i)];
                if (entry !== undefined) {
                    screen.drawAtlasFrame(fontAtlas, atlasOffset + entry, x + (i * charWidth) + xOffset, y, scale);
                }
            }
        };

        const fontDict = {
            "A": 0,
            "B": 1,
            "C": 2,
            "D": 3,
            "E": 4,
            "F": 5,
            "G": 6,
            "H": 7,
            "I": 8,
            "J": 9,
            "K": 10,
            "L": 11,
            "M": 12,
            "N": 13,
            "O": 14,
            "P": 15,
            "Q": 16,
            "R": 17,
            "S": 18,
            "T": 19,
            "U": 20,
            "V": 21,
            "W": 22,
            "X": 23,
            "Y": 24,
            "Z": 25,
            "a": 32,
            "b": 33,
            "c": 34,
            "d": 35,
            "e": 36,
            "f": 37,
            "g": 38,
            "h": 39,
            "i": 40,
            "j": 41,
            "k": 42,
            "l": 43,
            "m": 44,
            "n": 45,
            "o": 46,
            "p": 47,
            "q": 48,
            "r": 49,
            "s": 50,
            "t": 51,
            "u": 52,
            "v": 53,
            "w": 54,
            "x": 55,
            "y": 56,
            "z": 57
        };

        // No text box
        if (!bw && !bh) {
            render(text);
        } else if (bw) {
            //Width only text box
            const lines = [];
            const charsPerLine = Math.floor(bw / charWidth);
            const words = text.split(' ');
            let currentLine = '';
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if ((currentLine.length + word.length) * charWidth <= bw) {
                    currentLine = `${currentLine ? currentLine + ' ' : ''}${word}`;
                }
                else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            //Pus last line
            lines.push(currentLine);
            for (let i = 0; i < lines.length; i++) {
                render(lines[i], x, y + charHeight * i);
            }
        }
    }

}
