// Import required module
import fs from 'fs';

// Set limits (MacOS): sudo launchctl limit maxfiles 1024 unlimited
// Set limits (Linux): ulimit -n 1024

console.log('process.pid', process.pid);

// Function that creates file descriptor leak
function leakFileDescriptors() {
    setInterval(() => {
        // Open file without closing it
        const stream = fs.createWriteStream('/tmp/testfile.txt', { autoClose: true });
        // const stream = fs.createReadStream('/tmp/testfile.txt', { autoClose: true });

        stream.on('open', () => {
            console.log(`Opened writeStream: ${stream.fd}`);
        });

        stream.write('test');
        stream.close();  // Uncomment to prevent the leak
    }, 10);
}

// Start the leak
leakFileDescriptors();
