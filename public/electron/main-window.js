const electron = require('electron');
const url = require('url');
const path = require('path');

const BrowserWindow = electron.BrowserWindow;

// Create the browser window.
module.exports = function MainWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 200,
        height: 300,
        frame: false,
        show: false,
        resizable: false,
        webPreferences: { backgroundThrottling: false }
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true
        });
    mainWindow.loadURL(startUrl);

    // Open the DevTools on load.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    return mainWindow
}