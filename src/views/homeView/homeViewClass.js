import homeViewTemplate from './homeView.js';
import HeaderClass from '../../components/header/headerClass.js';
import MainMovieClass from '../../components/mainMovie/mainMovieClass.js';
import carousel from '../../components/carousel/carouselClass.js';
import FooterClass from '../../components/footer/footerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import {profile} from '../../modules/network.js';
import {movies} from '../../modules/network.js';
import router from '../../routing/router.js';

const root = document.getElementById('root');

const popMovies = [
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны1',
        genre: 'Фантастика1',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны2',
        genre: 'Фантастика2',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны3',
        genre: 'Фантастика3',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны4',
        genre: 'Фантастика4',
    },
];

const topMovies = [
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны#1',
        genre: 'Фантастика',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны#2',
        genre: 'Фантастика',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны#3',
        genre: 'Фантастика',
    },
];

export default class HomeViewClass {
    render() {

        // profile()
        //     .then(({isAuth, data}) => {
        //         if (!isAuth) {
        //             router.go('/login');
        //             return;
        //         }
        //         data.then((data) => {
        //             const header = new HeaderClass(data.username);
        //             const mainMovie = new MainMovieClass();
        //             const carouselPop = new carousel('Pop', popMovies, 3);
        //             const carouselTop = new carousel('Top', topMovies, 3);
        //             const carouselFam = new carousel('Fam', popMovies, 2);
        //             const footer = new FooterClass();
        //             root.innerHTML = homeViewTemplate({
        //                 header: header.render(),
        //                 mainMovie: mainMovie.render(),
        //                 carouselPop: carouselPop.render(),
        //                 carouselTop: carouselTop.render(),
        //                 carouselFam: carouselFam.render(),
        //                 footer: footer.render(),
        //             });
        //             handlerLink();
        //             carouselPop.setHandler();
        //             carouselTop.setHandler();
        //             carouselFam.setHandler();
        //             header.setHandler();
        //         });
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
        //
        // movies()
        //     .then(({isAuth, data}) => {
        //         if (!isAuth) {
        //             router.go('/login');
        //             return;
        //         }
        //         data.then((data) => {
        //             //const header = new HeaderClass(data.username);
        //            // const mainMovie = new MainMovieClass();
        //             const carouselPop = new carousel('Pop', popMovies, 3);
        //             const carouselTop = new carousel('Top', topMovies, 3);
        //             const carouselFam = new carousel('Fam', popMovies, 2);
        //             const footer = new FooterClass();
        //             root.innerHTML = homeViewTemplate({
        //                // header: header.render(),
        //               //  mainMovie: mainMovie.render(),
        //                 carouselPop: carouselPop.render(),
        //                 carouselTop: carouselTop.render(),
        //                 carouselFam: carouselFam.render(),
        //                 footer: footer.render(),
        //             });
        //             handlerLink();
        //             carouselPop.setHandler();
        //             carouselTop.setHandler();
        //             carouselFam.setHandler();
        //           //  header.setHandler();
        //         });
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });


        Promise.all([profile(), movies()])
            .then(([user, movies]) => {

                if (!user.isAuth) {
                    router.go('/login');
                    return;
                }
                Promise.all([user.data, movies.data])
                    .then(([user, mov]) => {
                        console.log(user, movies.moviesCompilation);
                        const header = new HeaderClass(user.username);
                        const mainMovie = new MainMovieClass();
                        const carouselPop = new carousel('Pop', mov.moviesCompilation[0].movies, 3);
                        const carouselTop = new carousel('Top', mov.moviesCompilation[1].movies, 3);
                        const carouselFam = new carousel('Fam', mov.moviesCompilation[0].movies, 2);
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
                        carouselPop.setHandler();
                        carouselTop.setHandler();
                        carouselFam.setHandler();
                    })
                    .catch((err) => {
                        console.error(err);
                    });

            })
            .catch((err) => {
                console.error(err);
            });
    }
}




