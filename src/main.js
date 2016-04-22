import app from 'app';
import BrowserWindow from 'browser-window';

let mainWindow = null;

app.on('window-all-closed', _ => {
	// on darwin platform this doesn't work as expected. you have to check. mac sucks. 
	app.quit();
});

app.on('ready', _ => {
	mainWindow = new BrowserWindow({
		/* options and shit */
	});
	if( process.env.DEBUG ) {
		mainWindow.toggleDevTools();
	}
	mainWindow.loadURL(`file://${__dirname}/views/index.html`);
	mainWindow.on('close', _ => mainWindow = null);
});