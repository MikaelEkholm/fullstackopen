import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ good, neutral, bad }) => {
    if (good + neutral + bad === 0) {
        return (
            <div>
                ei yhtään palautetta annettu
            </div>
        )
    } else {
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text="hyvä" value={good} />
                        <Statistic text="neutraali" value={neutral} />
                        <Statistic text="huono" value={bad} />
                        <Statistic text="keskiarvo" value={((good - bad) /
                            (good + neutral + bad)).toFixed(1)} />
                        <Statistic text="positiivisia" value={((good /
                            (good + neutral + bad) * 100)).toFixed(1) + "%"}  />
                    </tbody>
                </table>
            </div>
        )
    }
}

const Statistic = ({ text, value }) => (
    <tr><td>{text} {value}</td></tr>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    onClick = (name, value) => {
        return () => {
            this.setState({ [name]: value })
        }
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <Button
                      handleClick={this.onClick("good", this.state.good + 1)}
                      text="hyvä" />
                    <Button
                      handleClick={this.onClick("neutral", this.state.neutral + 1)}
                      text="neutraali" />
                    <Button
                      handleClick={this.onClick("bad", this.state.bad + 1)}
                      text="huono" />
                </div>
                <h1>statistiikka</h1>
                <Statistics good={this.state.good} neutral={this.state.neutral}
                    bad={this.state.bad} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));