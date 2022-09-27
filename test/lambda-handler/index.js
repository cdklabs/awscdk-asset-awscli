const { exec } = require("child_process");

exports.handler = (_) => {
  exec('/opt/awscli/aws --version', (error, stdout, stderr) => {
    if (error) {
      throw new Error(error);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  })
}