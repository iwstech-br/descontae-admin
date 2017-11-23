import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { Form } from 'reactstrap';
import PaginationBar from '../../components/PaginationBar';
import Table from '../../components/Table';
import Intl from '../../components/Intl';

class CategoriaList extends Component {

    constructor(props) {
        super(props);
        // this.limpar = this.limpar.bind(this);
        // this.toggle = this.toggle.bind(this);
        // this.excluir = this.excluir.bind(this);

        this.state = {
            modal: false,
            modalParam: ""
        };

    }

    // toggle(value) {
    //     this.setState({
    //         modal: !this.state.modal,
    //         modalParam: value
    //     });
    // }

    // limpar() {
    //     this.props.dispatch(this.props.reset);
    //     this.props.doLimpar();
    // }

    // excluir(value) {
    //     this.props.doExcluir(this.state.modalParam.id);
    //     this.toggle({});
    // }

    render() {
        // const toggle = (value) => this.toggle(value);
        const { data, doSetPage, doSubmit, handleSubmit } = this.props;

        let content = (<Intl str="nenhum-registro-encontrado"></Intl>);
        if(data && data.totalElements > 0) {

            const headers = [
                { label: (<Intl str="nome"></Intl>), classNames: 'table-w-75' },
                { classNames: 'table-w-20 text-center' }
            ];

            content = (
                <div>
                    <Table headers={headers}>
                        {Object.keys(data.content).map(function(key) {
                            return (<tr key={key}>
                                <td></td>
                                <td>{data.content[key].nome}</td>
                                <td className="text-center">{/*
                                    <Button type="button" onClick={() => doCarregar(data.content[key].id)} color="secondary" size="sm">
                                        <i className="fa fa-pencil"></i>
                                    </Button>

                                    <Button type="button" onClick={() => toggle(data.content[key]) } color="danger" size="sm" className="espacamento">
                                        <i className="fa fa-trash"></i>
                                    </Button>*/}
                                </td>
                            </tr>);
                        })}
                    </Table>
                    <PaginationBar data={data} selectPage={doSetPage}/>
                </div>
            );
        }

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <h4><Intl str='pesquisa-categorias'></Intl></h4>
{/*
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100}/>
                    </Col>
                </Row>

                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <i className="fa fa-search"></i>
                    <Intl str='pesquisar'></Intl>
                </Button>

                <Button type="button" disabled={pristine || submitting} onClick={() => this.limpar()} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>

                <Button type="button" onClick={() => this.props.doNovo()} color="secondary">
                    <i className="fa fa-plus"></i>
                    <Intl str='nova-categoria'></Intl>
                </Button>
*/}
                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>
{/*
                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                    <ModalBody>
                        <Intl str="categoria-excluir-mensagem" params={[this.state.modalParam.nome]}></Intl>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.excluir()}><Intl str="excluir"></Intl></Button>
                        <Button color="secondary" onClick={toggle} className="espacamento"><Intl str="cancelar"></Intl></Button>
                    </ModalFooter>
                </Modal>
*/}
            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

CategoriaList.propTypes = {
    data: PropTypes.object,
    doSubmit: PropTypes.func,
    doSetPage: PropTypes.func
};

CategoriaList = reduxForm({ 
    form: "CategoriaList", 
    validate 
})(CategoriaList);

export default CategoriaList;
