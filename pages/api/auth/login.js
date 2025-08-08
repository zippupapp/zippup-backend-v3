import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const loginOtpStorage = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, phone, password, otp, loginType = 'password' } = req.body;

    if (loginType === 'password') {
      if ((!email && !phone) || !password) {
        return res.status(400).json({ error: 'Email/phone and password required' });
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email || '' },
            { phone: phone || '' }
          ]
        }
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      });

    } else if (loginType === 'otp_request') {
      if (!phone) {
        return res.status(400).json({ error: 'Phone number required' });
      }

      const user = await prisma.user.findUnique({
        where: { phone }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const loginOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      loginOtpStorage.set(phone, {
        otp: loginOtp,
        userId: user.id,
        timestamp: new Date()
      });

      console.log(`Login OTP for ${phone}: ${loginOtp}`);

      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        demo: { otp: loginOtp }
      });

    } else if (loginType === 'otp_verify') {
      if (!phone || !otp) {
        return res.status(400).json({ error: 'Phone and OTP required' });
      }

      const otpData = loginOtpStorage.get(phone);
      if (!otpData || otpData.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }

      const user = await prisma.user.findUnique({
        where: { id: otpData.userId }
      });

      loginOtpStorage.delete(phone);

      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
