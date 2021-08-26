let jsonContent = require('./custom.json');
const customContent = jsonContent.find(obj => obj.language === "English");
const weekDays = Object.values(customContent.days);
const monthNames = Object.values(customContent.months);

module.exports.relativeDateFormat = (date, isRelative = true, withTime = true, withSecond = false, railwayTime = false, weekRelative = true) => {

    const formatString = (inputString = "", replacer, value, inputStringSingle = "", inputStringZero = "", isNumber = true) => {
        if (isNumber) {
            if (value === 0) {
                return inputStringZero;
            } else if (Math.abs(value) === 1) {
                return inputStringSingle
            } else return inputString.replace(replacer, value);
        } else return inputString.replace(replacer, value);

    }

    const relativeDateDetail = (date, withTime = true, withSecond = false, railwayTime = true, weekRelative = true) => {
        const todayDt = new Date();
        const dt = new Date(date);


        if (withTime) {
            const timeDiff = todayDt - dt;
            let hh = dt.getHours();
            if (Math.abs(timeDiff) < 604800000) {
                if (Math.abs(timeDiff) < 86400000) {
                    if (Math.abs(timeDiff) < 3600000) {
                        if (Math.abs(timeDiff) < 60000) {
                            return customContent.justNowContent;
                        } else if (timeDiff > 0) {
                            return formatString(customContent.minutesAgoContent, "@number@", Math.floor(timeDiff / 60000), customContent.minutesAgoSingleContent)
                        } else {
                            return formatString(customContent.minutesAfterContent, "@number@", Math.floor(timeDiff / 60000), customContent.minutesAfterSingleContent)
                        }
                    }
                    else {

                        if (todayDt.getDate() === dt.getDate()) {
                            if (railwayTime) return `${customContent.todayContent} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                            else return `${customContent.todayContent} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;
                        } else if (timeDiff > 0) {
                            if (railwayTime) return `${customContent.yesterdayContent} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                            else return `${customContent.yesterdayContent} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;
                        } else {
                            if (railwayTime) return `${customContent.tomorrowContent} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                            else return `${customContent.tomorrowContent} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;
                        }
                    }
                } else {
                    if (weekRelative) {
                        if (timeDiff > 0) {
                            if (railwayTime) return `${weekDays[dt.getDay()]} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                            else return `${weekDays[dt.getDay()]} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;

                        } else {
                            if (railwayTime) return `${customContent.thisContent} ${weekDays[dt.getDay()]} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                            else return `${customContent.thisContent} ${weekDays[dt.getDay()]} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;
                        }
                    } else {
                        if (railwayTime) return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                        else return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;

                    }
                }
            } else {
                if (todayDt.getFullYear() === dt.getFullYear()) {
                    if (railwayTime) return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                    else return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;
                } else {
                    if (railwayTime) return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${dt.getFullYear()} ${withTime ? `${hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``}`;
                    else return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${dt.getFullYear()} ${withTime ? `${hh > 12 ? hh - 12 : hh}:${String(dt.getMinutes()).padStart("2", 0)}${withSecond ? `:${String(dt.getSeconds()).padStart("2", 0)}` : ``}  ` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;

                }
            }
        } else {
            const dayDiff = Math.floor(todayDt / 86400000) - Math.floor(dt / 86400000);
            if (Math.abs(dayDiff) < 7) {
                if (Math.abs(dayDiff) < 2) {
                    if (dayDiff === 0) {
                        return `${customContent.todayContent} `;
                    } else if (dayDiff > 0) {
                        return `${customContent.yesterdayContent} `;
                    } else {
                        return `${customContent.tomorrowContent} `;
                    }

                } else {
                    if (weekRelative) {
                        if (todayDt > dt) {
                            return `${weekDays[dt.getDay()]} `;

                        } else {
                            return `${customContent.thisContent} ${weekDays[dt.getDay()]}`;
                        }
                    } else {
                        return `${dt.getDate()} ${monthNames[dt.getMonth()]}`;
                    }
                }
            } else {
                if (todayDt.getFullYear() === dt.getFullYear()) {
                    return `${dt.getDate()} ${monthNames[dt.getMonth()]}`;
                } else {
                    return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${dt.getFullYear()}`
                }
            }
        }


    }

    let dt = new Date(date);
    let dd = dt.getDate();
    let MM = dt.getMonth();
    let yyyy = dt.getFullYear();
    const monthsObject = [
        { value: 1, content: customContent.months.JanContent },
        { value: 2, content: customContent.months.FebContent },
        { value: 3, content: customContent.months.MarContent },
        { value: 4, content: customContent.months.AprContent },
        { value: 5, content: customContent.months.mayContent },
        { value: 6, content: customContent.months.JunContent },
        { value: 7, content: customContent.months.JulContent },
        { value: 8, content: customContent.months.AugContent },
        { value: 9, content: customContent.months.SepContent },
        { value: 10, content: customContent.months.OctContent },
        { value: 11, content: customContent.months.NovContent },
        { value: 12, content: customContent.months.DecContent },
    ];
    // const months = ["Jan", "Feb", "Mar", "Apr", "may", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let MMM = monthsObject.filter((item) => item.value === MM + 1)[0].content;
    // let MMM = months[MM];
    if (isRelative) return relativeDateDetail(date, withTime, withSecond, railwayTime, weekRelative);
    else {
        if (withTime) {
            let hh = dt.getHours();
            let mm = dt.getMinutes();
            let ss = dt.getSeconds();
            if (railwayTime)
                return `${dd} ${MMM} ${yyyy}  ${hh}:${String(mm).padStart("2", 0)}${withSecond ? `:${String(ss).padStart("2", 0)}` : ``}`;
            else
                return `${dd} ${MMM} ${yyyy}  ${hh > 12 ? hh - 12 : hh}:${String(mm).padStart("2", 0)}${withSecond ? `:${String(ss).padStart("2", 0)}` : ``} ${hh > 12 ? customContent.pmContent : customContent.amContent}`;
        }
        else return `${dd} ${MMM} ${yyyy}`;
    }

}