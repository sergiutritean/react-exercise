import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestAddItem,
  requestPageData,
  requestDeleteItem
} from '../modules/ui/actions';

class Entries extends Component {
  constructor(){
    super();
    this.state = {}
  }
  componentDidMount() {
    this.props.requestPageData();
  }

  exportData = (entry, index) => {
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
    return (
      <tr key={entry.uuid}>
        <th scope="row">{index+1}</th>
        <td style={{textAlign: "right"}}>{entry.lenght} cm</td>
        <td style={{textAlign: "right"}}>{entry.weight} g</td>
        <td>
                <span className={"badge " + resultStatusMapper[entry.result].badge}>
                  {resultStatusMapper[entry.result].text}
                </span>
        </td>
        <td>{parseFloat(entry.min).toFixed(3)}</td>
        <td>{parseFloat(entry.max).toFixed(3)}</td>
        <td>{parseFloat(entry.avg).toFixed(3)}</td>
        <td>
                <span style={{color: resultStatusMapper[entry.result].color}}
                      onClick={() => this.props.requestDeleteItem(entry.uuid)}>
                  <i className={"fas fa-trash-alt"}> </i>
                </span>
        </td>
      </tr>
    )
  };

  render() {
      return (
        <React.Fragment>
            <div className="col-6" style={{borderLeft: "1px dashed #333"}} id="results">
                <h4 style={{textAlign: "center"}}>Your computed results will appear here!</h4>
                <div className="row" style={{marginTop: "2em"}}>
                    <div className="col">
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-striped mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Length</th>
                                    <th scope="col">Weight</th>
                                    <th scope="col">Result</th>
                                    <th scope="col">Min (g)</th>
                                    <th scope="col">Avg (g)</th>
                                    <th scope="col">Max (g)</th>
                                    <th scope="col"><span style={{color: "black"}} onClick= { () => this.props.requestDeleteItem('all')}><i
                                        className="fas fa-trash-alt"></i></span></th>
                                </tr>
                                </thead>
                                <tbody id="defaultResultsTableBody">
                                { this.props.ui && this.props.ui.data.map( (entry,index) => this.exportData(entry,index)) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
      requestPageData,
      requestDeleteItem
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entries);