const electron = require('electron');
const path = require('path');
const Tray = electron.Tray;
let Menu = electron.Menu;

module.exports = function TrayInit ({
  app,
  mainWindow
  }) {
  
  // Uncomment for tray only app
  app.dock.hide();

  // Icon file
  const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'icon.png';
  const iconPath = path.join(__dirname, `../icons/${iconName}`);

  // Create tray
  tray = new Tray(iconPath);

  // Icon tooltip
  tray.setToolTip('kolab tray');
  
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height , width } = mainWindow.getBounds();

    // Hide app window if not active
    mainWindow.on('blur', () => {
      mainWindow.hide();
    });

    // Toggle app main window visibility
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      mainWindow.setBounds({
        x: x - width + 26,
        y: yPosition,
        height,
        width
      });
      mainWindow.show();
    }
  });

  tray.on('right-click', (event) => {
    // Show context menu on right-click
    const menuConfig = Menu.buildFromTemplate([
        { label: 'Quit', click: () => app.quit() }
    ]);

    tray.popUpContextMenu(menuConfig);
  });


  return tray;
}