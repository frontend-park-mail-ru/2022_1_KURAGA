import filmsViewTemplate from "./searchView.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../models/User";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import {routes} from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import {User} from "../../types";
import ListFilmsClass from "../../components/listFilms/listFilmsClass";
import MovieCompilationModel from "../../models/MovieCompilation";
import LoaderViewClass from "../loaderView/loaderViewClass";
import "./search.scss";

export default class SearchViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilation: MovieCompilationModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const {isAuth, userBody} = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const searchConfig = {
                res: "результат",
                categories: [{
                    topic: "Фильмы",
                    results: [{name: "Мстители", info: "жанр"}, {name: "Мстители2", info: "жанр2"}]
                }, {
                    topic: "Сериалы",
                    results: [{name: "Мстители", info: "жанр"}, {name: "Мстители2", info: "жанр2"}]
                }, {
                    topic: "Персоны",
                    results: [{name: "Мстители", info: "жанр"}, {name: "Мстители2", info: "жанр2"}]
                }
                ]
            }
            const userData: User = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);


            const header = new HeaderClass(this.user.userData);
            const footer = new FooterClass();

            super.render(filmsViewTemplate, {
                header: header.render(),
                search: searchConfig,
                footer: footer.render(),
            });

            this.setHandler();
            handlerLink();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }

    setHandler(): void {

    }
}
