const bcrypt = require('bcryptjs');

async function testBcrypt() {
  try {
    console.log('Testing bcrypt functionality...');
    
    const password = 'password123';
    console.log('Password to hash:', password);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
    
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password verification result:', isMatch);
    
    console.log('bcrypt test completed successfully!');
  } catch (error) {
    console.error('Error testing bcrypt:', error);
  }
}

testBcrypt();