const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
let count = 0;
let all_count = 0;

/**
 * スレッドごとの送信間隔を設定します。(ミリ秒)
 */
const delay = 0;

/**
 * 同時に実行する数を設定します。
 */
const threads = 100;

/**
 * nyanpass.com/add.phpにPOSTリクエストを送信します。
 */
async function sent() {
	try {
		await fetch('https://nyanpass.com/add.php', {
			credentials: 'omit',
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0',
				Accept: 'application/json, text/javascript, */*; q=0.01',
				'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
				'Content-Type':
					'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Sec-Fetch-Dest': 'empty',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Site': 'same-origin',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache',
			},
			referrer: 'https://nyanpass.com/',
			body: 'nyan=pass',
			method: 'POST',
			mode: 'cors',
		});
		count++;
		all_count++;
	} catch (e) {
		console.log(e);
	}
}

/**
 * スパムを実行します。
 * @param num スレッドの番号
 */
async function spammer(num: number) {
	while (true) {
		await sent();
		// console.log(`[Threads ${num}] OK! (${count})`); dev
		await wait(delay);
	}
}

/**
 * コンソールに1秒間隔で情報を表示します。
 */
async function display() {
	setInterval(async () => {
		console.log(
			`\x1b[38;5;46mRunning ${threads} Threads. (${count}/s | ${all_count} requests sent)\x1b[0m`
		);
		count = 0;
	}, 1000);
}

/**
 * コードの処理を開始します。
 */
async function main() {
	console.log('Calling...');
	display();
	for (let i = 0; i < threads; i++) {
		spammer(i);
	}
}

main();
