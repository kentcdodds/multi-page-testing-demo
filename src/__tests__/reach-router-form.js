import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Form from '../reach-router-form'

test('The multi-step form can be tested', async () => {
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<Form />)

  fireEvent.click(await findByText(/fill.*form/i))

  fireEvent.change(await findByLabelText(/food/i), {
    target: {value: testData.food},
  })
  fireEvent.click(await findByText(/next/i))

  fireEvent.change(await findByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(await findByText(/confirm/i, {selector: 'button'}))

  expect(await findByText(/home/i)).toHaveAttribute('href', '/')
  fireEvent.click(await findByText(/home/i))

  await findByText(/welcome home/i)
})
