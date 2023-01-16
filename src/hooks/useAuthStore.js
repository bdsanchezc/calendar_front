import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onChecking, onClearError, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector( state => state.auth );

    const startLogin = async ({email, password}) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth', {email, password});
            const { name, uid, token } = data;

            localStorage.setItem('token', token.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name, uid}));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(onClearError());
            }, 150);
        }
    }

    const startRegister = async({email, password, nombre}) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/register', {name: nombre, email, password});
            const { name, uid, token } = data;
            
            localStorage.setItem('token', token.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name, uid}));
        } catch (error) {
            dispatch(onLogout(error.response.data?.message || ''));
            setTimeout(() => {
                dispatch(onClearError());
            }, 150);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/token');
            
            const { name, uid, token } = data;
            
            localStorage.setItem('token', token.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name, uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
            setTimeout(() => {
                dispatch(onClearError());
            }, 150);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
        dispatch(onLogoutCalendar());
    }

    return {
        status,
        user,
        errorMessage,
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister
    }
}