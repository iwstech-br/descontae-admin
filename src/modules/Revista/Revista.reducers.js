import { REVISTAS_PESQUISA, REVISTA_EDICAO, REVISTA_SETMODE } from './Revista.actions';

const revistaReducer = (state = {}, action) => {

    switch (action.type) {

        case REVISTA_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case REVISTAS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case REVISTA_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default revistaReducer;