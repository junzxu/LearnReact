import React = require('react');
import { render } from 'react-dom';
import ReactDOM = require('react-dom');
import { EmptyView, SummaryCard, SummaryCardData } from 'skypeappsdk';
import './index.css';

interface Item {title: string; text?: string};
interface MyItemProps {item:Item};
interface MyButtonProps {handleClick: ()=>void};
interface MyAppState { items: Item[] };

 const _styles = {
     button:{
        background: 'black',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        cursor: 'pointer',
        display: 'flex',
        text: 'center',
        margin: '20px auto'
     },
     header:{
        textAlign: 'center',
        margin: 'auto'
     }
}

const getData = (): Promise<Item[]> => {
    return fetch('/data').then((response) => {
        if(response.ok) {
            return response.json();
        }
        else {
            throw new Error("failed to get data");
        }
    })
    .catch((error) => {
        console.log(error.message);
    })
}

const Header = (props:{title:string}) => <h1 style={_styles.header}>{props.title}</h1>

class MyButton extends React.Component<MyButtonProps, any> {
    render() {
        return <button onClick = {this.props.handleClick} style={_styles.button}>Refresh</button>;
    }
}

class MyItem extends React.Component<MyItemProps, any> {
    render() {
        let card = {
            id: this.props.item.title,
            title: this.props.item.title,
            text: this.props.item.text
        } as SummaryCardData;

        return <SummaryCard 
                key={this.props.item.title}
                card={card}/>;
    }
}

// another way to construct stateless Component
const MyItemList = ({items}:{items:Item[]}) =>
{
    if(items.length > 0) {
        return (
            <div>
                {items.map(item => <MyItem item={item} key={item.title}/>)}
            </div>
        );
    }
    else {
        return <EmptyView message="No item" />;
    }
};

class MyApp extends React.Component<any, MyAppState> {
    constructor(props:any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {items: [] };
    }

    handleClick = () => {
        getData()
        .then((items) => {
            if(items){
                this.setState({items: items});
            }
        });
    }

    render() {
        return (
            <div>
                <Header title='Learn React'/>
                <MyItemList items={this.state.items} />
                <MyButton handleClick={this.handleClick}/>
            </div>
        );
    }
}

ReactDOM.render(
    <MyApp />,
    document.getElementById("app")
);