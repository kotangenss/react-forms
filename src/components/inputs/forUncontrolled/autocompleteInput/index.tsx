import React, { ChangeEvent, useState } from 'react';
import { InputAutocompleteProps } from '../../../../interfaces/input';

const AutocompleteInput = React.forwardRef<HTMLInputElement, InputAutocompleteProps>(
  (props, ref) => {
    const {
      items,
      onSuggestionSelected,
      label,
      id,
      classNameInput,
      classNameLabel,
      classNameList,
      classNameListItem,
    } = props;
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [text, setText] = useState('');

    const onTextChanged = (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      let newSuggestions: string[] = [];

      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, 'i');
        newSuggestions = items.sort().filter((val: string) => regex.test(val));
      }

      setSuggestions(newSuggestions);
      setText(value);
      onSuggestionSelected('');
    };

    const suggestionSelected = (value: string): void => {
      setText(value);
      setSuggestions([]);
      onSuggestionSelected(value);
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
          value={text}
          onChange={onTextChanged}
          type="text"
          placeholder="Search"
          ref={ref}
          id={id}
          className={classNameInput}
        />
        {renderSuggestions()}
      </div>
    );
  }
);

export default AutocompleteInput;
