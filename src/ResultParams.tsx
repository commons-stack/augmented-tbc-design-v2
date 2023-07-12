import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextWithPopover from "./TextWithPopover";
import DotsLoader from "./DotsLoader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3),
    },
    lightBulb: {
      verticalAlign: "middle",
      marginRight: theme.spacing(1),
    },
    leftContainer: {
      color: theme.palette.text.secondary,
    },
    centerContainer: {
      // color: blackColor
    },
    listBoxContainer: {
      "& > div:not(:last-child)": {
        marginBottom: "12px",
        borderBottom: "1px solid #006a13",
      },
    },
    listBox: {
      paddingBottom: "12px",
      "& > div": {
        display: "flex",
        alignItems: "center",
        "& p": {
          marginBottom: 0,
        },
      },
      "& > div:not(:last-child)": {
        paddingRight: "12px",
      },
    },
    value: {
      color: "#00E046",
    },

    valueFooter: {
      color: "#00A52D",
      fontSize: "80%",
    },
  })
);

export default function ResultParams({
  resultFields,
  simulationDuration,
}: {
  resultFields: {
    label: string;
    description: string;
    value: number | string;
    valueFooter?: string;
  }[];
  simulationDuration: number;
}) {
  /**
   * When resizing the window the chart animation looks very bad
   * Keep the animation active only during the initial animation time,
   * but afterwards, deactivate to prevent the re-size ugly effect
   */
  const [isAnimationActive, setIsAnimationActive] = useState(
    process.env.NODE_ENV !== "development"
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimationActive(false);
    }, simulationDuration);
    return () => {
      clearTimeout(timeout);
    };
  });

  const classes = useStyles();

  return (
    <div className={classes.listBoxContainer}>
      {resultFields.map(({ label, description, value, valueFooter }) => (
        <Grid key={label} container spacing={0} className={classes.listBox}>
          <Grid item xs={8} className={classes.leftContainer}>
            <TextWithPopover content={label} popoverText={description} />
          </Grid>

          <Grid item xs={4} className={classes.centerContainer}>
            {isAnimationActive ? (
              <DotsLoader />
            ) : (
              <div>
                <Typography className={classes.value}>{value}</Typography>
                {valueFooter && (
                  <Typography className={classes.valueFooter}>
                    {valueFooter}
                  </Typography>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
