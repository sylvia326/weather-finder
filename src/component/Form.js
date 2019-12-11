import React, {Component} from 'react'

export default  class Form extends Component {

    render(){
        return(
            <div>
                <form onSubmit={this.props.getWeather}>
                    <input type="text" name="city" placeholder="City Name"/>
                    <input type="text" name="country" placeholder="Country Name"/>
                    <button>Get Weather</button>
                </form>

            </div>
        )
    }
}
