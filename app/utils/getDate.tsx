export const formatDate = (isoDateString: string): string => {
    const date: Date = new Date(isoDateString);
    const year: number = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day: string = date.getDate().toString().padStart(2, "0");
    const monthNames: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    month = monthNames[date.getMonth()];
    return `${day} ${month} ${year}`;
  };