import homeViewTemplate from './homeView.pug';
import HeaderClass from 'Components/header/headerClass.js';
import MainMovieClass from 'Components/mainMovie/mainMovieClass.js';
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from 'Components/footer/footerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import {profile, movies} from 'Modules/network';
import router from 'Routing/router.js';
import { routes } from "Routing/constRouting";

import '../../css/home.css';

const root = document.getElementById('root');

export default class HomeViewClass {
    async render() {
        try {
            const [user, movie] = await Promise.all([profile(), movies()]);

            // if (!user.isAuth) {
            //     router.go(routes.LOGIN_VIEW);
            //     return;
            // }

            const [userInfo, movieInfo] = await Promise.all([user.data, movie.data])

            const header = new HeaderClass("userInfo.user.username");
            const mainMovie = new MainMovieClass();
            const carouselPop = new carousel('Pop', movieInfo.moviesCompilation[0].movies, 3);
            const carouselTop = new carousel('Top', movieInfo.moviesCompilation[1].movies, 3);
            const carouselFam = new carousel('Fam', movieInfo.moviesCompilation[2].movies, 2);
            const footer = new FooterClass();

            root.innerHTML = homeViewTemplate({
                header: header.render(),
                mainMovie: mainMovie.render(),
                carouselPop: carouselPop.render(),
                carouselTop: carouselTop.render(),
                carouselFam: carouselFam.render(),
                footer: footer.render(),
            });
            handlerLink();
            header.setHandler();
            carouselPop.setHandler();
            carouselTop.setHandler();
            carouselFam.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}
