import { startOfWeek, startOfMonth, subDays, format } from "date-fns";

//dashboard filters
export const formatDate = (date) => format(date, "yyyy-MM-dd");

export const handlePreset = (type, stateChanges) => {
  const { setActive, setShowCalendar, setStartDate, setEndDate } =
    stateChanges;
  setActive(type);
  setShowCalendar(false);

  const today = new Date();
  let start, end;

  switch (type) {
    case "yesterday":
      start = subDays(today, 1);
      end = subDays(today, 1);
      break;
    case "thisweek":
      start = startOfWeek(today, { weekStartsOn: 1 });
      end = today;
      break;
    case "thismonth":
      start = startOfMonth(today);
      end = today;
      break;
    case "custom":
      setShowCalendar(true);
      return;
    default: // today
      start = today;
      end = today;
  }

  setStartDate(formatDate(start));
  setEndDate(formatDate(end));
};

export const handleCustomChange = (dates, stateChanges) => {
  const { setShowCalendar, setEndDate, setStartDate } = stateChanges;
  let [start, end] = dates;

  if (start && !end) {
    setStartDate(formatDate(start));
    setEndDate(null);
    return;
  }

  if (start && end) {
    if (start > end) {
      [start, end] = [end, start];
    }
    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setShowCalendar(false);
  }
};
