import { ajaxReq } from '../modules/ajax.js';
import router from '../routing/router.js';
import { routes } from '../routing/constRouting.js';

export default class UserModel {
    constructor(userData) {

        this.data = {
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar
        }
    }
    get userData(){
        return this.data;
    }


    static async registration(form) {
        try {
            return await ajaxReq.post({
                path: '/signup',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async login(form) {
        try {
            return await ajaxReq.post({
                path: '/login',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async logout() {
        try {
            return await ajaxReq.delete({
                path: '/logout',
            });
        } catch (err) {
            return err;
        }
    }



     static async profile() {
        try {
            return await ajaxReq.get({
                path: '/profile',
            });
        } catch (err) {
            return err;
        }
    }

    static async edit(form) {
        try {
            return await ajaxReq.put({
                path: '/edit',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async avatar(form) {
        try {
            return await ajaxReq.put({
                path: '/avatar',
                body: form,
                headers: {
                }
            });
        } catch (err) {
            return err;
        }
    }


    static auth(){
        return new Promise((res) => {
            this.profile()
                .then((body) => {
                     res({
                         isAuth: body.isAuth,
                         userBody: body.data
                     });
                })
                .catch(() => {
                });
        });
    }

    static quit(){
        return new Promise((res) => {
            this.logout()
                .then(() => {
                    router.go(routes.LOGIN_VIEW);
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    static reg(formJson){
        this.registration(formJson)
            .then(({ isAuth, data }) => {
                data.then((res) => {
                    if (res.message === 'ERROR: Email is not unique') {
                        errorIncorr.classList.add('error-active');
                        errorIncorr.classList.add('center');
                        errorIncorr.textContent = 'Такой пользователь уже существует';

                        return;
                    }

                    if (!isAuth) {
                        errorIncorr.classList.add('error-active');
                        errorIncorr.classList.add('center');
                        errorIncorr.textContent = 'Упс... У нас что-то пошло не так!';

                        return;
                    }

                    router.go('/');
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static login(formJson){
        this.login(formJson)
            .then(({ isAuth }) => {
                if (!isAuth) {
                    errorIncorr.classList.add('error-active');
                    errorIncorr.classList.add('center');
                    errorIncorr.textContent = 'Неверный логин или пароль';

                    return;
                }

                router.go('/');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static editProfile(formJson){
        return this.edit(formJson);

    }

    static editAvatar(formData){
        return this.avatar(formData);
    }


}

