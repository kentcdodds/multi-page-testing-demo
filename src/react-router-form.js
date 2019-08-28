import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {submitForm} from './api'

function Main() {
  return (
    <>
      <h1>Welcome home</h1>
      <Link to="/page-1">Fill out the form</Link>
    </>
  )
}

function Page1({state, setState, history}) {
  return (
    <>
      <h2>Page 1</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          history.push('/page-2')
        }}
      >
        <label htmlFor="food">Favorite Food</label>
        <input
          id="food"
          value={state.food}
          onChange={e => setState({food: e.target.value})}
        />
      </form>
      <Link to="/">Go Home</Link> | <Link to="/page-2">Next</Link>
    </>
  )
}

function Page2({state, setState, history}) {
  return (
    <>
      <h2>Page 2</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          history.push('/confirm')
        }}
      >
        <label htmlFor="drink">Favorite Drink</label>
        <input
          id="drink"
          value={state.drink}
          onChange={e => setState({drink: e.target.value})}
        />
      </form>
      <Link to="/page-1">Go Back</Link> | <Link to="/confirm">Review</Link>
    </>
  )
}

function Confirm({state, onConfirmClick}) {
  return (
    <>
      <h2>Confirm</h2>
      <div>
        <strong>Please confirm your choices</strong>
      </div>
      <div>
        <strong id="food-label">Favorite Food</strong>:{' '}
        <span aria-labelledby="food-label">{state.food}</span>
      </div>
      <div>
        <strong id="drink-label">Favorite Drink</strong>:{' '}
        <span aria-labelledby="drink-label">{state.drink}</span>
      </div>
      <Link to="/page-2">Go Back</Link> |{' '}
      <button onClick={onConfirmClick}>Confirm</button>
    </>
  )
}

function Success() {
  return (
    <>
      <h2>Congrats. You did it.</h2>
      <div>
        <Link to="/">Go home</Link>
      </div>
    </>
  )
}

function Error({
  location: {
    state: {error},
  },
}) {
  return (
    <>
      <div>Oh no. There was an error.</div>
      <pre>{error.message}</pre>
      <Link to="/">Go Home</Link>
      <Link to="/confirm">Try again</Link>
    </>
  )
}

function Form() {
  const [state, setState] = React.useReducer((s, a) => ({...s, ...a}), {
    food: '',
    drink: '',
  })

  return (
    <Router>
      <Switch>
        <Route
          path="/page-1"
          render={props => (
            <Page1 {...props} state={state} setState={setState} />
          )}
        />
        <Route
          path="/page-2"
          render={props => (
            <Page2 {...props} state={state} setState={setState} />
          )}
        />
        <Route
          path="/confirm"
          render={props => (
            <Confirm
              {...props}
              state={state}
              onConfirmClick={() => {
                submitForm(state).then(
                  () => {
                    setState({food: '', drink: ''})
                    props.history.push('/success')
                  },
                  error => {
                    props.history.push('/error', {state: {error}})
                  },
                )
              }}
            />
          )}
        />
        <Route path="/success" component={Success} />
        <Route path="/error" component={Error} />
        <Route component={Main} />
      </Switch>
    </Router>
  )
}

export default Form
