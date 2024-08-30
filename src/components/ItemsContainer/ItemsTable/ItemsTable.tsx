import HighchartsReact from "highcharts-react-official";
import "./itemsTable.css";
import Highcharts from "highcharts";
import { baseItemRow } from "../../../config";

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

export interface tableHeader {
  name: string;
  width: string;
}

// TODO: maybe move this to some config file
const commonHeaders: tableHeader[] = [
  { name: "Name", width: "27.5%" },
  { name: "Type", width: "17.5%" },
  { name: "Value", width: "10%" },
  { name: "Last 7 Days", width: "12%" },
  { name: "Next 4 Days", width: "12%" },
  { name: "Listings", width: "10%" },
];

type tableHeadersProps = {
  headers: tableHeader[];
};

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

// TODO: use real data
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
  itemRows: baseItemRow[];
  searchInput: string;
  selectedItemType: string;
};

// TODO: add pagination support; add pagination buttons/visuals (perhaps a Load More would suffice)
const ItemsTable = (props: itemsTableProps) => {
  return (
    <div className="items-table-wrapper">
      <table>
        <TableHeaders headers={commonHeaders} />
        <TableBody rows={props.itemRows} />
      </table>
    </div>
  );
};

export default ItemsTable;
