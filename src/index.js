#!/usr/bin/env node

const {terminal} = require("terminal-kit");
const open = require("open");
const spellout = require("./spellout.js");
const fs = require("fs");
const path = require("path");

// eslint-disable-next-line no-sync
const bigName = fs.readFileSync(path.resolve(__dirname, "./bigName.txt"), {encoding: "utf8"});

// eslint-disable-next-line no-sync
const smallName = fs.readFileSync(path.resolve(__dirname, "./smallName.txt"), {encoding: "utf8"});

const justName = "Tony Brix";

// eslint-disable-next-line no-sync
const about = fs.readFileSync(path.resolve(__dirname, "./about.txt"), {encoding: "utf8"});

const websites = {
	Website: "https://tony.brix.ninja",
	GitHub: "https://github.com/UziTech",
	NPM: "https://npmjs.com/~tonybrix",
	Atom: "https://atom.io/users/UziTech/packages",
	Twitter: "https://twitter.com/tonybrix",
	LinkedIn: "https://linkedin.com/in/tonybrix",
};

const websiteNames = Object.keys(websites);
const tab = websiteNames.reduce((max, w) => Math.max(w.length, max), 0) + 1;
const labels = websiteNames.map(w => `${w}:${" ".repeat(tab - w.length)}${websites[w]}`);

async function showPrompt(selectedIndex = 0) {
	terminal.bold.green("Learn More?");

	const response = await terminal.singleColumnMenu([
		...labels,
		"No Thanks, Quit [Esc]",
	], {
		selectedIndex,
		cancelable: true,
		style: terminal.brightYellow,
		leftPadding: "   ",
		selectedLeftPadding: " > ",
		submittedLeftPadding: "   ",
		submittedStyle: terminal.brightYellow,
	}).promise;


	const index = response.selectedIndex;
	if (index < websiteNames.length) {
		open(websites[websiteNames[index]]).catch((err) => {
			terminal.red(err.message);
		});
		terminal.up(labels.length + 2);
		return showPrompt(index);
	}

	process.exit();
}

async function output() {
	let nameWidth, name, textIndext;

	const bigNameLength = bigName.split("\n").reduce((max, line) => Math.max(line.length, max), 0);
	if (terminal.width >= bigNameLength) {
		nameWidth = bigNameLength;
		name = bigName;
		textIndext = 5;
	} else {
		const smallNameLength = smallName.split("\n").reduce((max, line) => Math.max(line.length, max), 0);
		if (terminal.width >= smallNameLength) {
			nameWidth = smallNameLength;
			name = smallName;
			textIndext = 3;
		} else {
			nameWidth = justName.length;
			name = justName;
			textIndext = 1;
		}
	}
	terminal.clear();
	terminal.hideCursor();
	await spellout(name, {
		indent: Math.floor((terminal.width - nameWidth) / 2),
		color: "red",
	});
	await spellout(about, {
		maxWidth: terminal.width - textIndext * 2,
		indent: textIndext,
		color: ["bold", "blueBright"]
	});

	await showPrompt();
}

output();
