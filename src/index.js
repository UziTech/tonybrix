#!/usr/bin/env node

const {terminal} = require("terminal-kit");
const opn = require("opn");
const spellout = require("./spellout.js");

const bigName = `
 ----------------      -----------       ----      ----   ------      ------
|                |    /           \\     |    \\    |    |  \\     \\    /     /
|                |   /             \\    |     \\   |    |   \\     \\  /     /
 -----      -----   |     -----     |   |      \\  |    |    \\     \\/     /
      |    |        |    /     \\    |   |       \\ |    |     \\          /
      |    |        |   |       |   |   |        \\|    |      \\        /
      |    |        |   |       |   |   |              |       \\      /
      |    |        |   |       |   |   |              |        |    |
      |    |        |   |       |   |   |    |\\        |        |    |
      |    |        |    \\     /    |   |    | \\       |        |    |
      |    |        |     -----     |   |    |  \\      |        |    |
      |    |         \\             /    |    |   \\     |        |    |
      |    |          \\           /     |    |    \\    |        |    |
       ----            -----------       ----      ----          ----

 --------------      --------------      --------------   ------      ------
|              \\    |              \\    |              |  \\     \\    /     /
|     -----     \\   |     -----     \\   |              |   \\     \\  /     /
|    |     \\    |   |    |     \\    |    ----      ----     \\     \\/     /
|    |     /    |   |    |     /    |        |    |          \\          /
|     -----     /   |     -----     /        |    |           \\        /
|              /    |              /         |    |            \\      /
|              \\    |           ---          |    |            /      \\
|     -----     \\   |    |\\     \\            |    |           /        \\
|    |     \\    |   |    | \\     \\           |    |          /          \\
|    |     /    |   |    |  \\     \\      ----      ----     /     /\\     \\
|     -----     /   |    |   \\     \\    |              |   /     /  \\     \\
|              /    |    |    \\     \\   |              |  /     /    \\     \\
 --------------      ----      ------    --------------   ------      ------
`;

const smallName = `
 _______
|__   __|
   | |  ___   _ __   _   _
   | | / _ \\ | '_ \\ | | | |
   | || (_) || | | || |_| |
   |_| \\___/ |_| |_| \\__, |
                      __/ |
   ____         _    |___/
  |  _ \\       (_)
  | |_) | _ __  _ __  __
  |  _ < | '__|| |\\ \\/ /
  | |_) || |   | | >  <
  |____/ |_|   |_|/_/\\_\\
`;

const justName = "Tony Brix";

const about = `
When I was nine years old I found QBasic on my parent’s computer. It quickly \
became my favorite game. Ever since then I have been intrigued by computers \
and programming languages.

There are about 40 languages in which I have written at least one program. My \
favorite languages are Javascript, PHP and C#. I continue to learn more every \
day and keep up with today’s advancing technologies.

I started my own computer repair business in high school, mostly working for \
family members and friends. Also in high school I started freelance \
programming through websites such as GetACoder.com and others. I have worked on \
many projects with many different kinds of people and have been able to work \
with every one of them successfully.

I am a very easy going and open person who thinks logically about every \
decision. I consider myself a very lucky person to have found what I want to \
do for the rest of my life at a very early age. To answer every high school \
counselor’s question, if I had $1,000,000 I would write programs for anybody \
and everybody.
`;

const websites = {
	Website: "https://tony.brix.ninja",
	GitHub: "https://github.com/UziTech",
	NPM: "https://www.npmjs.com/~tonybrix",
	Atom: "https://atom.io/users/UziTech/packages",
	Twitter: "https://twitter.com/tonybrix",
};

const labels = Object.keys(websites);

async function showPrompt(selectedIndex = 0) {
	terminal.bold.green("Learn More?");

	const response = await terminal.singleColumnMenu([
		...labels,
		"No Thanks, Quit [Esc]",
	], {
		selectedIndex,
		cancelable: true,
		style: terminal.white,
		leftPadding: "   ",
		selectedLeftPadding: " > ",
		submittedLeftPadding: " > ",
	}).promise;


	const text = response.selectedText;
	if (text && text in websites) {
		opn(websites[text]);
		terminal.up(labels.length + 2);
		return showPrompt(response.selectedIndex);
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
		color: ["bold", "blue"]
	});

	await showPrompt();
}

output();
