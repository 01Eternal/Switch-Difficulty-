/** @format */

const Player = new NativeClass('Terraria', 'Player');
const Main = new NativeClass('Terraria', 'Main');
const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');

Player.Hooks.EnterWorld.hook((original, playerIndex) => {
	original(playerIndex);
	Main.NewText('use /dif help to know the switch difficulty commands', 255, 255, 255);
});

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
	original(self, message, client_id);
	const command = message.Text.toLowerCase();

	if (command == '/dif help') {
		Main.NewText(
			`this mod allows you to change the difficulty of the world with these commands in the chat: \n /dif status to see what is activated\n \n/dif reset to deactivate all extra difficulties and also change the difficulty to classic. \n \n/journey: journey mode \nclassic: classic mode \n/expert: expert mode \n/master: master mode \n /ftw: for the worthy \n /mk10: celebration mk 10 \n/dt: don't starve.`,
			255,
			255,
			255
		);
	}

	if (command === '/dif reset') {
		Main.GameMode = 0; // Volta ao Modo Clássico
		Main.getGoodWorld = false;
		Main.tenthAnniversaryWorld = false;
		Main.dontStarveWorld = false;
		Main.NewText('Game mode reset to Classic. All custom seeds deactivated.', 255, 255, 255);
	}

	if (command === '/classic') {
		Main.GameMode = 0;
		Main.NewText('Game mode changed to Classic.', 0, 255, 0);
	} else if (command === '/expert') {
		Main.GameMode = 1;
		Main.NewText('Game mode changed to Expert.', 255, 0, 255);
	} else if (command === '/master') {
		Main.GameMode = 2;
		Main.NewText('Game mode changed to Master.', 125, 0, 0);
	} else if (command === '/journey') {
		Main.GameMode = 3;
		Main.NewText('Game mode changed to Journey.', 255, 255, 255);
	} else if (command === '/ftw') {
		Main.getGoodWorld = true;
		Main.NewText('Game mode changed to For The Worthy.', 255, 0, 0);
	} else if (command === '/mk10') {
		Main.tenthAnniversaryWorld = true;
		Main.NewText('Game mode changed to Celebration Mk10.', 0, 255, 255);
	} else if (command === '/dt') {
		Main.dontStarveWorld = true;
		Main.NewText('Game mode changed to Dont Starve.', 0, 255, 255);
	} else if (command === '/dif status') {
		let mode;
		switch (Main.GameMode) {
			case 0:
				mode = 'Classic';
				break;
			case 1:
				mode = 'Expert';
				break;
			case 2:
				mode = 'Master';
				break;
			case 3:
				mode = 'Journey';
				break;
		}
		let seeds = [];
		if (Main.getGoodWorld) seeds.push('For The Worthy');

		if (Main.tenthAnniversaryWorld) seeds.push('Celebration Mk10');

		if (Main.dontStarveWorld) seeds.push('Dont Starve');

		let seedsText = seeds.length > 0 ? seeds.join(', ') : 'None';

		Main.NewText(`Current game mode: ${mode}. Active custom seeds: ${seedsText}`, 255, 255, 0);
	}
});
