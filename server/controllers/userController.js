import bcrypt from 'bcrypt';


export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    // Simulate stored hash (e.g., from DB)
    const storedId = 'admin';
    const storedPlainPassword = '1234';
    const salt = await bcrypt.genSalt(10);
    const storedHashedPassword = await bcrypt.hash(storedPlainPassword, salt);

    const isMatch = await bcrypt.compare(password, storedHashedPassword);

    if (isMatch && id === storedId) {
      return res.json({ success: true, message: 'Login Successful' });
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
