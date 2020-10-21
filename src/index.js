const { app, BrowserWindow } = require ('electron');
const path = require('path');

//Handle creating/removing shortcuts on Windows when installing/ uninstalling/uninstaling
if (require('electron-squirrel-startup')) { //eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  //create new browser window
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      //neeed to enable use of remote modules outside of the main process, was missing from  tutorial orginal code. 
      enableRemoteModule: true

    }
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  //Open the DevTools
  mainWindow.webContents.openDevTools();
}

/* This method will be called when Electron has finished intialization 
and is ready to creaet browsers.
Some APIs can be used only be used after this event occurs.
*/ 
app.on('ready', createWindow); 

//Quits app when all windows are closed 
app.on('window-all-closed', () => {
  //On OS X it is common for apps and their menu bar
  // to stay active  until their user explicitly quits with Cmd + Q
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('active', () =>{
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and theer are no other windows open.
  if (BrowerWindow.getAllWindows().length === 0){
    createWindow();
  }
});






