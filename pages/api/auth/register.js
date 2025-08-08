import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const otpStorage = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, password, role = 'CUSTOMER' } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email or phone' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionId = uuidv4();

    otpStorage.set(sessionId, {
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      emailOtp,
      phoneOtp,
      timestamp: new Date(),
      verified: {
        email: false,
        phone: false
      }
    });

    console.log(`Email OTP for ${email}: ${emailOtp}`);
    console.log(`Phone OTP for ${phone}: ${phoneOtp}`);

    res.status(200).json({
      success: true,
      message: 'OTPs sent successfully',
      sessionId,
      demo: {
        emailOtp,
        phoneOtp
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
