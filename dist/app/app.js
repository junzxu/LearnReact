"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const skypeappsdk_1 = require("skypeappsdk");
require("./index.css");
;
;
;
;
let _styles = {
    button: {
        background: 'black',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        cursor: 'pointer',
        display: 'flex',
        text: 'center',
        margin: 'auto'
    }
};
let getData = () => {
    return fetch('/data').then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error("failed to get data");
        }
    })
        .catch((error) => {
        console.log(error.message);
    });
};
class MyButton extends React.Component {
    render() {
        return React.createElement("button", { onClick: this.props.handleClick, style: _styles.button }, "Refresh");
    }
}
class MyItem extends React.Component {
    render() {
        let card = {
            id: this.props.item.title,
            title: this.props.item.title,
            text: this.props.item.text
        };
        return React.createElement(skypeappsdk_1.SummaryCard, { key: this.props.item.title, card: card });
    }
}
class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            getData()
                .then((items) => {
                if (items) {
                    this.setState({ items: items });
                }
            });
        };
        this.handleClick = this.handleClick.bind(this);
        this.state = { items: [] };
    }
    render() {
        const items = this.state.items.map((item) => React.createElement(MyItem, { item: item, key: item.title }));
        return (React.createElement("div", null,
            this.state.items.length == 0 && React.createElement(skypeappsdk_1.EmptyView, { message: "No item" }),
            items,
            React.createElement(MyButton, { handleClick: this.handleClick })));
    }
}
ReactDOM.render(React.createElement(MyApp, null), document.getElementById("app"));
//# sourceMappingURL=app.js.map