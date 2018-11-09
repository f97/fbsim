require('dotenv').config();
var login = require('facebook-chat-api');

const simsimi = require('simsimi')({
	key: `${process.env.KEY}`,
	api: 'http://sandbox.api.simsimi.com/request.p',
	lc: 'vn',
	ft: '1.0'
});

var timeinit = {};


login({
	email: `${process.env.EMAIL}`,
	password: `${process.env.PASSWORD}`
},
(err, api) => {
	if (err) return console.error(err);
	api.listen(function callback(err, message) {
		if (message.type === 'message') {
			if(message.isGroup === false){
				var boxID = 'id' + message.threadID;
				if(message.timestamp - timeinit[boxID] > 2*60*60*1000){
					timeinit[boxID] = undefined;
				}
				if(typeof timeinit[boxID] === 'undefined' ){
					timeinit[boxID] = message.timestamp;
					console.log('First message: ' + message.body);
					api.sendMessage(`*BOT*: Anh Khoản đẹp trai, vui tính, năng nổ, nhiệt tình, thân thiện tuyệt vời đã off face, đi chơi với gấu rồi... `, message.threadID);
					console.log(`*BOT*: Anh Khoản đẹp trai, vui tính, năng nổ, nhiệt tình, thân thiện tuyệt vời đã off face, đi chơi với gấu rồi... `);
					setTimeout(function () {
						api.sendMessage(`*BOT*: Nếu là chuyện quan trọng thì mày gọi đến số *_+84 37 659 0356_*`, message.threadID)
						console.log(`*BOT*: Nếu là chuyện quan trọng thì mày gọi đến số *_+84 37 659 0356_*`);
					}, 200);
					setTimeout(function () {
						api.sendMessage('*BOT*: Còn giờ mày đang nói chuyện với tao!!!', message.threadID);
						console.log('*BOT*: Còn giờ mày đang nói chuyện với tao!!!');
					}, 300);
					setTimeout(function () {
						api.sendMessage(`'*BOT*: Bot chào mày...!!!'`, message.threadID)
						console.log('BOT*: Bot chào mày...!!!');
					}, 500);
					api.markAsRead(message.threadID);
				} else {
					simsimi(message.body)
					.then(response => {
						let reply = response.replace('simsimi', 'đệ anh Khoản đẹp trai')
						api.sendMessage(`*BOT*: ${reply}`, message.threadID);
					console.log('Sessage: ' + message.body);
						console.log(`*BOT*: ${reply}`);
						api.markAsRead(message.threadID);
					})
					.catch(err => {
						api.sendMessage(
							'*BOT*: Tao đang đơ, không trả lời được :)',
							message.threadID
						);
						console.log(err);
					});
				}
				console.log(timeinit[boxID]);
			}
		} else {
			api.sendMessage(
				'*BOT*: Tao đang đơ, không trả lời được :v :v',
				message.threadID
			);
			console.log(err);
		}
	});
}
);