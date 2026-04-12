// test-backend.mjs
// Run with: node --experimental-modules test-backend.mjs
import mongoose from 'mongoose';

// 1. Test Mongoose Connection & Models
console.log('--- 1. Testing Database Connection & Models ---');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/kalpkrafts';
try {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
  console.log('✅ MongoDB connected successfully!');

  // Define User Model inline for script
  const userSchema = new mongoose.Schema({ email: String, subscriptionTier: String, aiQueriesRemaining: Number });
  const User = mongoose.models.User || mongoose.model('User', userSchema);
  
  // Test insert
  const tempUser = new User({ email: `test_${Date.now()}@test.com`, subscriptionTier: 'FREE', aiQueriesRemaining: 10 });
  await tempUser.save();
  console.log(`✅ successfully created test user: ${tempUser.email}`);
  
} catch (e) {
  console.error('❌ MongoDB Connection Failed! Ensure your local mongod is running.');
}

// 2. Test Execution API Proxy (Piston Demo)
console.log('\n--- 2. Testing Sandbox Execution (Piston API) ---');
try {
  const pistonRes = await fetch('https://emkc.org/api/v2/piston/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: 'python',
      version: '3.10.0',
      files: [{ name: 'main.py', content: 'print("Hello from internal API test!")' }]
    })
  });
  const data = await pistonRes.json();
  if (data.run && data.run.stdout) {
    console.log('✅ Piston Execution Successful: ', data.run.stdout.trim());
  } else {
    console.error('❌ Piston Error: ', data);
  }
} catch (e) {
   console.error('❌ Piston fetch failed');
}

// 3. Test API Authentication Guards (Expect 401s without a session cookie)
console.log('\n--- 3. Testing Endpoint Security Checks ---');
try {
  const res = await fetch('http://localhost:3000/api/metrics/dashboard');
  if (res.status === 401) {
    console.log('✅ API Security Guard Active (Returned 401 Unauthorized as expected)');
  } else {
    console.log(`⚠️ API returned ${res.status}`);
  }
} catch (e) {
   console.log('❌ Server not responding. (Ensure npm run dev is running)');
}

process.exit(0);
