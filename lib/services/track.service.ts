export interface CharacterSummary {
	accountName: string;
	characterName: string;
	infoTimestamps: string[];
}

export interface CharacterInfo {
	accountName: string;
	characterName: string;
	scrapeTimestamp: string;
	allocatedPassives: string[];
}

const BASE_URL = 'https://yi3u04sy6f.execute-api.us-east-1.amazonaws.com/dev';

export class TrackService {
	async getCharacterSummary(accountName: string, characterName: string): Promise<CharacterSummary> {
		const response = await fetch(BASE_URL + `/account/${accountName}/character/${characterName}/summary`);
		const data = await response.json();

		console.log({ data });

		return data;
	}


	async getCharacterInfo(accountName: string, characterName: string, scrapeTimestamp: string): Promise<CharacterInfo | null> {
		const response = await fetch(BASE_URL + `/account/${accountName}/character/${characterName}/info/${scrapeTimestamp}`);
		const data = await response.json();

		console.log({ data });

		return data;
	}
}