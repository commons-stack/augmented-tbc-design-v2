import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

export default withStyles({
  root: {
    height: 8,
    color: "#00E046",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid #004C07",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
    background: "#00E046",
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  markLabel: {
    top: 30,
  },
})(Slider);
