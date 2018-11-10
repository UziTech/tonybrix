const justify = require("justified");
const color = require("ansi-colors");

const defaults = {
	ms: 30,
	maxWidth: null,
	indent: 0,
	color: null,
};

async function sleep(ms) {
	await new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

async function spellout(text, options) {
	const opts = {...defaults, ...options};

	let lines = text.split("\n");

	if (opts.maxWidth) {
		const jOpts = {
			width: opts.maxWidth,
			indent: opts.indent,
		};
		lines = lines.reduce((acc, line) => {
			if (line === "") {
				return acc;
			}
			const lineArr = justify(line, jOpts).split("\n");
			return acc.concat(lineArr);
		}, []);
	} else if (opts.indent > 0) {
		lines = lines.map(l => " ".repeat(opts.indent) + l);
	}

	if (opts.color) {
		if (!Array.isArray(opts.color)) {
			opts.color = [opts.color];
		}
		const lineColor = opts.color.reduce((c, s) => c[s], color);
		lines = lines.map(l => lineColor(l));
	}

	for (const line of lines) {
		// eslint-disable-next-line no-console
		console.log(line);
		if (opts.ms > 0) {
			await sleep(opts.ms);
		}
	}
}

module.exports = spellout;
