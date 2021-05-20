import typescript from "rollup-plugin-typescript2";

const files = ["drag", "pinch", "longpress", "index"];

export default files.map((file) => ({
    input: `lib/${file}.ts`,
    output: {
        file: `dist/${file}.js`,
        format: "umd",
        name: "EZG",
        extend: file !== "index",
        sourcemap: true,
    },
    plugins: [typescript({ useTsconfigDeclarationDir: true })],
}));
