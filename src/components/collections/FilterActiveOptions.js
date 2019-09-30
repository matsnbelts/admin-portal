import React from 'react'
import './JobAssociateFilter.css'

class FilterActiveOptions extends React.Component {
    changeOption = (e) => {
        var val = e.target.value;
        this.props.changeOption(val);
    }
    createOptions = (options) => {
        let opts = []
        options.forEach((key,value, set) => {
            if(typeof key == 'string')
                opts.push(<option key={key} value={key}>{key}</option>);
        }
        );
        return opts
    }
    render() {
        return (
            <div>
                <div className='associateFilterOptionsContainer'>
                    <label className='associateLabel'>Active:</label>
                    <select className='associate-filter' id="activeFilter" value={this.props.active} onChange={this.changeOption.bind(this)}>
                        {
                            this.createOptions(this.props.activeOptions)
                        }
                    </select>
                    </div>
            </div>
                )
    }
}
export default FilterActiveOptions