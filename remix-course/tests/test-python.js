import { exec } from 'child_process';

exec('python3 --version', (error, stdout) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Python version:', stdout);
});