export class Movie{
    title: string;
    year: number;
    ids: {
        imdb: string;
        slug: string;
        tmdb: string;
        trakt: string;
    }
}