import React from "react";
import {connect} from "react-redux";
import Chart from "react-google-charts";
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

  createResourceNode = (resourceName, microserviceName) => {
    return [
      {
        v: `${resourceName}`,
        f: `${resourceName}<div style="color:red; font-style:italic">Resource</div>`,
      },
      microserviceName,
      resourceName,
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

  showResources(resources, microserviceName) {
    const updatedResources = resources
      .map(serviceName => this.createResourceNode(serviceName, microserviceName))

    this.setState({data: [...this.state.data, ...updatedResources]})
  }

  showEvents = (events, resourceName) => {
    const updatedEvents = events
      .map(eventName => this.createEventNode(eventName, resourceName))

    this.setState({data: [...this.state.data, ...updatedEvents]})
  }


  updateInitialStateForMicroservice = () => {
    if (this.props.serviceData) {
      const microservices = Object.keys(this.props.serviceData)
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

  isMicroserviceClicked = (selectedResource) => {
    const services = Object.keys(this.props.serviceData)
    return services.some(resource => resource === selectedResource)
  }

  handleClickEvent = ({chartWrapper}) => {
    const chart = chartWrapper.getChart()
    const selection = chart.getSelection()
    const servicesData = this.props.serviceData

    if (selection.length === 1) {
      const [selectedItem] = selection
      const dataTable = chartWrapper.getDataTable()
      const {row} = selectedItem
      const clickedItemName = dataTable.getValue(row, 0)

      if (this.isMicroserviceClicked(clickedItemName)) {
        const projections = servicesData?.[clickedItemName]?.projections
        const resourcesForClickedService = Object.keys(projections)

        this.showResources(resourcesForClickedService, clickedItemName)

      } else {
        const serviceNameForClickedResource = this.props.resourceServiceMap[clickedItemName]
        if (serviceNameForClickedResource) {
          this.showEvents(
            servicesData?.[serviceNameForClickedResource]?.projections?.[clickedItemName]
            , clickedItemName)
        }
      }
    }
  }


  render() {
    this.updateInitialStateForMicroservice()
    return (
      <div style={{display: "flex", overflow: "auto", justifyContent: "center",  flexDirection: "column", padding: 30+ "px"}}>
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
    microserviceData: {serviceData, resourceServiceMap}
  }) => ({
  serviceData,
  resourceServiceMap
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
