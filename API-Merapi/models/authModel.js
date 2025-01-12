const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase'); // Import koneksi Supabase

// Register User
const register = async (req, res) => {
  const { email, username, password } = req.body;
  console.log('Register request received for email:', email);

  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert data user ke tabel manual (misalnya, tabel "users")
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, username, password: hashedPassword }]);

    if (error) {
      console.error('Register error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    console.log('User created successfully:', data);
    res.status(201).json({ message: 'User created', data });
  } catch (err) {
    console.error('Register internal error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received for email:', email);

  try {
    // Query user berdasarkan email dari tabel manual
    const { data, error } = await supabase
      .from('users')
      .select('id, password')
      .eq('email', email)
      .single();

    if (error || !data) {
      console.error('Login error: User not found');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, data.password);
    if (!isValidPassword) {
      console.error('Login error: Invalid password');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('Login successful, token generated:', token);

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login internal error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login };
