export const TMDB_TOKEN = process.env.TMDB_TOKEN;

export const PROPS_FORMATTERS = {
  releaseYear: releaseYear => releaseYear,
  releaseDate: releaseDate => `📅 ${releaseDate}`,
  countries: countries => `🌐 ${countries}`,
  runtime: runtime => `🕑 ${runtime} min`,
  score: score => `⭐ ${score}`,
  genres: genres => `🔖 ${genres}`,
  directors: directors => `🎬 Directed by ${directors}`,
  writers: writers => `✍ Written by ${writers}`,
  cast: cast => `🎭 Starring ${cast}`,
  birthday: birthday => `🎂 ${birthday}`,
  placeOfBirth: placeOfBirth => `🌐 ${placeOfBirth}`,
};

export const PROPS_CONSTANTS = {
  MIN_SCORE: 0,
  MAX_SCORE: 10,
};

export const PROPS_SETTINGS = {
  SCORE_DECIMALS: 1,
  MAX_ACTORS_TO_SHOW: 5,
};
