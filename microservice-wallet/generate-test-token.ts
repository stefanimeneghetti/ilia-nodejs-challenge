import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const SECRET = process.env.JWT_SECRET ?? '';

const payload = {
  first_name: 'Usuário',
  last_name: 'Teste',
  email: 'joao.silva@email.com',
  user_id: '123456789',
};

const token = sign(payload, SECRET, {
  expiresIn: '1h',
});

console.log('Token:', token);
