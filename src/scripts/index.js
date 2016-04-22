import FeedParser from 'feedparser';
import request from 'request';

const req = request('http://feeds.feedburner.com/2ality');
const feedParser = new FeedParser();

const app = document.getElementById('app');

req.on('error', err => {
	console.error(err);
});

req.on('response', res => {
	if (res.statusCode != 200) throw Error('response error');
	req.pipe(feedParser);	
});

feedParser.on('readable', _ => {
	let item;
	while( item = feedParser.read() ) {
		app.innerHTML += `
			<div>
				<h3><a href="${item.origlink}" target="_blank">${item.title}</a></h3>
				<div>${item.description}</div>
			</div>
			<hr>
		`;
	}
});