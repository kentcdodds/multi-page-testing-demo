import React from 'react'
import {Router, Link, navigate} from '@reach/router'
import {submitForm} from './api'

function Main() {
  return (
    <>
      <h1>Welcome home</h1>
      <Link to="/page-1">Fill out the form</Link>
    </>
  )
}

function Page1({state, setState}) {
  return (
    <>
      <h2>Page 1</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          navigate('/page-2')
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

function Page2({state, setState}) {
  return (
    <>
      <h2>Page 2</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          navigate('/confirm')
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

  function handleConfirmClick() {
    submitForm(state).then(
      () => {
        setState({food: '', drink: ''})
        navigate('/success')
      },
      error => {
        navigate('/error', {state: {error}})
      },
    )
  }

  return (
    <Router>
      <Main default />
      <Page1 path="/page-1" state={state} setState={setState} />
      <Page2 path="/page-2" state={state} setState={setState} />
      <Confirm
        path="/confirm"
        state={state}
        onConfirmClick={handleConfirmClick}
      />
      <Success path="/success" />
      <Error path="/error" />
    </Router>
  )
}

export default Form
