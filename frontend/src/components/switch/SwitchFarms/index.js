import React, { Component } from "react";
import Switch from "react-switch";
import './CustomSwitch.css'

export default class KitchenSinkSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div className="example ">
 
        <label htmlFor="small-radius-switch" >
        
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
        
         
            offColor="#ffffff"
            onColor="#ffffff"
            offHandleColor="#0090ff"
            onHandleColor="#0090ff"
 
            height={40}
            width={160}
            borderRadius={20}
            activeBoxShadow="0px 0px 1px 2px #fffc35"
  checkedIcon={
              <div className="text-gray-400 ml-8"
               
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  paddingLeft: '0.1rem'
                }}
              >
                Live
              </div>
            }
            uncheckedIcon={
              <div className="text-gray-400 mr-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
              
                  paddingLeft: '0.1rem'
                }}
              >
                Finished
              </div>
            }
         
    uncheckedHandleIcon={
              <div  className="ml-8 text-sm text-white"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 18,
                  

                }}
              >
                Live
              </div>
            }
            checkedHandleIcon={
              <div className="ml-8 text-white"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                
                  fontSize: 16
                }}
              >
                Finished
              </div>
            }
            className="react-switch"
            id="small-radius-switch"
          />
        </label>
    
      </div>
    );
  }
}
