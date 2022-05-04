import listFilmsTemplate from './listFilms.pug'
import MovieClass from "Components/movie/movieClass";
import MovieCompilationModel from "../../models/MovieCompilation";
import './listFilms.scss'

export default class ListFilmsClass {
    private readonly info: MovieCompilationModel;

    constructor(info: MovieCompilationModel) {
        this.info = info;
    }
    render() {
        const unTop = new MovieClass(this.info.movieCompilationData.movies, "", true);
        
        return listFilmsTemplate({
            items: unTop.render(),
        });
    }
}