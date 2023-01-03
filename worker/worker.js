const { workerData, parentPort } = require('worker_threads');
console.log(`Write-up on how ${workerData} wants to chill with the big boys`);
parentPort.postMessage({ filename: workerData, status: 'Done' });
