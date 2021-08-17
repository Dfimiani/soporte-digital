'use strict'

import { app, protocol, BrowserWindow , ipcMain , screen , Menu , Tray , Notification} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require("path");
const ip = require('ip');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWindow ;
let icon ;
if (process.env.WEBPACK_DEV_SERVER_URL) {
  icon = path.join(__dirname , '../src/assets/logo_cotoDigital.jpg')
}else{
  icon = path.join(__dirname, '../logo_cotoDigital.jpg') ;
}

async function createWindow() {
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let { height }  = screen.getPrimaryDisplay().workAreaSize
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: width - 800,
    y: height - 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity : false
    },
    show: true,
    frame: false,
    icon: icon
  })

  mainWindow.setResizable(false);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

let tray = null
app.on('ready', async () => {
  
  //Para habilitar las notificaciones
  if (process.platform === 'win32') {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      app.setAppUserModelId(process.execPath)
    }else{
      app.setAppUserModelId("com.coto.soporte-digital");
    }  
  }
  
  //Ventana principal
  createWindow()

  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Crear Ticket'},
    { label: 'Cerrar soporte digital.' , click : () => { app.quit() }}
  ])
  tray.setToolTip('Soporte Coto Digital')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => { mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show() })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

app.setLoginItemSettings({openAtLogin: false, openAsHidden: false});

//Ocultar venetana
ipcMain.on('hide', () => { mainWindow.hide() });

//Mostrar ventanta
ipcMain.on('show', () => { mainWindow.show() });

//OBtener las medidas de trabajo de la pantalla
ipcMain.on('getThumbnailSize', (event) => { 
  let { height ,width}  = screen.getPrimaryDisplay().workAreaSize;
  let thumbnailsize = {
    width,
    height
  };
  event.returnValue = thumbnailsize;
});

//Ip de la maquina
ipcMain.on('getIp', (event) => {
  event.returnValue = ip.address();
})

//Notificacion de ticket creado con exito 
ipcMain.on('notifyticketsuccess',() => {
  let NOTIFICATION_TITLE = 'Soporte Digital'
  let NOTIFICATION_BODY = 'Gracis por cargar un ticket 😄, en breve nos pondremos en contacto.'
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
})