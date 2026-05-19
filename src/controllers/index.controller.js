// GET
const getIndex = async (req, res) => {
  res.status(200).json({ message: 'Bienvenido' });
};

module.exports = { getIndex };