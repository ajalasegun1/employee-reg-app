import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
  },
  titleContent: {
    textAlign: "center",
  },
  titleIcon: {
    color: theme.palette.warning.main,
    fontSize: "8rem",
  },
}));
function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.root }}>
      <DialogTitle className={classes.titleContent}>
        <WarningRoundedIcon className={classes.titleIcon} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          fontSize="small"
          color="default"
          variant="contained"
          onClick={() => {
            setConfirmDialog({ ...confirmDialog, isOpen: false });
          }}
        >
          No
        </Button>
        <Button
          fontSize="small"
          color="secondary"
          variant="contained"
          onClick={() => {
            confirmDialog.onConfirm();
            setConfirmDialog({
              ...confirmDialog,
              isOpen: false,
            });
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
