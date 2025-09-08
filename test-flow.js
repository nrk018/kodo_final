// Test script for authentication and coin purchase flow

async function testAuthAndPurchaseFlow() {
  console.log('Starting authentication and purchase flow test...');
  
  // Test variables
  const baseUrl = 'http://localhost:3000/api';
  const testUser = {
    username: 'testuser_' + Math.floor(Math.random() * 10000),
    email: `testuser_${Math.floor(Math.random() * 10000)}@example.com`,
    password: 'Password123!'
  };
  
  let userId = null;
  let userCoins = 0;
  
  try {
    // Step 1: Test signup
    console.log('\n1. Testing user signup...');
    const signupResponse = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    if (!signupResponse.ok) {
      const error = await signupResponse.json();
      throw new Error(`Signup failed: ${error.message || 'Unknown error'}`);
    }
    
    const signupData = await signupResponse.json();
    userId = signupData.id;
    userCoins = signupData.coins;
    
    console.log('✅ Signup successful');
    console.log(`User created with ID: ${userId}`);
    console.log(`Initial coins: ${userCoins}`);
    
    // Step 2: Test login
    console.log('\n2. Testing user login...');
    const loginResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      throw new Error(`Login failed: ${error.message || 'Unknown error'}`);
    }
    
    const loginData = await loginResponse.json();
    console.log('✅ Login successful');
    
    // Step 3: Get coin packages
    console.log('\n3. Fetching available coin packages...');
    const packagesResponse = await fetch(`${baseUrl}/coins/packages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId
      }
    });
    
    if (!packagesResponse.ok) {
      const error = await packagesResponse.json();
      throw new Error(`Failed to fetch packages: ${error.message || 'Unknown error'}`);
    }
    
    const packages = await packagesResponse.json();
    console.log(`✅ Found ${packages.length} coin packages`);
    
    if (packages.length === 0) {
      throw new Error('No coin packages available for purchase');
    }
    
    // Step 4: Purchase coins
    const packageToBuy = packages[0]; // Buy the first package
    console.log(`\n4. Purchasing coin package: ${packageToBuy.name} (${packageToBuy.amount} coins)`);
    
    const purchaseResponse = await fetch(`${baseUrl}/coins/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId
      },
      body: JSON.stringify({
        packageId: packageToBuy.id
      })
    });
    
    if (!purchaseResponse.ok) {
      const error = await purchaseResponse.json();
      throw new Error(`Purchase failed: ${error.message || 'Unknown error'}`);
    }
    
    const purchaseData = await purchaseResponse.json();
    console.log('✅ Purchase successful');
    console.log(`New coin balance: ${purchaseData.coins}`);
    console.log(`Coins added: ${purchaseData.coins - userCoins}`);
    
    // Step 5: Get user profile
    console.log('\n5. Fetching user profile...');
    const profileResponse = await fetch(`${baseUrl}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId
      }
    });
    
    if (!profileResponse.ok) {
      const error = await profileResponse.json();
      throw new Error(`Failed to fetch profile: ${error.message || 'Unknown error'}`);
    }
    
    const profileData = await profileResponse.json();
    console.log('✅ Profile fetch successful');
    console.log('User profile:', profileData);
    
    console.log('\n✅ All tests passed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAuthAndPurchaseFlow();