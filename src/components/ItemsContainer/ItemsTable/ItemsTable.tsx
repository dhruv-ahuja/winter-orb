import HighchartsReact from "highcharts-react-official";
import "./itemsTable.css";
import Highcharts from "highcharts";
import { baseItemRow, commonHeaders, kFormatter, tableHeader } from "../../../config";
import { ReactElement } from "react";

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

function generatePreviewChart(priceData: number[], isPositive: boolean) {
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
        data: priceData,
        color: isPositive ? "#8378ffe2" : "red",
        fillOpacity: 0.5,
        lineWidth: 2,
        marker: { enabled: false },
        enableMouseTracking: false,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

function prepareDivinePrice(price: string): ReactElement {
  if (Number(price) <= 0) {
    return <span></span>;
  }
  return <span className="table-item-converted-price">{price + " Div"}</span>;
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
              <span className="table-item-price" title={row.priceChaos}>
                {kFormatter(row.priceChaos)}
              </span>
              <img src="/table/chaos_orb.png" className="table-item-price-img" />
            </div>
            {prepareDivinePrice(row.priceDivine)}
          </td>
          <td>
            {/* TODO: ensure that all values in this column are aligned! */}
            <div className="price-history-wrapper" style={{ color: row.priceHistoryData.isPositive ? "" : "red" }}>
              <div id={`price-history`} className={`price-history`}>
                {generatePreviewChart(row.priceHistoryData.priceData, row.priceHistoryData.isPositive)}
              </div>
              {`${row.priceHistoryData.priceChange}%`}
            </div>
          </td>
          <td>
            <div className="price-prediction-wrapper" style={{ color: row.priceHistoryData.isPositive ? "" : "red" }}>
              <div id={`price-prediction`} className={`price-prediction`}>
                {generatePreviewChart(row.pricePredictionData.priceData, row.pricePredictionData.isPositive)}
              </div>
              {`${row.pricePredictionData.priceChange}%`}
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
