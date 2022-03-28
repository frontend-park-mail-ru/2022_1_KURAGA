import profileViewTemplate from './profileView.pug';
import HeaderClass from "Components/header/headerClass.js";
import FooterClass from "Components/footer/footerClass.js";
import handlerLink from "Utils/handlerLink.js";
import InputsProfileClass from "Components/inputs/inputsProfile/inputsProfileClass";
import ButtonClass from "Components/button/buttonClass";
import ProfileAvatarClass from "Components/profileAvatar/profileAvatarClass";
import UserModel from "../../models/User.js"
import router from "Routing/router";
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import LoaderViewClass from "../loaderView/loaderViewClass.js";

import '../../css/profile.css';

export default class ProfileViewClass  extends BaseViewClass{
    #user;
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();


            const {isAuth, body} = await UserModel.auth();
            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const userData = await Promise.resolve(body);
            this.#user = new UserModel(userData.user);



            const header = new HeaderClass(this.#user.userData);
            const inputs = new InputsProfileClass(userData.user);
            const avatar = new ProfileAvatarClass(userData.user.avatar);
            const button = new ButtonClass('Сохранить');
            const footer = new FooterClass();

            super.render(profileViewTemplate,{
                header: header.render(),
                inputs: inputs.render(),
                avatar: avatar.render(),
                button: button.render(),
                footer: footer.render()
            });
            

            handlerLink();
            inputs.setHandler();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}