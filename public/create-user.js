// This is a simple script to create a test user directly in the browser
// It uses the signup API endpoint

async function createTestUser() {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@kodo.dev',
        password: 'password123',
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Test user created successfully!');
      console.log('User:', data.user);
      return data.user;
    } else {
      if (data.error && data.error.includes('already exists')) {
        console.log('Test user already exists. You can proceed with login.');
        return { message: 'User already exists' };
      } else {
        throw new Error(data.error || 'Failed to create test user');
      }
    }
  } catch (error) {
    console.error('Error creating test user:', error);
    return { error: error.message };
  }
}

// Execute the function
createTestUser().then(result => {
  // Display result on the page if this script is loaded in a browser
  if (typeof document !== 'undefined') {
    const resultElement = document.createElement('div');
    resultElement.style.padding = '20px';
    resultElement.style.margin = '20px';
    resultElement.style.backgroundColor = '#f0f8ff';
    resultElement.style.border = '1px solid #ccc';
    resultElement.style.borderRadius = '5px';
    
    if (result.error) {
      resultElement.style.color = 'red';
      resultElement.textContent = `Error: ${result.error}`;
    } else {
      resultElement.style.color = 'green';
      resultElement.textContent = result.message || 'User created successfully!';
    }
    
    document.body.appendChild(resultElement);
  }
});