import React from "react";
import {connect} from "react-redux";
import Chart from "react-google-charts";

import {microServiceType, resourceType} from "./Constants/constants";
import {fetchMicroserviceData} from "./redux/microservice/microservice.action"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = null
    this.state = {
      data: [
        ['Name', 'Manager', 'ToolTip']
      ]
    }
  }

  componentDidMount() {
    this.props.fetchMicroservicesData()
  }

  createResourceNode = (serviceName, microserviceType) => {
    return [
      {
        v: `${serviceName}`,
        f: `${serviceName}<div style="color:red; font-style:italic">Resource</div>`,
      },
      microserviceType,
      serviceName,
    ]
  }

  createEventNode = (eventName, resourceType) => {
    return [
      {
        v: `${eventName}`,
        f: `${eventName}<div style="color:red; font-style:italic">Event</div>`,
      },
      resourceType,
      eventName,
    ]
  }

  showResources(service, name) {
    const resources = service
      .map(serviceName => this.createResourceNode(serviceName, name))

    this.setState({data: [...this.state.data, ...resources]})
  }

  showEvents = (resource, resourceName) => {
    const events = resource
      .map(eventName => this.createEventNode(eventName, resourceName))

    this.setState({data: [...this.state.data, ...events]})
  }


  updateInitialStateForMicroservice = () => {
    if (this.props.serviceData?.services) {
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

  handleClickEvent = ({chartWrapper}) => {
    const chart = chartWrapper.getChart()
    const selection = chart.getSelection()
    const {resourcesByService} = this.props.serviceData
    const {eventsByResource} = this.props

    if (selection.length === 1) {
      const [selectedItem] = selection
      const dataTable = chartWrapper.getDataTable()
      const {row} = selectedItem
      const clickedItem = dataTable.getValue(row, 0)

      console.log("clickedItem :", clickedItem)
      switch (clickedItem) {

        //  ACCOUNT_MICRO_SERVICE
        case microServiceType.ACCOUNT_MICRO_SERVICE:
          this.showResources(
            resourcesByService?.accountService,
            microServiceType.ACCOUNT_MICRO_SERVICE
          )
          break;
        case resourceType.accountServiceType.PREPAID_ACCOUNT:
          this.showEvents(
            eventsByResource?.prepaidAccount,
            resourceType.accountServiceType.PREPAID_ACCOUNT
          )
          break;
        case resourceType.accountServiceType.PAYMENT_ACCOUNT:
          this.showEvents(
            eventsByResource?.paymentAccount,
            resourceType.accountServiceType.PAYMENT_ACCOUNT
          )
          break;
        case resourceType.accountServiceType.RANDOM_RESOURCE:
          this.showEvents(
            eventsByResource?.randomResource,
            resourceType.accountServiceType.RANDOM_RESOURCE
          )
          break;

        //  ON_BOUND_PAYMENT_SERVICE
        case microServiceType.OUT_BOUND_PAYMENT_SERVICE:
          this.showResources(
            resourcesByService?.outboundPaymentService,
            microServiceType.OUT_BOUND_PAYMENT_SERVICE
          )
          break;
        case resourceType.outBoundServiceType.OUT_BOUND_PAYMENT:
          this.showEvents(
            eventsByResource?.outboundPayment,
            resourceType.outBoundServiceType.OUT_BOUND_PAYMENT
          )
          break;

        // PREPAID_ACCOUNT_SERVICE
        case microServiceType.PREPAID_ACCOUNT_SERVICE:
          this.showResources(
            resourcesByService?.prepaidAccountService,
            microServiceType.PREPAID_ACCOUNT_SERVICE
          )
          break;
        case resourceType.prepaidAccountType.PREPAID_ACCOUNT:
          this.showEvents(
            eventsByResource?.prepaidAccount,
            resourceType.prepaidAccountType.PREPAID_ACCOUNT
          )
          break;
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
  fetchMicroservicesData: () => dispatch(fetchMicroserviceData())
})

const mapStateToProps = (
  {
    microserviceData: {serviceData, eventsByResource}
  }) => ({
  serviceData,
  eventsByResource
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
