const electron = require('electron');
const ipc = electron.ipcMain;
const notifier = require('node-notifier');

ipc.on('onNotify', (event, obj) => {
  notifier.notify(obj);
});