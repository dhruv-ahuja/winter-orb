import HighchartsReact from "highcharts-react-official";
import "./itemsTable.css";
import Highcharts from "highcharts";
import { baseItemRow, commonHeaders, kFormatter, tableHeader } from "../../../config";
import { MutableRefObject, ReactElement, RefObject, useEffect, useRef } from "react";

type tableHeadersProps = {
  headers: tableHeader[];
  tableHeaderRefs: MutableRefObject<HTMLTableHeaderCellElement[]>;
};

const TableHeaders = ({ headers, tableHeaderRefs }: tableHeadersProps) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th
            key={header.name}
            style={{ width: header.width }}
            ref={(element) => {
              if (element) {
                tableHeaderRefs.current[index] = element;
              }
            }}
          >
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
        zIndex: 0,
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
            {/* TODO: fix these charts rendering on top of headers during scroll */}
            <div className="price-history-wrapper" style={{ color: row.priceHistoryData.isPositive ? "" : "red" }}>
              <div id={`price-history`} className={`price-history`}>
                {generatePreviewChart(row.priceHistoryData.priceData, row.priceHistoryData.isPositive)}
              </div>
              {`${row.priceHistoryData.priceChange}%`}
            </div>
          </td>
          <td>
            <div
              className="price-prediction-wrapper"
              style={{ color: row.pricePredictionData.isPositive ? "" : "red" }}
            >
              <div id={`price-prediction`} className={`price-prediction`}>
                {generatePreviewChart(row.pricePredictionData.priceData, row.pricePredictionData.isPositive)}
              </div>
              {`${row.pricePredictionData.priceChange}%`}
            </div>
          </td>
          {/* round to nearest 10 */}
          <td>~{Math.round(row.listings / 10) * 10}</td>
        </tr>
      ))}
    </tbody>
  );
};

function setScrollingHeadersProperty(
  tableRef: RefObject<HTMLDivElement>,
  tableHeaderRefs: MutableRefObject<HTMLTableHeaderCellElement[]>
) {
  {
    const scrollTop = tableRef.current?.scrollTop ?? 0;
    const scrolledBelow = scrollTop ?? 0 > 0;

    tableHeaderRefs.current.forEach((header) =>
      scrolledBelow ? header.classList.add("scrolled") : header.classList.remove("scrolled")
    );
  }
}

type itemsTableProps = {
  itemRows: baseItemRow[];
  searchInput: string;
  selectedItemType: string;
};

const ItemsTable = (props: itemsTableProps) => {
  const tableRef: RefObject<HTMLDivElement> = useRef(null);
  const tableHeaderRefs: MutableRefObject<HTMLTableHeaderCellElement[]> = useRef([]);

  useEffect(() => {
    const tableWrapper = tableRef.current;

    if (tableWrapper) {
      tableWrapper.addEventListener("scroll", () => setScrollingHeadersProperty(tableRef, tableHeaderRefs));
    }

    //   clean up function
    return () => {
      if (tableWrapper) {
        tableWrapper.removeEventListener("scroll", () => setScrollingHeadersProperty);
      }
    };
  }, []);

  return (
    <div className="items-table-wrapper" ref={tableRef}>
      <table>
        <TableHeaders headers={commonHeaders} tableHeaderRefs={tableHeaderRefs} />
        <TableBody rows={props.itemRows} />
      </table>
    </div>
  );
};

export default ItemsTable;
