import HighchartsReact from "highcharts-react-official";
import "./itemsTable.css";
import Highcharts from "highcharts";

// base item row impl.; can be extended by other table components
export interface baseItemRow {
  name: string;
  imgSrc: string;
  type?: string;
  priceChaos: string;
  priceDivine: string;
  priceHistoryData: string[][];
  pricePredictionData: string[][];
  listings: number;
}

const priceHistoryData: string[][] = [
  ["2024-08-16T07:23:30.077482Z", "102466.67"],
  ["2024-08-17T07:23:30.077485Z", "101200.00"],
  ["2024-08-18T07:23:30.077487Z", "99955.20"],
  ["2024-08-19T07:23:30.077488Z", "101500.00"],
  ["2024-08-20T07:23:30.077490Z", "103629.17"],
  ["2024-08-21T07:23:30.077492Z", "114157.89"],
  ["2024-08-22T07:23:30.077493Z", "115600.00"],
];
const pricePredictionData: string[][] = [
  ["2024-08-19T07:23:30.077488Z", "101500.00"],
  ["2024-08-16T07:23:30.077482Z", "98466.67"],
  ["2024-08-17T07:23:30.077485Z", "98200.00"],
  ["2024-08-18T07:23:30.077487Z", "99955.20"],
];

const rows: baseItemRow[] = [
  {
    name: "Mirror of Kalandra",
    imgSrc: "/table/mirror_of_kalandra.png",
    priceChaos: "74.6k",
    priceDivine: "460.75 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
  },
  {
    name: "Mirror of Kalandra",
    imgSrc: "/table/mirror_of_kalandra.png",
    priceChaos: "74.6k",
    priceDivine: "460.75 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
    type: "Claw",
  },
  {
    name: "Mirror of Kalandra",
    imgSrc: "/table/mirror_of_kalandra.png",
    priceChaos: "74.6k",
    priceDivine: "460.75 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
    type: "Wand",
  },
  {
    name: "Mirror of Kalandra",
    imgSrc: "/table/mirror_of_kalandra.png",
    priceChaos: "74.6k",
    priceDivine: "460.75 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
  },
  {
    name: "Mirror of Kalandra",
    imgSrc: "/table/mirror_of_kalandra.png",
    priceChaos: "74.6k",
    priceDivine: "460.75 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
    type: "Two Handed Sword",
  },
  {
    name: "Mirror of Kalandra",
    imgSrc: "/table/mirror_of_kalandra.png",
    priceChaos: "74.6k",
    priceDivine: "460.75 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
  },
  {
    name: "Mirror Shard",
    imgSrc: "/table/mirror_shard.png",
    priceChaos: "3.8k",
    priceDivine: "23.8 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
    type: "Two Handed Sword",
  },
  {
    name: "Mirror Shard",
    imgSrc: "/table/mirror_shard.png",
    priceChaos: "3.8k",
    priceDivine: "23.8 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
    type: "Claw",
  },
  {
    name: "Mirror Shard",
    imgSrc: "/table/mirror_shard.png",
    priceChaos: "3.8k",
    priceDivine: "23.8 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
    type: "Wand",
  },
  {
    name: "Mirror Shard",
    imgSrc: "/table/mirror_shard.png",
    priceChaos: "3.8k",
    priceDivine: "23.8 Div",
    priceHistoryData: priceHistoryData,
    pricePredictionData: pricePredictionData,
    listings: 200,
  },
];

export interface tableHeader {
  name: string;
  width: string;
}

type tableHeadersProps = {
  headers: tableHeader[];
};

// TODO: maybe move this to some config file
const commonHeaders: tableHeader[] = [
  { name: "Name", width: "27.5%" },
  { name: "Type", width: "17.5%" },
  { name: "Value", width: "10%" },
  { name: "Last 7 Days", width: "17.5%" },
  { name: "Next 4 Days", width: "17.5%" },
  { name: "Listings", width: "10%" },
];

const TableHeaders = ({ headers }: tableHeadersProps) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.name} style={{ width: header.width }}>
            {header.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

function generatePreviewChart(values: string[][], isProfit: boolean) {
  const data = values.map((v) => parseFloat(v[1]));

  const options: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: "40px",
    },
    title: { text: undefined },
    xAxis: { visible: false },
    yAxis: { visible: false },
    legend: { enabled: false },
    tooltip: { enabled: true },
    credits: { enabled: false },
    series: [
      //@ts-expect-error: this works for us
      {
        data: data,
        color: isProfit ? "#8378ffe2" : "red",
        fillOpacity: 0.5,
        lineWidth: 2,
        marker: { enabled: false },
        enableMouseTracking: false,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

interface TableRows {
  rows: baseItemRow[];
}

const TableBody = ({ rows }: TableRows) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr className="table-row" key={index}>
          <td>
            <div className="table-item-col">
              <img src={row.imgSrc} className="table-item-img" />
              <span className="table-item-name">{row.name}</span>
            </div>
          </td>
          <td>{row.type ?? "-"}</td>
          <td>
            <div className="table-item-price-col">
              <span className="table-item-price">{row.priceChaos}</span>
              <img src="/table/chaos_orb.png" className="table-item-price-img" />
            </div>
            <span className="table-item-converted-price">{row.priceDivine}</span>
          </td>
          <td>
            <div className="price-history-wrapper">
              <div id={`price-history`} className={`price-history`}>
                {generatePreviewChart(priceHistoryData, true)}
              </div>
              +21%
            </div>
          </td>
          <td>
            <div className="price-prediction-wrapper">
              <div id={`price-prediction`} className={`price-prediction`}>
                {generatePreviewChart(pricePredictionData, false)}
              </div>
              -21%
            </div>
          </td>
          <td>~{row.listings}</td>
        </tr>
      ))}
    </tbody>
  );
};

type itemsTableProps = {
  //   rows: baseItemRow[];
  searchInput: string;
  selectedItemType: string;
};

function filterTableData(rows: baseItemRow[], { searchInput, selectedItemType }: itemsTableProps) {
  if (!searchInput && !selectedItemType) {
    return rows;
  }

  let filteredRows = searchInput
    ? rows.filter((row) => row.name.toLowerCase().includes(searchInput.trim().toLowerCase()))
    : rows;
  filteredRows = selectedItemType ? filteredRows.filter((row) => row.type === selectedItemType) : filteredRows;

  return filteredRows;
}

const ItemsTable = (props: itemsTableProps) => {
  const filteredRows = filterTableData(rows, props);

  return (
    <div className="items-table-wrapper">
      <table>
        <TableHeaders headers={commonHeaders} />
        <TableBody rows={filteredRows} />
      </table>
    </div>
  );
};

export default ItemsTable;
