import { execFile } from 'child_process';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers['x-iis-windowsauthtoken'];

		console.log(`asdkjfhbadsk`);
    if (token) {
      const scriptPath = path.join(process.cwd(), 'lib', 'get-user.py');
      
      execFile('python', [scriptPath, token], (error, stdout, stderr) => {
        if (error) {
          res.status(500).json({ error: stderr });
        } else {
          res.status(200).json({ user: stdout.trim() });
        }
      });
    } else {
      res.status(400).json({ error: 'x-iis-windowsauthtoken header not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
