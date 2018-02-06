
// COPYRIGHT: CSSSSR
// https://github.com/CSSSR/csssr-project-template
// Скрипт для создания нового BЕМ-блока. Разработано в CSSSR

// создание блока набрать node block name
'use strict';

const fs = require('fs')
const path = require('path')
const colors = require('colors')
const readline = require('readline')

const rl = readline.createInterface(process.stdin, process.stdout);

// folder with all blocks
const BLOCKS_DIR = path.join(__dirname, 'app/blocks/');

var dir = BLOCKS_DIR;

//////////////////////////////////////////////////////////////////////////////////////////////////

// default content for files in new block
const fileSources = {
	pug: `mixin {blockName}()\n\t.{blockName}\n\t\t| {blockName}\n`,
	styl: `{blockName} \t\n\tdisplay block\n`,
	// js	: `// .{blockName} scripts goes here`
};

function validateBlockName(blockName) {
	return new Promise((resolve, reject) => {
		const isValid = /^(\d|\w|-)+$/.test(blockName);

		if (isValid) {
			resolve(isValid);
		} else {
			const errMsg = (
				`ERR>>> An incorrect block name '${blockName}'\n` +
				`ERR>>> A block name must include letters, numbers & the minus symbol.`
			);
			reject(errMsg);
		}
	});
}

function directoryExist(blockPath, blockName) {
	return new Promise((resolve, reject) => {
		fs.stat(blockPath, notExist => {
			if (notExist) {
				resolve();
			} else {
				reject(`ERR>>> The block '${blockName}' already exists.`.red);
			}
		});
	});
}

function createDir(dirPath) {
	return new Promise((resolve, reject) => {
		fs.mkdir(dirPath, err => {
			if (err) {
				reject(`ERR>>> Failed to create a folder '${dirPath}'`.red);
			} else {
				resolve();
			}
		});
	});
}

function createFiles(blocksPath, blockName) {
	const promises = [];
	Object.keys(fileSources).forEach(ext => {
		const fileSource = fileSources[ext].replace(/\{blockName}/g, blockName);
		const filename = `${blockName}.${ext}`;
		const filePath = path.join(blocksPath, filename);

		promises.push(
				new Promise((resolve, reject) => {
					fs.writeFile(filePath, fileSource, 'utf8', err => {
						if (err) {
							reject(`ERR>>> Failed to create a file '${filePath}'`.red);
						} else {
							resolve();
						}
					});
				})
		);
	});

	return Promise.all(promises);
}

function getFiles(blockPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(blockPath, (err, files) => {
			if (err) {
				reject(`ERR>>> Failed to get a file list from a folder '${blockPath}'`);
			} else {
				resolve(files);
			}
		});
	});
}

function printErrorMessage(errText) {
	console.log(errText);
	rl.close();
}


// //////////////////////////////////////////////////////////////////////////

function initMakeBlock(blockName) {
	const blockPath = dir;//path.join(dir, blockName);

	return validateBlockName(blockName)
		.then(() => directoryExist(blockPath, blockName))
		.then(() => createDir(blockPath))
		.then(() => createFiles(blockPath, blockName))
		.then(() => getFiles(blockPath))
		.then(files => { 
			const line = '-'.repeat(48 + blockName.length);
			console.log(line);
			console.log(`The block has just been created in 'app/blocks/${blockName}'`);
			console.log(line);

			// Displays a list of files created
			files.forEach(file => console.log(file.yellow));

			rl.close();
		});
}


// //////////////////////////////////////////////////////////////////////////
//
// Start here
//

// Command line arguments
const blockNameFromCli = process.argv
		// join all arguments to one string (to simplify the capture user input errors)
		.slice(2)
		.join(' ');

var paths = [];
var parseAchieved = false;

function commandCheck(command){
	var regex = /(?![\(\)\+\^\>\-\_])\W/,
		result = command.match(regex);

	if (result!=null){
		return false;
	}
	else{
		return true;
	}
}

function structureСheck(command){
	if (commandCheck(command)){
		var regex = /(\+|\>)\1{1,}|\)\(|\(\)|\+\>|\>\+|\^\+|\+\^|\>\^|\^\>|\)\>|\)\^/,
		result = command.match(regex);

		if (result!=null){
			return false;
		}
		else{
			return true;
		}
	}
	else{
		console.log('ERR>>> Incorrect command'.red);
		process.exit();
	}
}

function hasNoDuplicates(arr, prop){
	return arr.every(function(obj, pos){
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
	})
}

function createHierarchy(obj){
	obj.forEach(function(block, index) {
		var hyphen = '',
			path = block.name,
			layer = block.level;

		for (var j = 0; j<block.level;j++){
			hyphen += '— ';
		}
		
		for (var i = 1; i<=index; i++){
			
			var name = '',
				bO = obj[index].level,
				bO_i = obj[index-i].level;

			if ( (bO > bO_i) && (bO_i < layer) ) {
				name = obj[index-i].name;
				path = name + '/' + path;
				layer--;
			}
		}

		paths.push(path);
		
		console.log('-------------');
		console.log(hyphen+block.name);
	});

	parseAchieved = true;	
}

