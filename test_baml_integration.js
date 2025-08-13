// Simple integration test for BAML text humanizer functions
// This verifies the BAML client structure and generation is correct

import fs from 'fs';
import path from 'path';

async function testBAMLIntegration() {
  console.log('Testing BAML client generation...');
  
  // Check that BAML client directory exists
  const clientPath = './baml_client/baml_client';
  if (!fs.existsSync(clientPath)) {
    throw new Error('BAML client directory not found');
  }
  
  // Check that key TypeScript files were generated
  const requiredFiles = ['index.ts', 'types.ts', 'async_client.ts'];
  for (const file of requiredFiles) {
    const filePath = path.join(clientPath, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Required BAML client file ${file} not found`);
    }
  }
  
  // Check that types.ts contains our expected types
  const typesContent = fs.readFileSync(path.join(clientPath, 'types.ts'), 'utf8');
  const expectedTypes = ['HumanizationRequest', 'HumanizedText', 'TextStyle'];
  for (const type of expectedTypes) {
    if (!typesContent.includes(type)) {
      throw new Error(`Expected type ${type} not found in generated types`);
    }
  }
  
  console.log('✅ BAML client directory structure is correct');
  console.log('✅ All required TypeScript files are generated');
  console.log('✅ Expected types are present in generated code');
  console.log('✅ BAML client integration test passed');
  
  return true;
}

// Run the test if this file is executed directly
testBAMLIntegration()
  .then(() => {
    console.log('BAML integration test completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('BAML integration test failed:', error.message);
    process.exit(1);
  });

export { testBAMLIntegration };