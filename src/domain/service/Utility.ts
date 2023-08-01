import moment from "moment";
class Utility {
  public static trimInputs(obj) {
    for (let prop in obj) {
      let value = obj[prop],
        type = typeof value;
      if (
        value != null &&
        (type == "string" || type == "object") &&
        obj.hasOwnProperty(prop)
      ) {
        if (type == "object") {
          Utility.trimInputs(obj[prop]);
        } else {
          obj[prop] = obj[prop].trim();
        }
      }
    }
    return obj;
  }

  public static getDaysFromDate(date, days) {
    return moment(date).add(days, "days").format("YYYY-MM-DD");
  }

  public static getMonthsFromDate(date, days) {
    return moment(date).add(days, "months").format("YYYY-MM-DD");
  }

  public static getYearsFromDate(date, days) {
    return moment(date).add(days, "years").format("YYYY-MM-DD");
  }
}
export default Utility;
