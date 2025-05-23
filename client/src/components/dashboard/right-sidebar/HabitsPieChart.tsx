import { PieChart, Pie, Cell } from "recharts";
import styles from "/src/styles/modules/dashboard/right-sidebar/habits-pie-chart.module.scss";
import { useHabit } from "../../../contexts/HabitContext";
import { useLocation } from "react-router-dom";
import { getWeekday } from "../../../helpers/date/getWeekday";

export default function HabitsPieChart() {
  const { habits: userHabits } = useHabit();
  const allHabits = Object.values(userHabits);
  const todayHabits = allHabits.filter((h) =>
    h.days.includes(getWeekday(new Date()))
  );
  const location = useLocation();
  const getSearchParamDateKey = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("date") ?? "00-00-0000";
  };
  if (todayHabits.length > 0) {
    const date = getSearchParamDateKey();
    const totalCompleted = todayHabits.filter((element) => {
      const history = element.history;
      if (history[date]) {
        const historyRecord = history[date];
        return historyRecord.isCompleted;
      }
    }).length;
    const totalUncompleted = todayHabits.length - totalCompleted;
    const completedRate = Math.floor(
      (totalCompleted / todayHabits.length) * 100
    );

    const data = [
      { name: "Complete", value: totalCompleted },
      { name: "Uncomplete", value: totalUncompleted },
    ];

    const COLORS = ["#F96363", "#C7C7C7"];
    return (
      <div className={styles.container}>
        <h1 className={styles.complete__percent}>{`${completedRate}%`}</h1>
        <p className={styles.complete__desc}>Current day`s progress</p>
        <PieChart width={270} height={270}>
          <Pie dataKey="value" data={data} innerRadius={115} outerRadius={135}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h1 className={styles.complete__percent}>0%</h1>
        <p className={styles.complete__desc}>Current day`s progress</p>
      </div>
    );
  }
}