function parseForTree(command){

	if (structureСheck(command)){
		var regex = /[\)\+]*[\+][\(]|[\)][\+]|[\)]|[\(]|[\>]|[\+]|[\^]+/,
			blockArr = command.split(regex),
			level = 0,
			blockObjects = [],
			levelArr = [];
	
		blockArr.forEach(function(item, i) {
			var index = command.search(item)-1,
				saveLevel = 0;
			
			if(index>0){
				for (var j = index; j>0; j--){
					if ( (command[j]==')') && ((index-j)<=3) ){
						while(command[j]==')'){
							level = levelArr[levelArr.length-1];
							levelArr.splice(levelArr.length-1,1)
							j--;
						}
						break;
					}
				}
			}
	
			while(command[index]=='('){
				index--;
				saveLevel++;
			}
	
			switch (command[index]) {
				case '>':
					level = level + 1;
					break;
				case '+':
					level = level;
					break;
				case '^':
					var it = index;
					while(command[it]=='^'){
						it--;
						level = level - 1;
					}
					break;
			}
	
			while(saveLevel>0){
				levelArr.push(level);
				saveLevel--;
			}
	
			if (item != ""){
				var block = {name:item, symb:command[index], level:level};
				blockObjects.push(block);
			}
	
		});

		if (hasNoDuplicates(blockObjects,'name')){
			createHierarchy(blockObjects);
		}
		else{
			console.log('ERR>>> Blocks has duplicates'.red);
			process.exit();
		}
	}
	else{
		console.log('ERR>>> Incorrect structure'.red);
		process.exit();
	}
}

// parseForTree('b>b1+b2>b21>b211>b2222>b33>b85+b213+b787');
// parseForTree('b1>b3+b4+b5>b6+b21+b22+b23>b33');
// parseForTree('b1+b2+b3+b4')
// parseForTree('b1>b2>b3>b4+b5+b6')
// parseForTree('b1>b2+b3>b4+b5>b6+b7>b8+b9')
// parseForTree('b1+b2+(b3>b31+b32>b321+b322)+b4');
// parseForTree('b1+b2+(b3>b31+(b32>b321+b322)+b33)+b4');
// parseForTree('b1+(b2>b21+b22+b23)+b8+b10+(b3>b31+b32)+(b4>b41+b42)')
// parseForTree('b1+(b2>b21+b22+b23)+b8>b10+(b3>b31+b32)+(b4>b41+b42)')
// parseForTree('b2>b21+(b22>b211+(b212>b2121+b2122)+b23)+b5');
parseForTree('b2>b21+(b22>b211+(b212>b2121+b2122)+b23)+b5+(b3>b31+b32)+b4+(b6>b61+(b63>b631+b632)+b62)');

// parseForTree('b2>b21+(b212>b2121+b2122)+(b6>b61+(b63>b631+b632)+b62)');

// parseForTree('(main>home+about)+header+footer')
// parseForTree('header+(main>home+about)+footer')
// parseForTree('(b1+b2)+(b3+b4)')

// parseForTree('header+main>home+about>slogan^^footer')
// parseForTree('header+(main>(home>slogan)+about)+footer')

// parseForTree('header+(main>home>slogan+about)+footer');
// parseForTree('header+(main>(home>slogan+about))+footer');

// parseForTree('header>+main')

// parseForTree('header+((main>home>slogan)+about)+footer');

// parseForTree('b1>b12^(b2+b3)');

// parseForTree('(main>home+about)>heade^eer+++++footer>+aasd^^^^^asdasd?>>>>asd+(asdasd+>asda(asdasd)asd()asdasd)^asd)(as')

// parseForTree('asd>asd^(asd2+asd3)')

// parseForTree(blockNameFromCli);

console.log(paths);

if (parseAchieved == true) {
	rl.setPrompt('Are you sure? (y/n): '.magenta);
	rl.prompt();
	rl.on('line', (line) => {
		if (line=='y'){
			// createAnotherFiles();
			createImportFile(__dirname+'/app','../')
			rl.close();
		}
		else{
			rl.close();
		}
	});
} 

function createAnotherFiles(){
	paths.forEach(function(item, i, arr) {
		dir = BLOCKS_DIR + item;

		var name = item.split('/');
		initMakeBlock(name[name.length-1]).catch(printErrorMessage);
	});
}

const importPaths = {
	pug: 'include ',
	styl: '@import ',
};

function createImportFile(dir,prefix) {
	const promises = [];
	Object.keys(importPaths).forEach(ext => {

		var fileSource = '';

		paths.forEach(function(item) {
			fileSource += importPaths[ext] + prefix + item + '.' + ext + '\n'
		});

		const filename = `import.${ext}`;
		const filePath = path.join(dir, filename);

		promises.push(
				new Promise((resolve, reject) => {
					fs.writeFile(filePath, fileSource, 'utf8', err => {
						if (err) {
							reject(`ERR>>> Failed to create a file '${filePath}'`.red);
						} else {
							resolve();
						}
					});
				})
		);
	});

	return Promise.all(promises);
}
