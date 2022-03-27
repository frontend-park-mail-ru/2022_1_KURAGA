import homeViewTemplate from './homeView.pug';
import HeaderClass from 'Components/header/headerClass.js';
import MainMovieClass from 'Components/mainMovie/mainMovieClass.js';
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from 'Components/footer/footerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import {profile, movies, mainHomeMovie} from 'Modules/network';
import router from 'Routing/router.js';
import BaseViewClass from '../baseView/baseViewClass.js';
import {routes} from "Routing/constRouting";
import LoaderViewClass from "../loaderView/loaderViewClass.js";
import UserModel from "../../models/User.js"
import '../../css/home.css';


export default class HomeViewClass extends BaseViewClass {


    async render() {

        try {
            const loader = new LoaderViewClass();
            loader.render();


            UserModel.auth().then((authData) => {
                if (!authData.isAuth) {
                        router.go(routes.LOGIN_VIEW);
                        return;
                    }
               authData.body.data.then((user) =>{
                   console.log(user);
               });
            });

            // if (!user.isAuth) {
            //     router.go(routes.LOGIN_VIEW);
            //     return;
            // }

            //const [user, movie, main] = await Promise.all([profile(), movies(), mainHomeMovie()]);
            // if (!user.isAuth) {
            //     router.go(routes.LOGIN_VIEW);
            //     return;
            // }
            // const [userInfo, movieInfo,mainMov] = await Promise.all([user.data, movie.data, main.data])


           // const header = new HeaderClass(user);
            // console.log(header);
            // const mainMovie = new MainMovieClass(mainMov);
            // const carouselPop = new carousel('Pop', movieInfo[0].movies, 4, movieInfo[0].compilation_name);
            // const carouselTop = new carousel('Top', movieInfo[1].movies, 3, movieInfo[1].compilation_name);
            // const carouselFam = new carousel('Fam', movieInfo[2].movies, 4, movieInfo[2].compilation_name);
            const footer = new FooterClass();

            super.render(homeViewTemplate, {
                // picture: mainMov.picture,
                //header: header.render(),
                // mainMovie: mainMovie.render(),
                // carouselPop: carouselPop.render(),
                // carouselTop: carouselTop.render(),
                // carouselFam: carouselFam.render(),
                footer: footer.render(),
            });


            // handlerLink();
            // header.setHandler();
            // carouselPop.setHandler();
            // carouselTop.setHandler();
            // carouselFam.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}
