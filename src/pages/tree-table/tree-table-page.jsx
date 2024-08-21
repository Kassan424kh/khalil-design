import React, { createContext, useState } from "react"
import TreeTable from "../../components/tree-table/tree-table";


export const TreeTableContext = createContext();

const TreeTablePage = () => {
  const [expandAllRows, setExpandAllRows] = useState(null);
  const [fetchDataTimes, setFetchDataTime] = useState(0);


  const onScrollTable = (event) => {
    // console.log("User scrolled:", event.target.scrollTop);
    let element = document.getElementById("lhub-body-app-container-content");
    element?.scrollBy(0, event.target.scrollTop);
  };


  return (
    <div className="page infos-card-page">
      <TreeTableContext.Provider value={{ expandAllRows, setExpandAllRows, fetchDataTimes, setFetchDataTime }}>
        <TreeTable
          setExpandAllRows={setExpandAllRows}
          onScrollTable={onScrollTable}
          data={treeTableDommyData}
        />
      </TreeTableContext.Provider>
    </div>
  );
};

export default TreeTablePage;


const treeTableDommyData = [
  {
      "headline": "Activision Blizzard",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "bpn Deutschland GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 28133,
                                      "Customer": "Activision Blizzard",
                                      "IdProductFamily": 28403,
                                      "ProductFamily": null,
                                      "IdProduct": 28404,
                                      "Product": "Overwatch 2",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 13871,
                                      "Campaign": "Activision Blizzard UK Ltd_Blizzard_2022_Overwatch 2_LAUNCH",
                                      "briefing_id": 5,
                                      "start": "1999-12-12",
                                      "end": "1999-12-13",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Overwatch 2",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  },
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "bpn Deutschland GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 28133,
                                      "Customer": "Activision Blizzard",
                                      "IdProductFamily": 28185,
                                      "ProductFamily": null,
                                      "IdProduct": 30177,
                                      "Product": "Call of Duty Cerberus",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 17568,
                                      "Campaign": "Activision_2024_Cerberus_Launch",
                                      "briefing_id": 12,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Call of Duty Cerberus",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "AIDA",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 10893,
                                      "Customer": "AIDA",
                                      "IdProductFamily": 12445,
                                      "ProductFamily": null,
                                      "IdProduct": 11434,
                                      "Product": "HRM",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 11702,
                                      "Campaign": "16_HRM SEA Always on",
                                      "briefing_id": 17,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 10893,
                                      "Customer": "AIDA",
                                      "IdProductFamily": 12445,
                                      "ProductFamily": null,
                                      "IdProduct": 11434,
                                      "Product": "HRM",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 17193,
                                      "Campaign": "18HRM Piste Rostock 2024HRM",
                                      "briefing_id": 6,
                                      "start": "2024-12-12",
                                      "end": "2024-12-15",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 10893,
                                      "Customer": "AIDA",
                                      "IdProductFamily": 12445,
                                      "ProductFamily": null,
                                      "IdProduct": 11434,
                                      "Product": "HRM",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 17209,
                                      "Campaign": "19_LinkedIn 2400HRL",
                                      "briefing_id": 7,
                                      "start": "2024-12-20",
                                      "end": "2024-12-29",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 10893,
                                      "Customer": "AIDA",
                                      "IdProductFamily": 12445,
                                      "ProductFamily": null,
                                      "IdProduct": 11434,
                                      "Product": "HRM",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 13421,
                                      "Campaign": "117_HR-Kampagne 2229WAW",
                                      "briefing_id": 4,
                                      "start": "1999-12-12",
                                      "end": "1999-12-13",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "HRM",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  },
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 10893,
                                      "Customer": "AIDA",
                                      "IdProductFamily": 12449,
                                      "ProductFamily": null,
                                      "IdProduct": 28583,
                                      "Product": "Attract",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 15142,
                                      "Campaign": "27_Always on (KVA Prozess: 900.390)",
                                      "briefing_id": 11,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Attract",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "Air Baltic",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 30153,
                                      "Customer": "Air Baltic",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 30154,
                                      "Product": "Air Baltic",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 17533,
                                      "Campaign": "Air Baltic",
                                      "briefing_id": 3,
                                      "start": "2024-07-31",
                                      "end": "2024-07-31",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Air Baltic",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "Allos Hof-Manufaktur",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "bpn Deutschland GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 10573,
                                      "Customer": "Allos Hof-Manufaktur",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 11364,
                                      "Product": "Allos",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 7718,
                                      "Campaign": "1. Flight",
                                      "briefing_id": 30,
                                      "start": "2024-08-21",
                                      "end": "2024-08-22",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Allos",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "Amazon DE",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 29,
                                      "Customer": "Amazon DE",
                                      "IdProductFamily": 10465,
                                      "ProductFamily": null,
                                      "IdProduct": 10466,
                                      "Product": "Amazon Web Services",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 8609,
                                      "Campaign": "A20AWS00DE4_TT Amazon Web Services",
                                      "briefing_id": 2,
                                      "start": "2024-09-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Amazon Web Services",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  },
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 29,
                                      "Customer": "Amazon DE",
                                      "IdProductFamily": 6926,
                                      "ProductFamily": null,
                                      "IdProduct": 30021,
                                      "Product": "HNDO S1",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 17271,
                                      "Campaign": "PVES24DEZ09_DC LRD HNDO S1",
                                      "briefing_id": 15,
                                      "start": "2024-04-11",
                                      "end": "2024-04-14",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "HNDO S1",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "American Express",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 11477,
                                      "Customer": "American Express",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 11659,
                                      "Product": "B2C Engagement",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 10734,
                                      "Campaign": "AMEX - Splitpay 2021 - P19684",
                                      "briefing_id": 31,
                                      "start": "2024-08-22",
                                      "end": "2024-08-29",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "B2C Engagement",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "ARTE Deutschland",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28474,
                                      "ProductFamily": null,
                                      "IdProduct": 11174,
                                      "Product": "Mediathek",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 3844,
                                      "Campaign": "Äquator",
                                      "briefing_id": 16,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Mediathek",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  },
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28475,
                                      "ProductFamily": null,
                                      "IdProduct": 28478,
                                      "Product": "Speedboat (ARTE GEIE)",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 16908,
                                      "Campaign": "ARTE Serien",
                                      "briefing_id": 13,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28475,
                                      "ProductFamily": null,
                                      "IdProduct": 28478,
                                      "Product": "Speedboat (ARTE GEIE)",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 16134,
                                      "Campaign": "Capital B. Wem gehört Berlin?",
                                      "briefing_id": 14,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28475,
                                      "ProductFamily": null,
                                      "IdProduct": 28478,
                                      "Product": "Speedboat (ARTE GEIE)",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "test",
                                      "briefing_id": 18,
                                      "start": "2024-08-27",
                                      "end": "2024-08-28",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Speedboat (ARTE GEIE)",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  },
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28474,
                                      "ProductFamily": null,
                                      "IdProduct": 132,
                                      "Product": "ARTE Allgemein",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "teststestate",
                                      "briefing_id": 20,
                                      "start": "2024-08-06",
                                      "end": "2024-08-30",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28474,
                                      "ProductFamily": null,
                                      "IdProduct": 132,
                                      "Product": "ARTE Allgemein",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 6735,
                                      "Campaign": "10 Jahre ARTE Concert PARIS x BERLIN",
                                      "briefing_id": 8,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28474,
                                      "ProductFamily": null,
                                      "IdProduct": 132,
                                      "Product": "ARTE Allgemein",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 7487,
                                      "Campaign": "25 Jahre Le Monde diplomatique",
                                      "briefing_id": 9,
                                      "start": "2024-02-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "ARTE Allgemein",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  },
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28475,
                                      "ProductFamily": null,
                                      "IdProduct": 28477,
                                      "Product": "Flagship (ARTE GEIE)",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 13597,
                                      "Campaign": "ARTE Re 2022",
                                      "briefing_id": 1,
                                      "start": "2024-09-12",
                                      "end": "2024-10-12",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 131,
                                      "Customer": "ARTE Deutschland",
                                      "IdProductFamily": 28475,
                                      "ProductFamily": null,
                                      "IdProduct": 28477,
                                      "Product": "Flagship (ARTE GEIE)",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 17802,
                                      "Campaign": "Summer of Champions",
                                      "briefing_id": 10,
                                      "start": "2024-12-12",
                                      "end": "2024-12-12",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Flagship (ARTE GEIE)",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "Brembo",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 30494,
                                      "Customer": "Brembo",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 30495,
                                      "Product": "Brembo Brandcampaign | Rapport",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "testastasetas",
                                      "briefing_id": 21,
                                      "start": "2024-08-02",
                                      "end": "2024-08-22",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Brembo Brandcampaign | Rapport",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "BYD",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "bpn Deutschland GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 30055,
                                      "Customer": "BYD",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 30056,
                                      "Product": "BYD",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "test",
                                      "briefing_id": 19,
                                      "start": "2024-08-07",
                                      "end": "2024-08-31",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "BYD",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "CDU",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 310,
                                      "Customer": "CDU",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 311,
                                      "Product": "CDU Bund",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "654654654",
                                      "briefing_id": 25,
                                      "start": "2024-08-14",
                                      "end": "2024-08-30",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "CDU Bund",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "Cooper",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 271,
                                      "Customer": "Cooper",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 8018,
                                      "Product": "Audispray",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "asdfasdfasdf",
                                      "briefing_id": 23,
                                      "start": "2024-07-30",
                                      "end": "2024-08-31",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Audispray",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "DZ-4",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 29856,
                                      "Customer": "DZ-4",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 29873,
                                      "Product": "Solaranlagen",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "321654",
                                      "briefing_id": 22,
                                      "start": "2024-08-01",
                                      "end": "2024-08-29",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Solaranlagen",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "EGN Entsorgungsgesellschaft Niederrhein",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 30283,
                                      "Customer": "EGN Entsorgungsgesellschaft Niederrhein",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 30284,
                                      "Product": "Curanto.de",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "asdfasdfasdf",
                                      "briefing_id": 26,
                                      "start": "2024-08-01",
                                      "end": "2024-08-31",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 30283,
                                      "Customer": "EGN Entsorgungsgesellschaft Niederrhein",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 30284,
                                      "Product": "Curanto.de",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "asdfasdfasdf",
                                      "briefing_id": 27,
                                      "start": "2024-08-01",
                                      "end": "2024-08-31",
                                      "filterKey": "Campaign"
                                  },
                                  {
                                      "Agency": "Initiative Media GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 30283,
                                      "Customer": "EGN Entsorgungsgesellschaft Niederrhein",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 30284,
                                      "Product": "Curanto.de",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "asdfasdfasdf",
                                      "briefing_id": 28,
                                      "start": "2024-08-01",
                                      "end": "2024-08-31",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Curanto.de",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "Mattel",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "Universal McCann GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 12033,
                                      "Customer": "Mattel",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 12096,
                                      "Product": "Barbie",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": null,
                                      "Campaign": "asdfasdfasdf",
                                      "briefing_id": 29,
                                      "start": "2024-08-01",
                                      "end": "2024-08-29",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Barbie",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  },
  {
      "headline": "ratiopharm",
      "subRows": [
          {
              "headline": "No Product Family Name",
              "subRows": [
                  {
                      "subRows": [
                          {
                              "subRows": [
                                  {
                                      "Agency": "bpn Deutschland GmbH",
                                      "IdAgency": null,
                                      "IdCustomer": 10975,
                                      "Customer": "ratiopharm",
                                      "IdProductFamily": null,
                                      "ProductFamily": null,
                                      "IdProduct": 25078,
                                      "Product": "Analytics",
                                      "IdProductVariant": null,
                                      "ProductVariant": null,
                                      "IdCampaign": 14756,
                                      "Campaign": "Data Analytics 2023",
                                      "briefing_id": 24,
                                      "start": "2024-08-01",
                                      "end": "2024-08-29",
                                      "filterKey": "Campaign"
                                  }
                              ],
                              "headline": "No Product Variant Name",
                              "filterKey": "ProductVariant",
                              "subRowsType": "table"
                          }
                      ],
                      "headline": "Analytics",
                      "subRowsType": "row",
                      "filterKey": "Product"
                  }
              ],
              "subRowsType": "row",
              "filterKey": "ProductFamily"
          }
      ],
      "subRowsType": "row",
      "filterKey": "Customer"
  }
]