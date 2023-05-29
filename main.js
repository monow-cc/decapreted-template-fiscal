const { app, Menu, Tray, Notification } = require('electron')
const { autoUpdater } = require("electron-updater")
const { fork } = require('child_process')
const log = require('electron-log')
const fs = require('fs')

//START BACKEND LOOPBACK JSMART
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {

  fork(__dirname + '/src/app.js')

  //ATRIBUIÇÃO DE VARIÁVEIS

  let tray = null
  // app.allowRendererProcessReuse = false
  autoUpdater.logger = log
  autoUpdater.logger.transports.file.level = 'info'

  //START FRONTEND

  app.on('ready', async function () {

    if (!fs.existsSync(app.getPath('userData') + '/../sghfiscaldb.json')) {
      let config = new Object({
        contingency:{
          status: false,
          dhCont: ''
        }
      })
      fs.writeFileSync(app.getPath('userData') + '/../sghfiscaldb.json', JSON.stringify(config))
    }

    tray = new Tray(__dirname + '/src/public/img/icon.ico')
    let contextMenu = Menu.buildFromTemplate([
      {
        label: 'Sair', click: function () {
          app.isQuiting = true
          app.quit()
        }
      }
    ])
    tray.setToolTip('Sgh Fiscal ' + app.getVersion())
    tray.setContextMenu(contextMenu)
    autoUpdater.checkForUpdates()
  })

  //AUTO UPDATE

  autoUpdater.on('checking-for-update', () => {
  })

  autoUpdater.on('update-available', (info) => {
  })

  autoUpdater.on('update-not-available', (info) => {
  })

  autoUpdater.on('error', (err) => {
  })

  autoUpdater.on('download-progress', (progressObj) => {
    log.info('Downloading Updates: ' + parseFloat(progressObj.percent).toFixed(0) + '%')
  })

  autoUpdater.on('update-downloaded', (update) => {
    new Notification({
      title: "Uma nova atualização está pronta!",
      icon: __dirname + '/src/public/img/icon.ico',
      body: "Sgh Fiscal versão " + update.version + " foi baixado e será instalado automaticamente"
    }).show()
    log.info('Update download complete!')
    
    autoUpdater.quitAndInstall(true, true)
  })
}

setInterval(() => { 
  autoUpdater.checkForUpdates()
}, 1000 * 60 * 60)