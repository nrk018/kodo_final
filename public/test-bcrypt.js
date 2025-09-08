// This script tests bcrypt functionality directly in the browser

async function testBcrypt() {
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = '<p>Testing bcrypt functionality...</p>';
  
  try {
    // Test if bcrypt is available
    if (typeof bcrypt === 'undefined') {
      throw new Error('bcrypt is not available in the browser. This is expected as bcrypt is a server-side library.');
    }
    
    resultElement.innerHTML += '<p class="success">bcrypt is available in the browser!</p>';
  } catch (error) {
    resultElement.innerHTML += `<p class="error">Error: ${error.message}</p>`;
    resultElement.innerHTML += `<p>This is normal! bcrypt is a server-side library and not available in the browser.</p>`;
    resultElement.innerHTML += `<p>Let's test the server-side bcrypt functionality instead:</p>`;
    
    // Test server-side bcrypt by making a request to a test endpoint
    try {
      const testPassword = 'testpassword123';
      resultElement.innerHTML += `<p>Testing server-side bcrypt with password: ${testPassword}</p>`;
      
      const response = await fetch('/api/auth/test-bcrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: testPassword }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        resultElement.innerHTML += `<p class="success">Server-side bcrypt test successful!</p>`;
        resultElement.innerHTML += `<p>Hashed password: ${data.hashedPassword}</p>`;
        resultElement.innerHTML += `<p>Verification result: ${data.verified}</p>`;
      } else {
        throw new Error(data.error || 'Server-side bcrypt test failed');
      }
    } catch (serverError) {
      resultElement.innerHTML += `<p class="error">Server-side bcrypt test error: ${serverError.message}</p>`;
      resultElement.innerHTML += `<p>This could indicate an issue with the bcrypt library on the server.</p>`;
      resultElement.innerHTML += `<p>Let's try a direct login test instead:</p>`;
      
      // Add a link to the login test page
      resultElement.innerHTML += `<p><a href="/login-test.html" class="button">Go to Login Test Page</a></p>`;
    }
  }
}

// Create a simple UI for the test
document.body.innerHTML = `
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f0f8ff;
    }
    h1 {
      color: #0066cc;
    }
    .card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
    .success {
      color: green;
      font-weight: bold;
    }
    .error {
      color: red;
      font-weight: bold;
    }
    .button {
      display: inline-block;
      background-color: #0066cc;
      color: white;
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
  </style>
  <h1>bcrypt Functionality Test</h1>
  <div class="card">
    <div id="result"></div>
    <p>
      <a href="/login-test.html" class="button">Go to Login Test Page</a>
    </p>
  </div>
`;

// Run the test
testBcrypt();