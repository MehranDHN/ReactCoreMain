import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row, Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const customers = [
    { id: 1, companyName: 'Company 1', address: 'Address 1' },
    { id: 2, companyName: 'Company 2', address: 'Address 2' },
    { id: 3, companyName: 'Company 3', address: 'Address 3' },
    { id: 4, companyName: 'Company 4', address: 'Address 4' },
    { id: 5, companyName: 'Company 5', address: 'Address 5' }
];
const productCategories = [
    { id: 1, categoryName: 'Category 1' },
    { id: 2, categoryName: 'Category 2' },
    { id: 3, categoryName: 'Category 3' }
];
const productDataSource = [
    { id: 1, categoryId: 1, productName: 'Product 1', price: 350  },
    { id: 2, categoryId: 3, productName: 'Product 2', price: 260 },
    { id: 3, categoryId: 1, productName: 'Product 3', price: 180 },
    { id: 4, categoryId: 2, productName: 'Product 4', price: 900 },
    { id: 5, categoryId: 3, productName: 'Product 5', price: 170 },
    { id: 6, categoryId: 2, productName: 'Product 6', price: 215 }
];
const dataItems = [
    {id: 1, productCategory: 1, productId: 1, qty: 1, price: 350, description: 'Description 1' },
    {id: 2, productCategory: 3, productId: 2, qty: 3, price: 260, description: 'Description 2' },
    {id: 3, productCategory: 1, productId: 3, qty: 2, price: 180, description: 'Description 3' },
    {id: 4, productCategory: 2, productId: 4, qty: 2, price: 900, description: 'Description 4' },
    {id: 5, productCategory: 3, productId: 5, qty: 4, price: 170, description: 'Description 5' }
];
function TitleHeader(props) {
    return (
        <Row className="invoiceTitleBack">
            <Col md={12} className="invoiceMainTitle">
                {props.caption}
            </Col>
        </Row>
    );
}
function InvoiceHeader(props) {
    return (
        <tr>
            <th>#</th>
            <th className="CategoryColumn">Product Category</th>
            <th>Product Name</th>
            <th className="QtyColumn">Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Description</th>
            <th>...</th>
        </tr>
    );
}
class InvoiceMasterTitle extends Component {
    constructor(props) {
        super(props);
    };
    handleCustomerChange = (evt) => {
        this.props.onCustomerChange(evt);
    };
    handleInvoiceNumberChange = (evt) => {

    };
    handleInvoiceDateChange = (evt) => {

    };
    render = () => {
        return (
            <Row className="invoiceTitleBack">
                <Col md={1}>
                    Customer
                </Col>
                <Col md={3}>
                    <CustomerSelect
                        initialCustomer={this.props.initialCustomer}
                        dataSource={this.props.customersDataSource}
                        handleChange={this.handleCustomerChange} />
                </Col>
                <Col md={1}>
                    Invoice#
                </Col>
                <Col md={2}>
                    <input type="number" className="form-control" value="1290" onChange={this.handleInvoiceNumberChange} />
                </Col>
                <Col md={1}>
                </Col>
                <Col md={1}>
                    Date
                    </Col>
                <Col md={3}>
                    <input type="date" className="form-control" onChange={this.handleInvoiceDateChange} />
                </Col>
            </Row>
        );
    };
};
class InvoiceFooter extends Component {
    constructor(props) {
        super(props);
    }
    handleAddRow = () => {
        this.props.onAddRow();       
    };
    handleClickSave = () => {
        this.props.onSave();
    };
    render() {
        return (
            <Row className="invoiceFooterBack">
                <Col md={10}>
                    Total Price: {this.props.invoiceTotlal} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Col>
                <Col md={2}>
                    <Button bsStyle="primary" onClick={this.handleAddRow}><Glyphicon glyph="plus" /></Button>&nbsp;&nbsp;
                    <Button bsStyle="warning" onClick={this.handleClickSave}><Glyphicon glyph="save" /></Button>
                </Col>
            </Row>
        );
    };
}
export class InvoiceContainer extends Component {
    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = {
            invoiceItems: [],
            customers: customers,
            selectedCustomer: customers[2],
            categories: productCategories,
            products: productDataSource,
            loading: true
        }


    }
    componentWillMount = () => {
        console.log('componentWillMount');
    };
    componentDidMount = () => {
        console.log('componentDidMount');
        fetch('api/Invoice/GetInvoice')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState(
                    {
                        invoiceItems: data,
                        customers: customers,
                        selectedCustomer: customers[2],
                        categories: productCategories,
                        products: productDataSource,
                        loading: false
                    }
                );
            });
    };
    componentWillReceiveProps = (nextProps) => {
        console.log('componentWillReceiveProps');
        console.log(nextProps);
    };
    shouldComponentUpdate = (nextProps, nextState) => {
        console.log('shouldComponentUpdate');
        console.log(nextProps);
        console.log(nextState);
        return true;
    };
    componentWillUpdate = () => {
        console.log('componentWillUpdate');
    };
    handleCategoryChange = (evt, item) => {
        let selectedCategory = this.state.categories.find((c) => c.id == evt.target.value);
        let productsInSelectedCategory = this.state.products.filter(product => product.categoryId == evt.target.value);
        this.setState({
            invoiceItems: this.state.invoiceItems.map(i => {
                if (i.id !== item.id) {
                    return i;
                }
                else {
                    return Object.assign({}, i, {
                        productCategory: selectedCategory.id,
                        productId: productsInSelectedCategory[0].id,
                        price: productsInSelectedCategory[0].price,
                        qty:1,
                    });
                }
            })
        });
    };
    handleProductChange = (evt, item) => {
        let selectedProduct = this.state.products.find((c) => c.id == evt.target.value);
        this.setState({
            invoiceItems: this.state.invoiceItems.map(i => {
                if (i.id !== item.id) {
                    return i;
                }
                else {
                    return Object.assign({}, i, {
                        productId: selectedProduct.id,
                        price: selectedProduct.price,
                        qty: 1,
                    });
                }
            })
        });
    };
    handleQtyChange = (evt, item) => {
        let newValue = parseInt(evt.target.value);
        if (newValue<1) {
            newValue = 1;
        }
        this.setState({
            invoiceItems: this.state.invoiceItems.map(i => {
                if (i.id !== item.id) {
                    return i;
                }
                else {
                    return Object.assign({}, i, {
                        qty: newValue,
                    });
                }
            })
        });
    };
    handleCustomerChange = (evt) => {
        let selectedCustomer = this.state.customers.find((c) => c.id == evt.target.value);
        this.setState({
            selectedCustomer: selectedCustomer
        }, () => {
            console.log("setState Callback in handleCustomerChange");
            console.log(this.state);
        });
    };
    deleteItem = (_id) => {
        this.setState({ invoiceItems: this.state.invoiceItems.filter(i => i.id !== _id) });
    };
    onClickAddRow = () => {
        let maxId = 1;
        this.state.invoiceItems.forEach((v, i) => {
            if (v.id > maxId) {
                maxId = v.id;
            }
        });
        let defaultProduct = this.state.products[0];
        this.setState({
            invoiceItems: [...this.state.invoiceItems,
                {
                    id: (maxId+1),
                    productCategory: defaultProduct.categoryId,
                    productId: defaultProduct.id,
                    qty: 1,
                    price: defaultProduct.price,
                    description: 'Default Description'
                }]
        });
    };
    onClickSave = () => {
        console.log(this.state.invoiceItems);
    };
    render() {
        console.log('render');
        let totalPrice = 0;
        this.state.invoiceItems.forEach((v, i) => {
            totalPrice += (v.qty * v.price);
        });
        if (this.state.loading) {
            return (
                <Grid className="LoadingGrid" fluid>
                    <p><em>Loading...</em></p>
                </Grid>
            );
        }
        else {
            return (
                <Grid className="InvoiceGrid" fluid>
                    <TitleHeader caption="Title comes Here" />
                    <InvoiceMasterTitle
                        initialCustomer={this.state.selectedCustomer.id}
                        customersDataSource={this.state.customers}
                        onCustomerChange={this.handleCustomerChange} />
                    <InvoiceItemList                         
                        items={this.state.invoiceItems}
                        onDeleteItem={this.deleteItem}
                        categoryDataSource={this.state.categories}
                        productDataSource={this.state.products}
                        OnCategoryChange={this.handleCategoryChange}
                        OnProductChange={this.handleProductChange}
                        OnQtyChange={this.handleQtyChange} />
                    <InvoiceFooter
                        onAddRow={this.onClickAddRow}
                        onSave={this.onClickSave}
                        invoiceTotlal={totalPrice}/>
                </Grid>
            );
        }
    }
}
class InvoiceItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleDeleteItem = (_id) => {
        this.props.onDeleteItem(_id);
    }
    handleCategoryChange = (evt, item) => {
        this.props.OnCategoryChange(evt, item);
    };
    handleProductChange = (evt, item) => {
        this.props.OnProductChange(evt, item);
    };
    handleQtyChange = (evt, item) => {
        this.props.OnQtyChange(evt, item);
    };
    render() {
        let rowCounter = 1;
        let items = this.props.items.map(item =>
            <InvoiceItem
                key={item.id}
                row={rowCounter++}
                item={item}
                onDeleteItem={this.handleDeleteItem}
                categoryList={this.props.categoryDataSource}
                productList={this.props.productDataSource}
                categoryChange={this.handleCategoryChange}
                productChange={this.handleProductChange}
                qtyChange={this.handleQtyChange} />
        );
        return (<Row>
            <Col md={12}>
                <Table responsive striped className="InvoiceItemList">
                        <thead>
                            <InvoiceHeader />
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </Table>
            </Col>
        </Row>);
    }
}
class InvoiceItem extends React.Component {
    constructor(props) {
        super(props);
    }
    handleDeleteItem = () => {
        this.props.onDeleteItem(this.props.item.id);
    };
    handleCategoryChange = (evt) => {
        this.props.categoryChange(evt, this.props.item);
    };
    handleProductChange = (evt) => {
        this.props.productChange(evt, this.props.item);
    };
    handleQtyChange = (evt) => {
        this.props.qtyChange(evt, this.props.item);
    };
    render() {
        let productList = this.props.productList.filter(product => product.categoryId === this.props.item.productCategory);
        return (
            <tr>
                <td>{this.props.row}</td>
                <td className="CategoryColumn">
                    <CategorySelect
                        dataSource={this.props.categoryList}
                        boundItem={this.props.item}
                        handleChange={this.handleCategoryChange} />
                </td>
                <td>
                    <ProductSelect
                        dataSource={productList}
                        boundItem={this.props.item}
                        handleChange={this.handleProductChange} />
                </td>
                <td className="QtyColumn"><input type="number" value={this.props.item.qty} onChange={this.handleQtyChange} className="form-control" /></td>
                <td>{this.props.item.price}</td>
                <td>{this.props.item.price * this.props.item.qty}</td>
                <td>{this.props.item.description}</td>
                <td><Button bsStyle="danger" onClick={this.handleDeleteItem}><Glyphicon glyph='trash'/></Button></td>
            </tr>
        );
    };
}
class ProductSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (event) => {
        this.props.handleChange(event);
    }
    render = () => {
        let optionsList = this.props.dataSource.map(product =>
            <option key={product.id} value={product.id}>{product.productName}</option>
        );
        return (
            <select className="form-control" value={this.props.boundItem.productId} onChange={this.handleChange}>
                {optionsList}
            </select>
        );
    }
}
class CategorySelect extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (event) => {
        this.props.handleChange(event);
    }
    render() {
        let optionsList = this.props.dataSource.map(category => 
            <option key={category.id} value={category.id}>{category.categoryName}</option>
        );
        return (
            <select className="form-control" value={this.props.boundItem.productCategory} onChange={this.handleChange}>
                {optionsList}
            </select>
        );
    }
}
class CustomerSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (event) => {
        this.props.handleChange(event);
    }
    render() {
        let optionsList = this.props.dataSource.map(customer =>
            <option key={customer.id} value={customer.id}>{customer.companyName}</option>
        );
        return (
            <select className="form-control" value={this.props.initialCustomer} onChange={this.handleChange}>
                {optionsList}
            </select>
        );
    }
}

InvoiceItem.propTypes = {
    row: PropTypes.number,
    item: PropTypes.object,
    onDeleteItem: PropTypes.func,
    categoryList: PropTypes.array,
    categoryChange: PropTypes.func,
    productChange: PropTypes.func,
    qtyChange: PropTypes.func
};