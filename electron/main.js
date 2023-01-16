const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

const createMainWindow = () => {
	const main = new BrowserWindow({
		width: 800,
		height: 600,
	});

	if (process.env.ELECTRON_START_URL) {
		main.loadURL(process.env.ELECTRON_START_URL);
		main.webContents.openDevTools();
	} else {
		const startPath = path.join('.', 'dist', 'index.html');
		main.loadFile(startPath);
	}

  main.removeMenu()
};

app.on('ready', () => {
	createMainWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
