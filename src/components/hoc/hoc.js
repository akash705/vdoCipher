import React from 'react';

export class hoc extends React.Component{
    render(){
        return (
            this.props.children
        )
    }
}
export default hoc;