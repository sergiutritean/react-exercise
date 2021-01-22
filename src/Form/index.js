import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import {
  requestAddItem,
} from '../modules/ui/actions';

class Form extends Component {
  state = {
    newEntry: false,
    newEntryUsed: false,
  };

  addPanel = async (elem) => {
    const resultStatusMapper = [
      {
        text: 'UNDERWEIGHT',
        color: 'red',
        icon: 'fa-times',
        badge: 'badge-danger',
        panel: 'bg-danger',
      },
      {
        text: 'OPTIMAL WEIGHT',
        color: 'green',
        icon: 'fa-check',
        badge: 'badge-success',
        panel: 'bg-success',
      },
      {
        text: 'ABOVE OPTIMAL WEIGHT',
        color: 'orange',
        icon: 'fa-check',
        badge: 'badge-warning',
        panel: 'bg-warning',
      },
      {
        text: 'OVERWEIGHT',
        color: 'red',
        icon: 'fa-times',
        badge: 'badge-danger',
        panel: 'bg-danger',
      },
    ];
    await this.setState({
      newEntry: true,
      len: elem.lenght,
      weight: elem.weight,
      panel: resultStatusMapper[elem.result].panel,
      text: resultStatusMapper[elem.result].text,
    });
  };

  onAdd = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    let defaultLenght = data.get('defaultLenght');
    let defaultWeight = data.get('defaultWeight');
    let fun = () => {
      let propsLen = this.props.ui.data.length;
      this.addPanel(this.props.ui.data[propsLen-1]);
    };
    this.props.requestAddItem({defaultLenght,defaultWeight,fun});

  };

  onReset = async () => {
    await this.setState({
      newEntry: false,
      newEntryUsed: false,
    });
    document.getElementById("#form").reset();
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-4" id="form" >
          <div className="row">
            <div className="col">
              <div className="card">
                <h5 className="card-header info-color white-text text-center py-4">
                  <strong>EMYS ORBICULARIS</strong> <br/>
                  <strong>HIBERNATION CALCULATOR</strong>
                </h5>
                <div className="card-body px-lg-5 pt-0">
                  <form style={{color: "#757575"}} onSubmit={this.onAdd} id={"#form"}>
                    <div className="md-form">
                      <label htmlFor="defaultLength">Shell length (cm)</label>
                      <input type="number" step="0.001" id="defaultLength" name={"defaultLenght"} className="form-control"
                             aria-label="Shell length (cm)" required/>
                    </div>
                    <div className="md-form">
                      <label htmlFor="defaultWeight">Weight before hibernation (g)</label>
                      <input type="number" step="0.001" id="defaultWeight" className="form-control"
                             aria-label="Weight before hibernation (g)" name={"defaultWeight"} required/>
                    </div>

                    <button
                      className={ "btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" }
                      type="submit" id="defaultSubmit">Compute
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/*Results*/}
          <div className="row" style={{marginTop: "2em"}}>
            <div className="col-2"> </div>
            <div className="col-8">
              <div id="defaultResult" className={'card text-white text-center mb-3 ' + (this.state.newEntry ? this.state.panel : ' result-post-hidden ')}
                   style={{maxWidth: "20rem"}}>
                <div className="card-header">
                  <span id="resultLength">{this.state.newEntry && this.state.len} </span>cm | <span id="resultWeight">{this.state.newEntry && this.state.weight}</span>g
                </div>
                <div className="card-body">
                  <h5 className="card-title" id="resultValid">{this.state.newEntry && this.state.text}</h5>
                </div>
              </div>
            </div>
          </div>
          <button
            className={'btn btn-outline-warning btn-rounded btn-block my-4 waves-effect z-depth-0' + (this.state.newEntry ? "" : " result-post-hidden")}
            type="button" id="defaultReset" onClick={this.onReset}>Reset
          </button>
        </div>
      </React.Fragment>
    );
  }

}

function mapStateToProps(appState, ownProps) {

  return {
    ui: appState.ui,
  }
}

function mapDispatchToProps(dispatch) {

  return {
    ...bindActionCreators({
      requestAddItem,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);