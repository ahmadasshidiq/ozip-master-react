import { Button, Card, TextField, Typography } from "@mui/material";
import styles from "../dashboard.module.css";

interface IProps {
  connect: boolean;
  stmt: string;
  onHandleQuery: () => void;
  onQuery: (stmt: string) => void;
}

const CardQuery: React.FC<IProps> = (props) => {
  const { connect, stmt, onHandleQuery, onQuery } = props;

  return (
    <Card className={styles.card} elevation={4}>
      <Typography variant="h5">Query</Typography>
      <TextField
        disabled={!connect}
        fullWidth
        multiline
        rows={5}
        sx={{ marginTop: 3 }}
        value={stmt}
        placeholder="Select * from users/tasks.."
        onChange={(e) => onQuery(e.target.value)}
      />
      <div className={styles.button}>
        <Button
          disabled={!connect}
          variant="contained"
          onClick={() => onHandleQuery()}
        >
          Run
        </Button>
      </div>
    </Card>
  );
};

export default CardQuery;
