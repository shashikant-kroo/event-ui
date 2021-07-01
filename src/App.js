import Chart from "react-google-charts";
import React, {useState} from "react";

import {microserviceData} from "./mock-data/mock-data";
import {microServiceType} from "./Constants/constants";


// class App extends React.Component {
//
// }

function App() {

  const microservices = (Object.keys(microserviceData.services))
  let data = [
    ['Name', 'Manager', 'ToolTip'],
  ]

  microservices.forEach(service => {
    data.push(
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


  const [root, setRoot] = useState(data)

  const createNode = (serviceName) => {
    return [
      {
        v: {serviceName},
        f: `${serviceName}<div style="color:red; font-style:italic">Resource</div>`,
      },
      microServiceType.ACCOUNT_MICRO_SERVICE,
      serviceName,
    ]
  }

  const accountNode = (data) => {
    const newData = data
    const resources = microserviceData.resourcesByService.accountService.map(serviceName => {
      console.log("serviceName :", serviceName)
      return newData.push(
        createNode(serviceName)
      )
    })

    console.log("resources :",resources)
    return resources
  }

  const showAccountResources = () => {

    const newData = accountNode(data)


    // newData.push(
    //   [
    //     {
    //       v: "xyz",
    //       f: `xyz<div style="color:red; font-style:italic">Resource</div>`,
    //     },
    //     microServiceType.ACCOUNT_MICRO_SERVICE,
    //     "xyz",
    //   ]
    // )
    //
    //
    // newData.push(
    //   [
    //     {
    //       v: "xyz1",
    //       f: `xyz1<div style="color:red; font-style:italic">Resource</div>`,
    //     },
    //     microServiceType.ACCOUNT_MICRO_SERVICE,
    //     "xyz1",
    //   ]
    // )

    console.log("newData :", newData)

    setRoot(newData)
  }

  const handleClickEvent = ({chartWrapper}) => {
    const chart = chartWrapper.getChart()
    const selection = chart.getSelection()

    if (selection.length === 1) {
      const [selectedItem] = selection
      const dataTable = chartWrapper.getDataTable()

      console.log("dataTable :", dataTable)
      console.log("selectedItem :", selectedItem)

      const {row} = selectedItem

      switch (dataTable.getValue(row, 0)) {
        case microServiceType.ACCOUNT_MICRO_SERVICE:
          showAccountResources()
      }

    }
  }

  return (
    <div style={{display: "flex", maxWidth: 900}}>
      <Chart
        width={'100%'}
        height={350}
        chartType="OrgChart"
        loader={<div>Loading Chart</div>}
        data={
          root
        }
        chartEvents={
          [
            {
              eventName: "select",
              callback: handleClickEvent
            }
          ]
        }
        options={{
          allowHtml: true,
        }}
        rootProps={{'data-testid': '1'}}
      />
    </div>
  );
}

export default App;
