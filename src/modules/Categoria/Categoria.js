import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import CategoriaForm from './CategoriaForm';
import CategoriaList from './CategoriaList';
import actions from './Categoria.actions';
import { PAGESIZE_DEFAULT } from '../../app/App.actions';

class Categoria extends Component {

    constructor(props) {
        super(props);
        this.fetchAll = this.fetchAll.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setOrderBy = this.setOrderBy.bind(this);

        this.state = {
            values: undefined,
            startPage: 0,
            pageSize: PAGESIZE_DEFAULT,
            orderBy: 'nome,ASC'
        };

        this.fetchAll(this.state.values, this.state.orderBy, this.state.startPage, this.state.pageSize);
    }

    fetchAll(values, orderBy, startPage, pageSize) {
        this.props.actions.fetchAll(
            values || this.state.values, 
            orderBy || this.state.orderBy, 
            startPage || this.state.startPage, 
            pageSize || this.state.pageSize
        );
    }

    setPage(page) {
        this.fetchAll(undefined, undefined, page);
    }

    setOrderBy(field, direction) {
        this.setState(Object.assign({}, this.state, { orderBy: `${field},${direction}` }));
        this.fetchAll();
    }

    render() {
        const { list, obj } = this.props;
        if(!obj) {
            return (
                <CategoriaList 
                    data={list} 
                    doSubmit={(values) => this.fetchAll(values)}
                    doAdd={this.props.actions.add}
                    doDelete={this.props.actions.delete}
                    doFetchOne={this.props.actions.fetchOne}
                    doSetPage={this.setPage}
                    setOrderBy={this.setOrderBy}
                />
            );
        } else {
            return (
                <CategoriaForm data={obj} 
                    doSubmit={this.props.actions.save}
                    doCancel={this.props.actions.cancel}
                />
            );
        }
    }

}

const mapStateToProps = (state) => {
    return {
        list: state.categorias,
        obj: state.categoria
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);
