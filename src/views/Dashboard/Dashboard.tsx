import { Alert, Card, Snackbar } from "@mui/material";
import styles from "./dashboard.module.css";
import CardDatabase from "./components/CardDatabase";
import CardQuery from "./components/CardQuery";
import CardTable from "./components/CardTable";
import { useState } from "react";
import DBAPI from "../../api/db/db";

const Dashboard: React.FC = () => {
  const [connect, setConnect] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [typeSnackbar, setTypeSnackbar] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [stmt, setStmt] = useState("");

  // void handle button
  const handleQueryDB = async (page?: number, limit?: number) => {
    try {
      console.log(stmt.split(" ")[3]);
      const res = await DBAPI.execute(stmt, limit, page);

      if (Array.isArray(res[0].data)) {
        setData(res[0].data);
        setOffset(res[0].offset);
        setPageCount(res[0].pageCount);
        setLimit(res[0].limit);
      }
    } catch (err: any) {
      setMessageSnackbar(err.message);
      setTypeSnackbar("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Card className={styles.layout}>
      <div className={styles.layoutBody}>
        <CardDatabase
          connect={connect}
          onConnect={() => setConnect(true)}
          onDisconnect={() => setConnect(false)}
          onTypeSnackBar={(data) => setTypeSnackbar(data)}
          onMessageSnackbar={(data) => setMessageSnackbar(data)}
          onSnackbar={(data) => setOpenSnackbar(data)}
        />

        <CardQuery
          connect={connect}
          stmt={stmt}
          onHandleQuery={() => handleQueryDB(1, limit)}
          onQuery={(stmt) => setStmt(stmt)}
        />

        <CardTable
          offset={offset}
          pageCount={pageCount}
          limit={limit}
          data={data}
          onRefresh={(page, limit) => handleQueryDB(page, limit)}
        />
      </div>

      {/* snackbar alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message={messageSnackbar}
      >
        <Alert
          severity={typeSnackbar !== "error" ? "success" : "error"}
          onClose={() => setOpenSnackbar(false)}
        >
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Dashboard;
