import * as React from 'react';
import Autosuggest from 'react-autosuggest';

interface IProps { };

interface IState {
  value: string,
  suggestions: Array<ICrypto>
};

interface ICrypto {
  symbol: string,
  name: string,
};

interface IInputProps {
  placeholder: string,
  value: string,
  onChange: Function
};

const mockData: Array<ICrypto> = [
  {
    symbol: "BTC",
    name: "Bitcoin",
  },
  {
    symbol: "ETH",
    name: "Ethereum"
  }
];

class Example extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value: string): Array<ICrypto> => { // might need to be changed to "void" in case an empty array doesn't count as string[]
    const inputValue: string = value.trim().toLowerCase();
    const inputLength: number = inputValue.length;

    ////////////////////////////////////// fix ts after this point & convert class to hooks
    return inputLength === 0 ? [] : mockData.filter(coin =>
      coin.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion: ICrypto): string => suggestion.name;

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion: ICrypto): JSX.Element => (
    <div>
      {suggestion.name}
    </div>
  );

  onChange = (event: React.SyntheticEvent<HTMLInputElement>, { newValue }: { newValue: string }): void => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }: { value: string }): void => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = (): void => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
};

export default Example