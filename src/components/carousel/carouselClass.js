import carouselTemplate from './carousel.pug';
import movingCarousel from './movingCarousel.js';

export default class carousel {
    constructor(type, movies, num, title) {
        this.type = type;
        this.movies = movies;
        this.countDiv = Math.ceil(movies.length / num)
        this.num = num
        this.title = title;
    }

    render() {
        if (this.type === 'Pop') return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselPop',
            prevBtn: 'js-carouselPop__prev',
            nextBtn: 'js-carouselPop__next',
            wrapMov: 'js-carouselPop__wrap',
            typeMov: '',
            countDiv: this.countDiv,
            num: this.num,
            title: this.title
        });
        if (this.type === 'Top') return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselTop',
            prevBtn: 'js-carouselTop__prev',
            nextBtn: 'js-carouselTop__next',
            wrapMov: 'js-carouselTop__wrap',
            typeMov: 'top',
            countDiv: this.countDiv,
            num: this.num,
            title: this.title
        });
        if (this.type === 'Fam') return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselFam',
            prevBtn: 'js-carouselFam__prev',
            nextBtn: 'js-carouselFam__next',
            wrapMov: 'js-carouselFam__wrap',
            typeMov: '',
            countDiv: this.countDiv,
            num: this.num,
            title: this.title
        });
    }

    setHandler() {
        for (let i = 0; i < 3; i++) {
            const wrap = document.querySelector(`.js-carousel${this.type}`);

            const buttonCaruselPrev = document.querySelector(`.js-carousel${this.type}__prev`);
            const buttonCaruselNext = document.querySelector(`.js-carousel${this.type}__next`);

            wrap.addEventListener('mouseover', () => {
                buttonCaruselPrev.classList.add('b-carousel__prev-hover');
                buttonCaruselNext.classList.add('b-carousel__next-hover');
            });

            wrap.addEventListener('mouseout', () => {
                buttonCaruselPrev.classList.remove('b-carousel__prev-hover');
                buttonCaruselNext.classList.remove('b-carousel__next-hover');
            });
        }

        const a = new movingCarousel({
            main: `.js-carousel${this.type}`,
            wrap: `.js-carousel${this.type}__wrap`,
            prev: `.js-carousel${this.type}__prev`,
            next: `.js-carousel${this.type}__next`,
        });
    }
}
