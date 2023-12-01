import { ChangeEvent, useState } from 'react';
import styles from '../../../forms/styles.module.scss';
import { InputAutocompletePropsControlled } from '../../../../interfaces/input';

export default function AutocompleteInput(props: InputAutocompletePropsControlled): JSX.Element {
  const {
    items,
    label,
    id,
    classNameInput,
    classNameLabel,
    classNameList,
    classNameListItem,
    hookData,
    errorMessage,
    setValue,
  } = props;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { onChange, onBlur, name, ref } = hookData;

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    let newSuggestions: string[] = [];

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      newSuggestions = items.sort().filter((val: string) => regex.test(val));
    }

    setSuggestions(newSuggestions);
    onChange(e);
  };

  const suggestionSelected = (value: string): void => {
    setSuggestions([]);
    setValue(name, value);
  };

  const renderSuggestions = (): JSX.Element | null => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className={classNameList}>
        <ul>
          {suggestions.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={classNameListItem}
                onClick={() => suggestionSelected(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {label && (
        <label className={classNameLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type="text"
        {...{ onBlur, name, ref }}
        onChange={onTextChanged}
        placeholder="Search"
        id={id}
        className={classNameInput}
      />
      {renderSuggestions()}
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
