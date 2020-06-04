import React, { Component } from 'react';

class HomePage extends Component {

    state = {
        current: null,
        hovered: null,
        // isTooltipVisible: false,
        // tooltipY: 0,
        // tooltipX: 0,
    };

    onClick = (e) => {
        const district = e.target.attributes.name.value;
        this.props.history.push({pathname: '/posts/' + district});
    };
    setCurrent = id => this.setState({ current: [id] });
    clearCurrent = () => this.setState({ current: null });
    onMouseEnter = e => this.setState({ hovered: e.target.attributes.name.value });
    onMouseLeave = () => this.setState({ hovered: null });
    // onMouseOver = e => this.setState({ current: e.target.attributes.name.value });
    // onMouseMove = e =>
    //     this.setState({
    //         isTooltipVisible: true,
    //         tooltipY: e.clientY + 10,
    //         tooltipX: e.clientX + 10,
    // });
    // onMouseOut = () => this.setState({ current: null, isTooltipVisible: false });


    render() {
        return (
          <div className="g-row">
            <div className="g-col">
              <h1>Engineering Students Conference 2020</h1>
            </div>
    
          </div>
        );
    }
}

export default HomePage