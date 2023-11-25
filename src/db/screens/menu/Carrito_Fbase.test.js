const carrito_Fbase = require(".");

test("funUpdate",()=>{
  const result = carrito_Fbase.funUpdate("hotdog",3)
  expect(result).toBe(3)
}

);