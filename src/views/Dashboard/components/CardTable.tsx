import {
  Card,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import styles from "../dashboard.module.css";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IProps {
  data: any[];
  offset: number;
  pageCount: number;
  limit: number;
  onRefresh: (page: number, limit: number) => void;
}

const CardTable: React.FC<IProps> = (props) => {
  const { data, offset, pageCount, limit, onRefresh } = props;
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(0);

  let headers: any[] = [];

  if (data.length > 0) {
    headers = Object.keys(data[0]);
  }

  useEffect(() => {
    setLimitPage(limit);
  }, [pageCount]);

  return (
    <Card className={styles.card} elevation={4}>
      <Typography variant="h5">Result</Typography>
      {data.length > 0 && (
        <>
          <Table stickyHeader aria-label="simple table" sx={{ marginTop: 3 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>No</StyledTableCell>
                {headers.map((v) => (
                  <StyledTableCell>{v}</StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((v, i) => (
                <StyledTableRow>
                  <StyledTableCell>{offset + i + 1}</StyledTableCell>
                  {headers.map((_e, i) => (
                    <StyledTableCell>{v[headers[i]]}</StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

          <div className={styles.pagination}>
            <div className={styles.pagLimit}>
              <Typography>Limit</Typography>
              <Select
                size="small"
                value={limitPage.toString()}
                onChange={(e: SelectChangeEvent) => {
                  setLimitPage(Number(e.target.value));
                  onRefresh(page, limitPage);
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </div>
            <Pagination
              page={page}
              count={Math.ceil(pageCount / limit)}
              shape="rounded"
              onChange={(_evt, index) => {
                setPage(index);
                onRefresh(index, limitPage);
              }}
            />
          </div>
        </>
      )}

      {data.length <= 0 && (
        <div className={styles.tableNotReady}>
          <Typography color="GrayText">Database or query not found</Typography>
        </div>
      )}
    </Card>
  );
};

export default CardTable;
