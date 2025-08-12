const getHelloWorld = (_req, res) => {
  res.json({ message: "Hello World" });
};

const getPong = (_req, res) => {
  res.json({ message: "Pong" });
};

export { getHelloWorld, getPong };
