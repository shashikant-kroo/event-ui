import React from "react";
import {connect} from "react-redux";
import Chart from "react-google-charts";

import {microServiceType, resourceType} from "./Constants/constants";
import {fetchMicroserviceData} from "./redux/microservice/microservice.action"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.data =  null
    this.state = {
      data :  [
        ['Name', 'Manager', 'ToolTip']
      ]
    }
  }

  componentDidMount() {
    this.props.fetchMicroservicesData()
  }

  createEntry = (serviceName, microserviceType) => {
    return [
      {
        v: `${serviceName}`,
        f: `${serviceName}<div style="color:red; font-style:italic">Resource</div>`,
      },
      microserviceType,
      serviceName,
    ]
  }


  showAccountResources (){
    const {accountService} = this.props.serviceData?.resourcesByService
    const resource = accountService
      .map(serviceName => this.createEntry(serviceName, microServiceType.ACCOUNT_MICRO_SERVICE))

    this.setState({data: [...this.state.data, ...resource]})
  }

  updateInitialStateForMicroservice = () => {
    if(this.props.serviceData?.services) {
      const microservices = Object.keys(this.props.serviceData?.services)
      microservices.forEach(service => {
        this.state.data.push(
          [
            {
              v: `${service}`,
              f: `${service}<div style="color:red; font-style:italic">Microservice</div>`,
            },
            '',
            'The root service',
          ]
        )
      })
    }
  }

  handleClickEvent =  ({chartWrapper}) => {
    const chart = chartWrapper.getChart()
    const selection = chart.getSelection()

    if (selection.length === 1) {
      const [selectedItem] = selection
      const dataTable = chartWrapper.getDataTable()
      const {row} = selectedItem

      console.log("selectedItem :", dataTable.getValue(row, 0))
      switch (dataTable.getValue(row, 0)) {
        case microServiceType.ACCOUNT_MICRO_SERVICE:
          this.showAccountResources()
        case resourceType.accountServiceType.PREPAID_ACCOUNT:
        case resourceType.accountServiceType.PAYMENT_ACCOUNT:
        case resourceType.accountServiceType.RANDOM_RESOURCE:
      }

    }
  }

  render() {
    this.updateInitialStateForMicroservice()
    return (
      <div style={{display: "flex"}}>
        <Chart
          width={'100%'}
          height={350}
          chartType="OrgChart"
          loader={<div>Loading Chart</div>}
          data={
            this.state.data
          }
          chartEvents={
            [
              {
                eventName: "select",
                callback: this.handleClickEvent
              }
            ]
          }
          options={{
            allowHtml: true,
          }}
          rootProps={{'data-testid': '1'}}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMicroservicesData : () => dispatch(fetchMicroserviceData())
})

const mapStateToProps = ({microserviceData : {serviceData}}) => ({
  serviceData
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
