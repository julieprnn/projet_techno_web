import React from 'react'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state ={counter: 0}
    }

    increment(){
        this.setState(state=> ({ counter: state.counter +1}))
    }

    render () {
        return <div onClick={() => this.increment()}>
            Hello {this.props.name}
            ({this.state.counter}clicks)
        </div>
    }
}