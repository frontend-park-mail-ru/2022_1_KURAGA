import headMovieTemplate from "./headMovie.pug";
import { InfoHeadMovie } from "../../types";

export default class HeadMovieClass {
    private readonly info: InfoHeadMovie;

    constructor(info: InfoHeadMovie) {
        this.info = info;
    }

    render() {
        return headMovieTemplate({
            info: this.info,
        });
    }
}