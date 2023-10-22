import { Button, Card, TextField, Typography } from "@mui/material";
import styles from "../dashboard.module.css";
import { useState } from "react";
import DBAPI from "../../../api/db/db";

interface IProps {
  connect: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onTypeSnackBar: (data: string) => void;
  onMessageSnackbar: (data: string) => void;
  onSnackbar: (data: boolean) => void;
}

const CardDatabase: React.FC<IProps> = (props) => {
  const [host, setHost] = useState("");
  const [db, setDB] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // object props
  const {
    connect,
    onConnect,
    onDisconnect,
    onTypeSnackBar,
    onMessageSnackbar,
    onSnackbar,
  } = props;

  // void handle button
  const handleConnectDB = async () => {
    if (connect) {
      const message = await DBAPI.disconnect();

      onDisconnect();
      onMessageSnackbar(message);
      onSnackbar(true);
      onTypeSnackBar("success");
      return;
    }

    try {
      const message = await DBAPI.connect({
        host,
        database: db,
        password,
        username,
      });

      message !== "Connected to database PostgreSQL."
        ? onDisconnect()
        : onConnect();

      message !== "Connected to database PostgreSQL."
        ? onTypeSnackBar("error")
        : onTypeSnackBar("success");

      onMessageSnackbar(message);
      onSnackbar(true);
    } catch (err: any) {
      onMessageSnackbar(err.message);
      onTypeSnackBar("error");
      onSnackbar(true);
    }
  };

  const handleTestDB = async () => {
    const message = await DBAPI.testConnection({
      host,
      database: db,
      password,
      username,
    });

    message !== "Test connection success to database PostgreSQL."
      ? onTypeSnackBar("error")
      : onTypeSnackBar("sucess");

    onMessageSnackbar(message);
    onSnackbar(true);
  };

  return (
    <Card className={styles.card} elevation={4}>
      <Typography variant="h5">Connection</Typography>
      <div className={styles.inputText}>
        <div>
          <Typography>Host</Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={host}
            placeholder="localhost"
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        <div>
          <Typography>Username</Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={username}
            placeholder="postgres"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Typography>Database</Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={db}
            placeholder="ozip_db"
            onChange={(e) => setDB(e.target.value)}
          />
        </div>
        <div>
          <Typography>Password</Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={password}
            placeholder="11234"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.button}>
        <Button variant="outlined" onClick={() => handleTestDB()}>
          Test Connection
        </Button>

        <Button
          variant="contained"
          color={connect ? "error" : "info"}
          onClick={() => handleConnectDB()}
        >
          {!connect ? "Connect" : "Disconnect"}
        </Button>
      </div>
    </Card>
  );
};

export default CardDatabase;
