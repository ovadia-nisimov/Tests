import Beeper from '../models/beeper';
import * as fs from 'fs/promises';
import * as path from 'path';

const dataPath = path.join(__dirname, '../../data/beepers.json');


export const readBeepers = async (): Promise<Beeper[]> => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};


export const writeBeepers = async (beepers: Beeper[]): Promise<void> => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(beepers, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};
