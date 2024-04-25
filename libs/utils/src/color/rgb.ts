export type RGB = [number, number, number];

export function nameToRgb(name: string): RGB {
    switch (name) {
        case "red":
            return [255, 0, 0];
        default:
            throw new Error(`Color not supported: '${name}'`);
    }
}
