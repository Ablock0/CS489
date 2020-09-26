class Clock extends React.Component {

  constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

  componentDidMount() {
      this.timer = setInterval(
        () => this.updateTime(),
        1000
      );
    }

  componentWillUnmount() {
      clearInterval(this.timer);
    }

  updateTime() {
      this.setState({
        date: new Date()
      });
  }

 render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
