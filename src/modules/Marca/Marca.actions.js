import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ MARCAS_PESQUISA, MARCA_EDICAO, MARCA_SETMODE, MARCA_SELECT ] = [ "MARCAS_PESQUISA", "MARCA_EDICAO", "MARCA_SETMODE", "MARCA_SELECT" ];

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: MARCA_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/franquias', { params: filtro })
            .then(function(response) {
                dispatch({type: MARCAS_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-marcas", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (marca, callback) => {
    return dispatch => {

        axios.put('/franquias', marca)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "marca-salva", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-marca", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/franquias/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "marca-excluida", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-marca", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/franquias/' + id)
            .then(function(response) {
                dispatch({type: MARCA_EDICAO, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-marca", error.response.data, [], {status: "error"}));
            });

    }
}

export const loadFranquiasForSelect = () => {
    return dispatch => {
        axios({ url: '/franquias?sort=nome,ASC&page=1000', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.id, text: p.nome }) );
            dispatch({type: MARCA_SELECT, payload: ret});
        }).catch(function(error){
            console.log(error);
            dispatch(toaster("erro-carga-marca", error.response.data, [], {status: "error"}));
        });

    }
}