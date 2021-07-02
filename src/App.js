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

  const createEntry = (serviceName) => {
    return [
      {
        v: `${serviceName}`,
        f: `${serviceName}<div style="color:red; font-style:italic">Resource</div>`,
      },
      microServiceType.ACCOUNT_MICRO_SERVICE,
      serviceName,
    ]
  }

  function accountNode (data){
    const resource = microserviceData.resourcesByService.accountService
      .map(serviceName => createEntry(serviceName))

    console.log([...data, ...resource])
    return [...data, ...resource]
  }

  function showAccountResources (){
    setRoot( accountNode(data))
  }

  async function handleClickEvent ({chartWrapper}) {
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
