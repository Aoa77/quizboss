import minimalist from "minimist";
const args = minimalist(process.argv.slice(2));
const name = args["name"];
console.log(`Hello ${name}!`);
