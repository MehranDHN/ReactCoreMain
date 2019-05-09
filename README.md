# ReactCoreMain
Training to create stateful React Component

Creating sophisticated UI in a typical ASP .NET MVC core project is always a big chalenge.
React is only the ‘V’ part of MVC and as such is not opinionated in how you architect your UI.

If proper attention is not given, a reasonably large react app can quickly succumb to a mess of stateful components, each with a mind of it’s own, quickly violating the react way of doing things.
There are several key points one must keep in mind while building with React:

1-Stateless components

2-Composition

3-Centralised state management with Redux.

The entry point and main component is`InvoiceContainer` and the code of it's render method is as follows:

```js
    render() {
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
```



![MehranDHN ReactCore](https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/42249069_10215939619376918_4820808405566357504_n.jpg?_nc_cat=107&oh=7a54a683ad6caa0863146ad658215051&oe=5C3366AA)
