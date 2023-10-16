import { BoardSettings } from './BoardSettings';
import { DifficultyLevel } from './DifficultyLevel';

export type SettingsByDifficulty = Record<DifficultyLevel, BoardSettings>;
