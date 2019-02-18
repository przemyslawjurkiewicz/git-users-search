class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({ searchText: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({ users: responseJson.items }));
  }

  render() {
    
    const divstyle = {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    };

    const formstyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#efebe1'
    };

    const labelstyle = {
      fontSize: '25px',
      textTransform: 'uppercase',
      color: '#2d5f91',
      fontWeight: 'bold'
    };

    const inputstyle = {
      fontSize: '18px',
      width: '300px',
      margin: '10px',
      border: '1px solid #ffb200'
    };

    return (
      <div style={divstyle}>
        <form onSubmit={event => this.onSubmit(event)} style={formstyle}>
          <label htmlFor="searchText" style={labelstyle}>
            Search by user name
          </label>
          <p>Naciśnij enter, aby wyszukać.</p>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}
            style={inputstyle}
            placeholder="Tutaj wpisz wyszukiwaną nazwę"
          />
        </form>
        <UsersList users={this.state.users} />
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user} />);
  }

  render() {

    const divstyle = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '1200px'
    };

    return <div style={divstyle}>{this.users}</div>;
  }
}

class User extends React.Component {
  render() {

    const divstyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5px'
    };

    return (
      <div style={divstyle}>
        <img src={this.props.user.avatar_url} style={{ maxWidth: '100px' }} />
        <a href={this.props.user.html_url} target="_blank">
          {this.props.user.login}
        </a>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
