// Works fine, thanks to util's package.json exports "./*" first array entry
import {nameToRgb} from "utils/color/rgb";
console.log(nameToRgb("red"));

// Breaks, because of util's package.json exports "./*" second array entry somehow not being applied
import {sayFavoriteColor} from "utils/color";
console.log(sayFavoriteColor("yellow"));
