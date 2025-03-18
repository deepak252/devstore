const user = {
  a: "hello",
  b: "world",
};
let a = undefined,
  b = undefined;
Object.assign(user, { a, b });

console.log(user);
