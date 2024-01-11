import React, { FunctionComponent, useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./Group.module.css";
import{data} from "./data"


type GroupType = {
  onClose?: () => void;
};

const getColorForLevel = (level: string): string => {
  switch (level) {
    case "Level 3":
      return "#A71616";
    case "Level 2":
      return "#CEA000";
    case "Level 1":
      return "#578D00";
    default:
      return "black"; // You can set a default color or handle other cases
  }
};
const Group: FunctionComponent<GroupType> = ({ onClose }) => {
const [frameDateTimePickerValue, setFrameDateTimePickerValue] = useState<Date | null>(null);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDateChange = (newValue: Date | null) => {
    // Perform actions with the new date value
    console.log(newValue);

    // Update the state
    setFrameDateTimePickerValue(newValue);
  };

  // Filter data based on the selected date
  const filteredData = frameDateTimePickerValue
    ? data.filter((item) => {
        const selectedDate = formatDate(frameDateTimePickerValue);
        const itemDate = item.date; // Keep the date as a string from your data
        return itemDate === selectedDate;
      })
    : data;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.reportBoxReportincidenceParent}>
      <div className={styles.reportBoxReportincidence} />
        
        <div className={styles.staristicsreportReportinciden}>
          <div className={styles.staristicsreportReportincidenChild} />
          <b className={styles.statisticsReport}>Statistics Report:</b>
          </div>
          
        {/* DatePicker component */}
        <div className={styles.calendarStatistics}>
          <div className={styles.wrapper}>
            <DatePicker
              value={frameDateTimePickerValue}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  variant: "standard",
                  size: "medium",
                  color: "primary",
                },
              }}
            />
          </div>
        </div>
        <div className={styles.scrollReportincidents} data-animate-on-scroll>
        <div className={styles.dataContainer}>
          {filteredData.length === 0 ? (
            <p>No data found for the selected date</p>
          ) : (
            filteredData.map((row, index) => (
              <div key={index} className={styles.row}>
              <p style={{ color: getColorForLevel(row.level) }}>{row.level}</p>
                
                <p>{row.street}</p>
                <p>{row.camera}</p>
                <p>{row.date}</p>
                <p>{row.day}</p>
                <p>{row.time}</p>
                <p>{row.factors}</p>
              </div>
            ))
          )}
        </div>
      </div>
      </div>
    </LocalizationProvider>
  );
};

export default Group;
