import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { convertNanoSecondsToDate } from "../../utils/datetime";

const columns = [
  {
    id: "orderCreatedDate",
    lable: "Order Date",
  },
  {
    id: "documentID",
    lable: "Order ID",
  },
  {
    id: "orderTotal",
    lable: "Amount",
  },
];

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `${columnValue}`;
    case "orderCreatedDate":
      return convertNanoSecondsToDate(columnValue.nanoseconds, "yyyy-MM-dd");
    default:
      return columnValue;
  }
};

const OrderHistory = ({ orders }) => {
  const history = useHistory();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, pos) => {
              const { lable } = column;

              return (
                <TableCell key={pos} style={styles}>
                  {lable}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              const { documentID } = row;

              return (
                <TableRow
                  key={pos}
                  onClick={() => history.push(`/order/${documentID}`)}
                >
                  {columns.map((column, pos) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const formattedText = formatText(columnName, columnValue);

                    return (
                      <TableCell key={pos} style={styles}>
                        {formattedText}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistory;
