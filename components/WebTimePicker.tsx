import { ChangeEvent, useState } from "react";
import styled from "styled-components";

function getHours() {
  return Array.from({ length: 11 }, (_, i) => i + 1);
}

function getMinutes() {
  return Array.from({ length: 59 }, (_, i) => i + 1);
}

export default function WebTimePicker({
  date,
  onChange,
}: {
  date: Date;
  onChange: (date: Date) => void;
}) {
  const currentHour = date.getHours();
  const [hour, setHour] = useState(currentHour % 12 || 12);
  const [minute, setMinute] = useState(date.getMinutes());
  const [meridiem, setMeridiem] = useState(currentHour >= 12 ? "PM" : "AM");

  const onChangeHour = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedHour = Number(e.target.value);
    setHour(selectedHour);
    const newDate = new Date(date);
    newDate.setHours(selectedHour + (meridiem === "PM" ? 12 : 0));
    onChange(newDate);
  };

  const onChangeMinute = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMinute = Number(e.target.value);
    setMinute(selectedMinute);
    const newDate = new Date(date);
    newDate.setMinutes(selectedMinute);
    onChange(newDate);
  };

  return (
    <div>
      <select value={hour} onChange={onChangeHour}>
        {getHours().map((h) => (
          <option value={h} key={h}>
            {h}
          </option>
        ))}
      </select>
      <select value={minute} onChange={onChangeMinute}>
        {getMinutes().map((m) => (
          <option value={m} key={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={meridiem}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setMeridiem(e.target.value)
        }
      >
        <option value="AM" key="AM">
          AM
        </option>
        <option value="PM" key="PM">
          PM
        </option>
      </select>
    </div>
  );
}
