const { execSync } = require('child_process');
const path = require('path');

const projectPath = 'C:\\Users\\Joao\\Documents\\projetos\\app\\burguer-night';

try {
  // Check status
  console.log('=== Git Status ===');
  const status = execSync('git status', { cwd: projectPath, encoding: 'utf-8' });
  console.log(status);

  // Create and checkout new branch
  console.log('\n=== Creating branch: styling/modern-design ===');
  const branchName = 'styling/modern-design';
  
  try {
    execSync(`git checkout -b ${branchName}`, { cwd: projectPath, encoding: 'utf-8' });
    console.log(`✓ Branch ${branchName} created and checked out`);
  } catch (e) {
    console.log(`Branch might exist, trying to checkout...`);
    execSync(`git checkout ${branchName}`, { cwd: projectPath, encoding: 'utf-8' });
  }

  // Add all changes
  console.log('\n=== Adding all changes ===');
  execSync('git add .', { cwd: projectPath, encoding: 'utf-8' });
  console.log('✓ Changes staged');

  // Commit
  console.log('\n=== Committing changes ===');
  const commitMsg = 'feat: modern ui design and production config\n\n- Added modern CSS styling with design system\n- Updated frontend components with improved UX\n- Configured environment-aware API and Socket.IO URLs\n- Added database abstraction layer for SQLite/PostgreSQL\n- Improved CORS configuration for dev and production\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>';
  
  execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: projectPath, encoding: 'utf-8' });
  console.log('✓ Changes committed');

  // Push to origin
  console.log('\n=== Pushing to origin ===');
  const output = execSync(`git push -u origin ${branchName}`, { cwd: projectPath, encoding: 'utf-8' });
  console.log(output);

  console.log('\n✓ All done! Now create a Pull Request on GitHub to merge into main');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
