const electron = require('electron');
const path = require('path');

// Application main window
const MainWindow = require('./electron/main-window.js');

// System tray
const Tray = require('./electron/tray'); 

// Module to control application life.
const app = electron.app;

require('./electron/notify');


if (process.env.NODE_ENV !== 'production') {
  require('./electron/devtools');
}
// To stop garbage collection
let mainWindow;
let tray;

function createWindow () {
   mainWindow = MainWindow();
   Tray({ app, mainWindow });
}
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});


/* custom ============================ */
require('./electron/birthday');