import { terser } from "rollup-plugin-terser";

const files = ["drag", "pinch", "index", "longpress"];

export default files.map((file) => ({
    input: `lib/${file}.js`,
    output: {
        file: `dist/${file}.min.js`,
        format: "umd",
        name: "EZG",
        extend: file !== "index",
        sourcemap: true,
        plugins: [terser()],
    },
}));
