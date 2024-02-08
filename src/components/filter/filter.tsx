import './filter.scss';
import { ChangeEvent } from 'react';
import { useHelmets } from '../../hooks/useHelmets';

export function Filter() {
  const { rangeChange, range } = useHelmets();

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue = parseFloat(value);

    if (isNaN(newValue)) {
      return;
    }

    if (name === 'minValue') {
      newValue = Math.max(newValue, 0);
      newValue = Math.min(newValue, range.maxValue);

      rangeChange({ ...range, minValue: newValue });
    } else if (name === 'maxValue') {
      newValue = Math.max(newValue, 0);
      newValue = Math.max(newValue, range.minValue);
      rangeChange({ ...range, maxValue: newValue });
    }
  };

  return (
    <div className="filter">
      <div className="range">
        <label htmlFor="minValue">Precio mínimo: </label>
        <input
          type="number"
          id="minValue"
          name="minValue"
          placeholder="Min"
          onChange={handleRangeChange}
          role="spinbutton"
        />
      </div>
      <div className="range">
        <label htmlFor="maxValue">Precio máximo: </label>
        <input
          type="number"
          id="maxValue"
          name="maxValue"
          placeholder="Max"
          onChange={handleRangeChange}
          role="spinbutton"
        />
      </div>
    </div>
  );
}
