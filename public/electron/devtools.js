const { default: installExtension, REDUX_DEVTOOLS, REACT_PERF, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

// Install dev tools
installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
installExtension(REACT_PERF)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));