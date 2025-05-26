import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SpecificValuesButton } from './SpecificValuesButton'

describe('SpecificValuesButton', () => {
  it('renders with the default value', () => {
    render(
      <SpecificValuesButton
        defaultVal="One"
        values={['One', 'Two', 'Three']}
        onClick={() => {}}
      />
    )

    expect(screen.getByText('One')).toBeInTheDocument()
  })

  it('cycles through values on click and calls onClick', () => {
    const handleClick = vi.fn()
    render(
      <SpecificValuesButton
        defaultVal="One"
        values={['One', 'Two', 'Three']}
        onClick={handleClick}
      />
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(button.textContent).toBe('Two')
    expect(handleClick).toHaveBeenCalledWith('Two')

    fireEvent.click(button)
    expect(button.textContent).toBe('Three')
    expect(handleClick).toHaveBeenCalledWith('Three')

    fireEvent.click(button)
    expect(button.textContent).toBe('One')
    expect(handleClick).toHaveBeenCalledWith('One')
  })

  it('cycles through values on click and calls onClick', () => {
    const handleClick = vi.fn()
    render(
      <SpecificValuesButton
        defaultVal="One"
        values={['One', 'Two', 'Three']}
        onClick={handleClick}
      />
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(button.textContent).not.toBe('One')
  })

  it('uses the formatter when provided', () => {
    render(
      <SpecificValuesButton
        defaultVal={1}
        values={[1, 2, 3]}
        onClick={() => {}}
        format={(val) => `Value: ${val}`}
      />
    )

    expect(screen.getByText('Value: 1')).toBeInTheDocument()
  })
})