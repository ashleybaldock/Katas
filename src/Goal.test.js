import React from 'react';
import { render } from 'react-testing-library';
import Goal from './Goal';

const testProps = {
  goal: {
    description: 'test description',
    progress: 10,
    target: 20,
    image: 'http://testimagepath'
  }
};

describe('Goal', () => {
  it('formats goal info correctly', () => {
    const { container } = render(<Goal {...testProps} />);

    const goalInfo = container.querySelectorAll('.Goal__Info p');
    expect(goalInfo[0].textContent).toBe('Saving for: test description');
    expect(goalInfo[1].textContent).toBe('£10.00 of £20.00 saved (50%)');
  });

  it('sets image', () => {
    const { container } = render(<Goal {...testProps} />);

    const image = container.querySelector('.Goal__Image');
    expect(image.src).toBe(testProps.image);
  });
});

