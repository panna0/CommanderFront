import React from "react";
import styles from "./HorizontalStepper.module.scss";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import { color } from "motion";

const HorizontalStepper = ({ steps, activeStep}) => {
  // Custom Step Icon Component
  const CustomStepIcon = (props) => {
    const { active, completed, className } = props;

    let iconClass = "";
    if (completed) {
      iconClass = styles.completedIcon;
    } else if (active) {
      iconClass = styles.activeIcon;
    }

    return <StepIcon {...props} className={`${className} ${iconClass}`}/>;
  };

  return (
    <Box sx={{ width: "30vw" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={CustomStepIcon}
              classes={{ label: styles.stepLabel }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default HorizontalStepper;
